class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.history = [this.state];
        this.undoHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config.states[state]) {
            this.state = state;
        } else {
            throw new Error;
        }
        this.history.push(state);
        this.undoHistory = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.state].transitions[event]) {
            this.state = this.config.states[this.state].transitions[event];
        } else {
            throw new Error;
        }
        this.history.push(this.state);
        this.undoHistory = [];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        for(let key in this.config.states) {
            states.push(key);
        } 
        if (event === undefined) return states;
        let fiteredStates = states.filter(el => this.config.states[el].transitions[event])          
        return fiteredStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length == 1) return false;
        this.history.pop();
        this.undoHistory.push(this.state)
        this.state = this.history[this.history.length-1];
       
        return true;

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoHistory.length == 0) return false;
        this.state = this.undoHistory.pop();
        return true
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.state];
        this.undoHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
