export const X_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjQwNDk4NDM2LCJleHAiOjE2NDA1ODQ4MzZ9.KSLA_xrEcEiYwXKeyn2VdWVpPUE2hbz2ZsK45mR4Lfg';
export const URL = 'http://localhost:3000/api/';
export const USERS = [
    {
        idtype: "C.C", idnumber: getRandomIdnumber(), role: "EMPLOYEE", area: "SERVICIOS VARIOS", country: "co",
        firstname: "MARTIN", secondname: "", firstlastname: "CUELLO", secondlastname: "PEREZ", createdAt: "2021-12-24 10:00:00"
    },
    {
        idtype: "PASAPORTE", idnumber: getRandomIdnumber(), role: "EMPLOYEE", area: "COMPRAS", country: "us",
        firstname: "MARTIN", secondname: "AUGUSTO", firstlastname: "CUELLO", secondlastname: "RAMOS", createdAt: "2021-12-24 10:00:00"
    },
    {
        idtype: "C.E", idnumber: getRandomIdnumber(), role: "EMPLOYEE", area: "FINANCIERA", country: "co",
        firstname: "MARTIN", secondname: "FELIPE", firstlastname: "CUELLO", secondlastname: "DORIA", createdAt: "2021-12-24 10:00:00"
    },
    {
        idtype: "PEP", idnumber: getRandomIdnumber(), role: "EMPLOYEE", area: "TALENTO HUMANO", country: "co",
        firstname: "FERNANDA", secondname: "", firstlastname: "JIMENEZ", secondlastname: "DORIA", createdAt: "2021-12-24 10:00:00"
    },
    {
        idtype: "C.E", idnumber: getRandomIdnumber(), role: "EMPLOYEE", area: "OPERACION", country: "us",
        firstname: "MARTIN", secondname: "RAMIRO", firstlastname: "CUELLO", secondlastname: "FERIA", createdAt: "2021-12-24 10:00:00"
    },
    {
        idtype: "C.C", idnumber: getRandomIdnumber(), role: "EMPLOYEE", area: "FINANCIERA", country: "co",
        firstname: "FERNANDA", secondname: "LUISA", firstlastname: "JIMENEZ", secondlastname: "ALZATE", createdAt: "2021-12-24 10:00:00"
    },
    {
        idtype: "C.C", idnumber: getRandomIdnumber(), role: "EMPLOYEE", area: "FINANCIERA", country: "us",
        firstname: "FERNANDA", secondname: "ANTONIA", firstlastname: "JIMENEZ", secondlastname: "ARIAS", createdAt: "2021-12-24 10:00:00"
    },
]

function getRandomIdnumber() {
    const value = Math.random() * (999999 - 111111) + 111111;
    return Math.round(value);
}