const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateInjectionInput(data) {
    let errors = {};
    
    data.injectiondate = !isEmpty(data.injectiondate) ? data.injectiondate : '';
    data.injectionsite = !isEmpty(data.injectionsite) ? data.injectionsite : '';
     

    if(Validator.isEmpty(data.injectiondate)) {
        errors.injectiondate = 'Injection date field is required'
    }
    if(Validator.isEmpty(data.injectionsite)) {
        errors.injectionsite = 'Injection site field is required'
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}