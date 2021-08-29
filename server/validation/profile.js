const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
    let errors = {};
    
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.drugname = !isEmpty(data.drugname) ? data.drugname : '';
    data.cyclelengthdays = !isEmpty(data.cyclelengthdays) ? data.cyclelengthdays : '';
    data.vialvolml = !isEmpty(data.vialvolml) ? data.vialvolml : '';
    data.vialconcentrationmgml = !isEmpty(data.vialconcentrationmgml) ? data.vialconcentrationmgml : '';
    data.expirydate = !isEmpty(data.expirydate) ? data.expirydate : '';
    data.dosecc = !isEmpty(data.dosecc) ? data.dosecc : '';
     
    if(!Validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = 'Handle needs to between 2 and 4 characters'
    }
    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required'
    }
    if(Validator.isEmpty(data.drugname)) {
        errors.drugname = 'Drugname field is required'
    }
    if(Validator.isEmpty(data.cyclelengthdays)) {
        errors.cyclelengthdays = 'Cycle length field is required'
    } else if(isNaN(data.cyclelengthdays)) {
        errors.cyclelengthdays = 'Cycle length must be a number'
    }
    if(Validator.isEmpty(data.vialvolml)) {
        errors.vialvolml = 'Volume field is required'
    } else if(isNaN(data.vialvolml)) {
        errors.vialvolml = 'Volume must be a number'
    }
    if(Validator.isEmpty(data.vialconcentrationmgml)) {
        errors.vialconcentrationmgml = 'Concentration field is required'
    } else if(isNaN(data.vialconcentrationmgml)) {
        errors.vialconcentrationmgml = 'Concentration must be a number'
    }
    if(Validator.isEmpty(data.expirydate)) {
        errors.expirydate = 'Expiry date field is required'
    }
    if(Validator.isEmpty(data.dosecc)) {
        errors.dosecc = 'Dosage field is required'
    } else if(isNaN(data.dosecc)) {
        errors.dosecc = 'Dosage must be a number'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}