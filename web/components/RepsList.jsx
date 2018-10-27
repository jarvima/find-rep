import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

const infoFields = [
    { key: 'name', displayText: 'First Name', formatter: value => value && value.replace(/ .*/, '') },
    { key: 'name', displayText: 'Last Name', formatter: value => value && value.replace(/^[^ ]*/, '') },
    { key: 'district', displayText: 'District' },
    { key: 'phone', displayText: 'Phone' },
    { key: 'office', displayText: 'Office' },
];

infoFields.forEach(field => {
    field.formatter = field.formatter || (value => value);
});

@observer
class RepsList extends React.Component {
    @observable repType = 'Representatives';
    @observable repState = 'UT';

    render() {
        const { currentRep, reps, repType, states } = this.props.store;

        return (
            <div>
                <h1>Who's my Representative?</h1>
                <form onSubmit={this.submitForm}>
                    
                    Type:
                    <select value={this.repType} onChange={this.changeType}>
                        <option value="Representatives">Representative</option>
                        <option value="Senators">Senator</option>
                    </select>

                    State:
                    <select value={this.repState} onChange={this.changeState}>
                        {states.map(state => (
                            <option value={state.abbreviation}>{state.name}</option>
                        ))}
                    </select>

                    <button type="submit">Find Reps</button>

                </form>
                <hr />

                <div className="infos list">
                    <h2>List / <span>{repType}</span></h2>
                    <div className="gray-row padded">
                        <div className="name-field title">Name</div>
                        <div className="party-field title">Party</div>
                    </div>
                    {reps.map((rep, index) => (
                        <div onClick={rep.selectRep} className="padded rep-line">
                            <div className="name-field">{rep.name}</div>
                            <div className="party-field">{rep.party[0]}</div>
                        </div>
                    ))}
                </div>

                <div className="infos info">
                    <h2>Info</h2>
                    {infoFields.map((field, index) => (
                        <div className="gray-row info-item padded" key={index}>
                            <span>{field.displayText}</span> {field.formatter(currentRep[field.key])}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    @action
    changeType = e => {
        this.repType = e.target.value;
    };

    @action
    changeState = e => {
        this.repState = e.target.value;
    };

    @action
    submitForm = e => {
        this.props.store.fetchReps(this.repType, this.repState);
        e.preventDefault();
    };
}

export default RepsList;
