const project = {
    participants: [],
    pricing: {},
    isBusy: false,
    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    init(participants, pricing) {
        project.isBusy = true
        if (arguments.length < 2) {
            project.isBusy = false
            return
        }
        if (participants.length == 0) {
            project.isBusy = false;
            this.participants = [];
            return
        }
        for (var i = 0, len = participants.length; i < len; i++) {
            if (!("seniorityLevel" in participants[i])) {
                project.isBusy = false
                return
            }
        }
        project.participants = participants;
        project.pricing = pricing
        project.isBusy = false
    },
    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or
   with null if not */
    /* callbackFunction (participant) => {} */
    findParticipant(functor, callbackFunction) {

        this.isBusy = true;

        setTimeout(() => {
            for (var i = 0; i < this.participants.length; i++) {

                if (functor(this.participants[i]) == true) {
                    this.isBusy = false;
                    callbackFunction(this.participants[i]);
                    break;

                } else {
                    this.isBusy = false;
                    callbackFunction(null);


                }
            }
        });

    },
    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as
   argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    findParticipants(functor, callbackFunction) {
        this.isBusy = true;

        setTimeout(() => {
            participant = [];

            for (var i = 0; i < this.participants.length; i++) {

                if (functor(this.participants[i]) == true) {

                    participant.push(this.participants[i]);
                }
                this.isBusy = false;
            };

            callbackFunction(participant);
        });
    },
    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    addParticipant(participantObject, callbackFunction) {
        project.isBusy = true;

        setTimeout(() => {
            if (!("seniorityLevel" in participantObject)) {
                project.isBusy = false;
                callbackFunction([]);
            } else {
                this.participants.push(participantObject);
                project.isBusy = false;
                callbackFunction();
            }
        });
    },
    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or
   null if participant wasn't found when job will be done */
    removeParticipant(participantObject, callbackFunction) {
        project.isBusy = true;

        setTimeout(() => {
            var idx = this.participants.indexOf(participantObject);
            if (idx != -1) {
                this.participants.splice(idx, 1);
                project.isBusy = false;
                callbackFunction(participantObject);
            } else {
                project.isBusy = false;
                callbackFunction(null);
            }
        });
    },


    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any
       arguments */

    setPricing(participantPriceObject, callbackFunction) {
        project.isBusy = true;
        for (key in participantPriceObject) {
            this.pricing[key] = participantPriceObject[key]

        }
        project.isBusy = false;
        callbackFunction();
    },

    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
    calculateSalary(periodInDays) {
        project.isBusy = true;
        var salary = 0;
        for (var i = 0; i < this.participants.length; i++) {
            if (!(this.participants[i].seniorityLevel in this.pricing)) {
                throw Error('Pricing not found');
            }

            var participantSalary = periodInDays * 8 * (this.pricing[this.participants[i].seniorityLevel]);
            salary = salary + participantSalary;
        }
        project.isBusy = false;
        return salary;
    }
}
var projectModule = (function() {
    var instance;

    function createInstance() {
        var object = project;
        return object;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = {
    firstName: 'Sofya',
    lastName: 'Tavrovskaya',
    task: projectModule.getInstance()
}