
export const _ErrorMsg = "Try After Some Time !!!";

export var dataFormat = { status: 0, message: null, data: null };

    
export const _baseUrl = "http://localhost:5000/";
// export const _baseUrl = "http://10.2.3.99:5000/";

export const loginURL = _baseUrl + "login";

export const masterURL = {
    user: _baseUrl + "userMaster",
    employee: _baseUrl + "employeeMaster",
    country: _baseUrl + "countryMaster",
    state: _baseUrl + "stateMaster",
    city: _baseUrl + "cityMaster",
    role: _baseUrl + "roleMaster",
    department: _baseUrl + "departmentMaster",
    designation: _baseUrl + "designationMaster",
    status: _baseUrl + "statusMaster",
    dynamicForm: _baseUrl + "dynamicFormMaster"
};

export const ticketUrl=_baseUrl + "ticketMaster";
export const ticketMongoUrl=_baseUrl + "createForm";
export const ticketTaskUrl=_baseUrl + "ticketTask";
export const ticketTaskCardUrl=_baseUrl + "ticketTaskCard";
export const ticketTaskTimeUrl=_baseUrl + "ticketTaskTimer";
