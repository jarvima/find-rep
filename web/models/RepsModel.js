import { observable, computed, action } from 'mobx';

import slim from '../lib/slim-xhr';
import stateDefs from '../lib/states';

export default class RepsModel {
    @observable reps = [];
    @observable currentRep = {};
    @observable repType = 'Representatives';
    @observable states = stateDefs;

    @action
    fetchReps(type, state) {
        slim.get(`/${type}/${state}`)
        .then(response => {
            const { success, results } = response.responseData;
            if (success) {
                results.forEach(rep => {
                    rep.selectRep = () => {
                        this.currentRep = rep;
                    };
                });
                this.reps = results;
                this.currentRep = results[0];
            } else {
                this.reps = [];
                this.currentRep = {};
            }
            this.repType = type;
        })
        .catch(error => {
            console.log('xhr error:', error);
        });
    }
}
