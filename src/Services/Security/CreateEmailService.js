import User from "../../Models/Security/User";
import Country from "../../Models/Security/Country";
const { Op } = require("sequelize");

export default async function CreateEmailService(req) {
    if (req.params.id === undefined) { //Ejecutar en caso que sea un usuario nuevo
        let email = await Generate(req);
        return email;
    } else { //Ejecutar en caso que se este actualizando un usuario
        let oldInfo = await User.findOne({
            include: [
                { model: Country, attributes: ['abbrev'] }], where: { id: req.params.id },
            attributes: ['firstname', 'firstlastname', 'email', 'countryId']
        });
        // Si se cambia el primer nombre o apellido del usuario...
        if (oldInfo.firstname !== req.body.firstname || oldInfo.firstlastname !== req.body.firstlastname) {
            return await Generate(req);
        }
        // Si solo cambia el país de residencia del usuario...
        else if (oldInfo.country.abbrev !== req.body.country) {
            let oldEmail = oldInfo.email.replace(`@cidenet.com.${oldInfo.country.abbrev}`, `@cidenet.com.${req.body.country}`);
            return oldEmail;
        }
        // Si no se actualiza ni el primer nombre / apellido o nacionalidad del usuario...
        else {
            return oldInfo.email;
        }
    }
}

async function Generate(req) {
    const { firstname, firstlastname } = req.body;
    //Eliminamos los espacios de los nombres y se pasan los caracteres a minusculas
    const firstnameWitoutSpaces = firstname.replace(' ', '').toLowerCase();
    const firstlastnameWitoutSpaces = firstlastname.replace(' ', '').toLowerCase();
    //Se consulta en la BBDD si existe un email que contenga la combinación
    let email = firstnameWitoutSpaces + firstlastnameWitoutSpaces;
    let existEmail = await User.findOne({ where: { email: { [Op.like]: `%${email}%` } } });
    //Si no hay email similar, se genera un correo sin Id
    if (!existEmail) {
        return email + '@cidenet.com.' + req.body.country;
    }
    //Si existe emails similares, se agrega un Id diferente hasta que genere un email nuevo
    else {
        let count = await User.count({ where: { email: { [Op.like]: `%${email}%` } } });
        let emailWithId;
        while (existEmail !== 0) {
            emailWithId = email + count;
            existEmail = await User.count({ where: { email: { [Op.like]: `%${emailWithId}%` } } });
            count++;
        }
        return emailWithId + '@cidenet.com.' + req.body.country;
    }

}