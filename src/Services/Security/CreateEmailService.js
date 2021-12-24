import User from "../../Models/Security/User";
const { Op } = require("sequelize");
/**
 * Genera correos electronicos automaticamente basado en el nombre y apellido del usuario creado
 * @param {*} req 
 * @returns string
 */
export default async function CreateEmailService(req) {
    const { firstname, firstlastname } = req.body;
    //Eliminamos los espacios de los nombres y se pasan los caracteres a minusculas
    const firstnameWitoutSpaces = firstname.replace(' ', '').toLowerCase();
    const firstlastnameWitoutSpaces = firstlastname.replace(' ', '').toLowerCase();
    //Se consulta en la BBDD si existe un email que contenga la combinación
    let email = firstnameWitoutSpaces + firstlastnameWitoutSpaces;
    let existEmail = await User.findOne({ where: { email: { [Op.like]: `%${email}%` } } });

    if (!existEmail) { //Si no hay email similar, se genera un correo sin Id
        return email + '@cidenet.com.' + req.body.country;
    } else { //Si existe emails similares, se agrega un Id diferente hasta que genere un email nuevo
        let count = await User.count({ where: { email: { [Op.like]: `%${email}%` } } });
        let emailWithId;
        while (existEmail !== 0) {
            emailWithId = email + count++;
            existEmail = await User.count({ where: { email: { [Op.like]: `%${emailWithId}%` } } });
            console.log(existEmail);
            count++;
        }
        return emailWithId + '@cidenet.com.' + req.body.country;
    }

}