import Area from "../Models/Security/Area";
import Country from "../Models/Security/Country";
import IdType from "../Models/Security/IdType";
import Role from "../Models/Security/Role";
import User from "../Models/Security/User";
import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.count();
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "ADMIN" }).save(),
      new Role({ name: "EMPLOYEE" }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createIdtypes = async () => {
  try {
    const count = await IdType.count();
    if (count > 0) return;
    await Promise.all([
      new IdType({ abbrev: "C.E", name: "CEDULA DE EXTRANJERIA" }).save(),
      new IdType({ abbrev: "C.C", name: "CEDULA DE CIUDADANIA" }).save(),
      new IdType({ abbrev: "PASAPORTE", name: "PASAPORTE" }).save(),
      new IdType({ abbrev: "PEP", name: "PERMISO ESPECIAL DE PERMANENCIA" }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createAreas = async () => {
  try {
    const count = await Area.count();
    if (count > 0) return;
    await Promise.all([
      new Area({ name: "ADMINISTRACIÓN" }).save(),
      new Area({ name: "FINANCIERA" }).save(),
      new Area({ name: "COMPRAS" }).save(),
      new Area({ name: "INFRASTRUCTURA" }).save(),
      new Area({ name: "OPERACIÓN" }).save(),
      new Area({ name: "TALENTO HUMANO" }).save(),
      new Area({ name: "SERVICIOS VARIOS" }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createCountries = async () => {
  try {
    const count = await Country.count();
    if (count > 0) return;
    await Promise.all([
      new Country({ abbrev: "co", name: "COLOMBIA" }).save(),
      new Country({ abbrev: "us", name: "ESTADOS UNIDOS" }).save()
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createAdmin = async () => {
  try {
    let idType = await IdType.findOne({ where: { abbrev: "C.C" } });
    let role = await Role.findOne({ where: { name: "ADMIN" } });
    let country = await Country.findOne({ where: { abbrev: "co" } });
    let area = await Area.findOne({ where: { name: "ADMINISTRACIÓN" } });
    console.log(idType.id);
    const count = await User.count();
    if (count > 0) return;
    await Promise.all([
      new User({ 
        idnumber: "3589879632",
        firstname: "ENRIQUE",
        secondname: "JOSE",
        firstlastname: "DE ARMAS",
        secondlastname: "OSIA",
        email: "admin@hotmail.com",
        username: "admin",
        password: await bcrypt.hash("123",await bcrypt.genSalt(10)),
        reset_password: false,
        idtypeId: idType.id,
        roleId: role.id,
        countryId: country.id,
        areaId: area.id,
    }).save()
    ]);
  } catch (error) {
    console.log(error);
  }
};
