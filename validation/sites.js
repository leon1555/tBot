const Validator = require('validator')
const isEmpty = require('./is-empty')

const isBoolean = (value) => {
    return value === true || value === false || toString.call(value) === '[object Boolean]'
}

module.exports = function validateInjectionSitesInput(data) {
    let errors = {};
    
    data.rightarm = !isEmpty(data.rightarm) ? data.rightarm : '';
    data.leftarm = !isEmpty(data.leftarm) ? data.leftarm : '';
    data.leftthigh = !isEmpty(data.leftthigh) ? data.leftthigh : '';
    data.rightthigh = !isEmpty(data.rightthigh) ? data.rightthigh : '';
    data.lefthip = !isEmpty(data.lefthip) ? data.lefthip : '';
    data.righthip = !isEmpty(data.righthip) ? data.righthip : '';
     
    if(!isBoolean(data.rightarm)) {
        errors.rightarm = 'No boolean for right arm'
    }
    if(!isBoolean(data.leftarm)) {
        errors.leftarm = 'No boolean for left arm'
    }
    if(!isBoolean(data.leftthigh)) {
        errors.leftthigh = 'No boolean for left thigh'
    }
    if(!isBoolean(data.rightthigh)) {
        errors.rightthigh = 'No boolean for right thigh'
    }
    if(!isBoolean(data.lefthip)) {
        errors.lefthip = 'No boolean for left hip'
    }
    if(!isBoolean(data.righthip)) {
        errors.righthip = 'No boolean for right hip'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}