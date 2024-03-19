export const majors = [
    "Aerospace Engineering",
    "Architectural Engineering",
    "Biomedical Engineering",
    "Biosystems Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical and Computer Engineering",
    "Engineering Management",
    "Environmental Engineering",
    "Industrial Engineering",
    "Materials Science and Engineering",
    "Mechanical Engineering",
    "Mining Engineering",
    "Optical Sciences and Engineering",
    "Software Engineering",
    "Systems Engineering"
] as const;
export type Major = (typeof majors)[number];

export const minors = [
    "Aerospace Engineering",
    "Biosystems Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Electrical and Computer Engineering",
    "Engineering Management",
    "Environmental Engineering",
    "Industrial Engineering",
    "Materials Science and Engineering",
    "Mechanical Engineering",
    "Mining Engineering",
    "Optical Sciences and Engineering",
    "Software Engineering",
    "Sustainable Mineral Resources",
    "Systems Engineering"
] as const;
export type Minor = (typeof minors)[number];

export type UserID = string;
export type ScholarshipID = string;
export type ApplicationID = string;

// Taken from requirements
export const ethnicities = [
    "Caucasian",
    "Hispanic",
    "Black",
    "European",
    "Asian",
    "Indian",
    "American Indian",
    "Arabic/Middle Eastern",
    "Other"
] as const;
export type Ethnicity = (typeof ethnicities)[number];

export enum UserType {
    Applicant,
    Administrator,
    Donor
}

export enum StudentYear {
    Freshman,
    Sophomore,
    Junior,
    Senior
}

export type Password = {
    hash: string;
    salt: string;
};

export type User = {
    id: UserID;
    username: string;
    password: Password;
    firstName: string;
    lastName: string;
    netID: string;
    phone: string;
    email: string;
    type: UserType;
};

export type ApplicantInfo = {
    user: UserID;
    majors: Major[];
    minors: Minor[];
    GPA: number;
    year: StudentYear;
    ethnicity: Ethnicity;
    preferredPronouns: string;
    workExperience: string[];
};

export type Scholarship = {
    id: ScholarshipID;
    name: string;
    amount: number;
    donorID: UserID;
    numAvailable: number;
    requiredMajors: Major[];
    requiredMinors: Minor[];
    requiredGPA: number;
    deadline: Date;
    other: string;
};

export type Application = {
    id: ApplicationID;
    applicant: UserID;
    scholarship: ScholarshipID;
    statement: string;
};
