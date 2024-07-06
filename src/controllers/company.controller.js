import {
  createNewCompany,
  getAllCompanies,
  getCompanyByEmail,
  getCompanyById,
} from "../services/company.service.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../middlewares/authenticate.js";
import routerr_interface from "../utils/routers.interface.js";

export const signUpCompany = async (req, res) => {
  const { password, email } = req.body;

  try {
    const company = await getCompanyByEmail(email);
    if (company) {
      return res
        .status(201)
        .json({ message: "Company already exists", error: 1 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.image = `${
      process.env.BASE_URL
    }${routerr_interface.images.get.replace(":filename", req.file.filename)}`;
    const newCompany = await createNewCompany({
      ...req.body,
      password: hashedPassword,
    });

    const token = generateAccessToken({ entityId: newCompany.entityId });

    delete newCompany.entityId;
    delete newCompany.metadata;
    return res.status(200).json({
      message: "Company created successfully",
      token,
      company: newCompany,
    });
  } catch (error) {
    console.error("-----error----", error);
    return res.status(500).send("Internal server error");
  }
};
export const signInCompany = async (req, res) => {
  const { email, password, TIN } = req.body;
  const company = await getCompanyByEmail(email);
  if (!company || !company?.entity) {
    return res.status(400).json({ message: "Company not found", error: 1 });
  }

  if (company?.entity?.TIN != TIN) {
    return res.status(400).json({ message: "Invalid TIN", error: 1 });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    company?.entity?.hashed_password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password", error: 1 });
  }
  delete company.entity;
  delete company.entityId;
  delete company.metadata;
  return res.status(200).json({ message: "Company signed in successfully" });
};
export const showAll = async (req, res) => {
  try {
    var companies = await getAllCompanies();
    return res.status(200).json({
      message: "Successfully fetched all companies",
      data: [...companies],
    });
  } catch (error) {
    console.error("Error retrieving companies:", error);
    return res.status(500).send("Internal server error");
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required", error: 1 });
  }

  try {
    const company = await getCompanyById(id);

    if (!company) {
      return res.status(404).json({ message: "company  not found", error: 1 });
    }

    return res.status(200).json({ message: "company found", data: company });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).send("Internal server error");
  }
};
