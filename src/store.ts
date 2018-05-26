import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'

Vue.use(Vuex);

export interface IIndexStore {
    showMenu: boolean;
    mode: Mode;

     //OPENでスケジュールをロードしたor新規作成した. store内部からのみ更新すること
    isScheduleStored: boolean;

    currentSchedule: Schedule | null;
    currentMaintenanceId: number | null;
    currentPassingPointId: number | null;
}

class IndexStore extends Vuex.Store<IIndexStore> { 
    constructor() { 
        super({
            state: {
                showMenu: false,
                mode: 'Initial',

                isScheduleStored: false,

                currentSchedule: null,
                currentMaintenanceId: null,
                currentPassingPointId: null,
            },

            mutations: {
                updated: (state) => {
                    state = state;
                },
                setShowMenu: (state, show: boolean): void => {
                    state.showMenu = show;
                },
                changeMode: (state, mode: Mode): void => {
                    state.mode = mode;
                },

                setCurrentSchedule: (state, schedule: Schedule): void => {
                    state.currentSchedule = schedule;
                    // 最初のmaintenanceをsetしておく
                    this.commit('setCurrentMaintenanceId',
                        schedule.maintenance[0].maintenanceId);
                    state.isScheduleStored = true;
                },
                setCurrentMaintenanceId: async (state, mainteId: number): Promise<void> => {
                    state.currentMaintenanceId = mainteId;

                    // PassingPointsを取得
                    const maintenance = this.getters.currentMaintenance as Maintenance;
                    await maintenance.fetchChildren();

                    // 最初のpassingPointをsetしておく
                    const passingPoints = this.getters.currentPassingPoints as PassingPoints | null;
                    if (passingPoints != null && 0 < passingPoints.passingPoints.length) {
                        this.commit('setCurrentPassingPointId',
                            passingPoints.passingPoints[0].passingPointId);
                    }
                },
                setCurrentPassingPointId: (state, ppId: number): void => {
                    state.currentPassingPointId = ppId;
                }
            },

            actions: {
                toggleMenu: (context): void => {
                    context.commit('setShowMenu', !context.state.showMenu);
                },

                setTepsysScheduleId: async (context, tpid: string): Promise<void> => {
                    try {
                        const schedule = await Schedule.getItem({tepsysScheduleId: tpid});
                        context.commit('setCurrentSchedule', schedule);
                    } catch {
                        // scheduleのロードに失敗した
                        alert(`Tepsys Schedule ID: ${tpid} が存在しません`);
                        location.href = '/';
                    }
                },
                insertPassingPoint: async (context, location: ILocation) => {
                    const currentPassingPoint
                        = context.getters.currentPassingPoint as PassingPoint | null;
                    const currentPassingPoints
                        = context.getters.currentPassingPoints as PassingPoints;

                    const insertId = (currentPassingPoint != null)? currentPassingPoint.passingPointId: null;
                    const newPassingPoint = await currentPassingPoints.insertPassingPoint({
                        passingPointId: 0,
                        flightType: 'line',
                        location: location,
                        parabolaVertex: location
                    }, insertId);

                    // 新しいIDで更新
                    context.commit('setCurrentPassingPointId', newPassingPoint.passingPointId);
                },
                deletePassingPoint: async(context) => {
                    const currentPassingPoint
                        = context.getters.currentPassingPoint as PassingPoint;
                    const currentPassingPoints
                        = context.getters.currentPassingPoints as PassingPoints;
                    if (currentPassingPoint == null) {
                        return;
                    }

                    currentPassingPoints.deletePassingPoint(currentPassingPoint.passingPointId);
                },
                passingPointAction: (context, action: '--' | '++') => {
                    const passingPoints
                        = context.getters.currentPassingPoints as PassingPoints | null;
                    const index
                        = context.getters.currentPassingPointsIndex as number | null;
                    const length
                        = context.getters.currentPassingPointsLength as number | null;
                    if (passingPoints == null || index == null || length == null) {
                        return;
                    }

                    const pp = passingPoints.passingPoints;
                    switch(action) {
                        case('--'): {
                            if (0 < index) {
                                context.commit('setCurrentPassingPointId', pp[index - 1].passingPointId);
                                break;
                            }
                            alert('これ以上前のPassingPointがありません');
                            break;
                        }
                        case('++'): {
                            if (index < length - 1) {
                                context.commit('setCurrentPassingPointId', pp[index + 1].passingPointId);
                                break;
                            }
                            alert('これ以上先のPassingPointがありません');
                            break;
                        }
                    }
                }
            },

            getters: {
                currentMaintenance: (state, getters): Maintenance | null => {
                    const schedule = state.currentSchedule;
                    const mainteId = state.currentMaintenanceId;
                    if (schedule == null || mainteId == null) {
                        return null;
                    }

                    // idが一致するメンテナンスを探す
                    let retMainte: Maintenance | null = null;
                    schedule.maintenance.some((mainte) => {
                        if (mainte.maintenanceId == mainteId) {
                            retMainte = mainte;
                            return true;
                        }

                        return false;
                    });

                    return retMainte;
                },
                currentPassingPoints: (state, getters): PassingPoints | null => {
                    const mainte = getters
                        .currentMaintenance as Maintenance;
                    if (mainte == null) {
                        return null;
                    }

                    return mainte.passingPoints;
                },
                currentPassingPointsIndex: (state, getters): number | null => {
                    const passingPoints = getters
                        .currentPassingPoints as PassingPoints;
                    const passingPointId = state.currentPassingPointId;
                    if (passingPoints == null || passingPointId == null) {
                        return null;
                    }

                    // idが一致するindexを探す
                    let index: number | null = null;
                    passingPoints.passingPoints.some((passingPoint, i) => {
                        if (passingPoint.passingPointId == passingPointId) {
                            index = i;
                            return true;
                        }

                        return false;
                    });

                    return index;
                },
                currentPassingPointsLength: (state, getters): number | null => {
                    const passingPoints = getters
                        .currentPassingPoints as PassingPoints;
                    if (passingPoints == null) {
                        return null;
                    }

                    return passingPoints.passingPoints.length;
                },
                currentPassingPoint: (state, getters): IPassingPoint | null => {
                    const passingPoints = getters
                        .currentPassingPoints as PassingPoints;
                    const index = getters.currentPassingPointsIndex as number;
                    if (passingPoints == null || index == null) {
                        return null;
                    }

                    return passingPoints.passingPoints[index];
                },
                /**
                 * 現在のPassingPointsのWayPoint[]を返す
                 */
                currentWayPoints: (state, getters): WayPoint[] | null => {
                    const passingPoints = getters
                        .currentPassingPoints as PassingPoints;
                    if (passingPoints == null) {
                        return null;
                    }

                    return passingPoints.passingPoints.reduce((prev, pp) => {
                        return [...prev, ...(pp.wayPoints!.wayPoints)];
                    }, [] as WayPoint[]);
                }
            }
        });
    }
}

export default new IndexStore();