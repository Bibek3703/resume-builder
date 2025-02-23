import { z } from "zod";

export type SocialLink = {
    platform: 'LinkedIn' | 'GitHub' | 'Twitter' | 'Portfolio' | 'Other';
    url: string;
    label?: string; // Optional custom label for "Other" platform
};

// Type definitions for the JSON structure
export type PersonalInfo = {
    fullName: string;
    email: string;
    phone: string;
    location: {
        city: string;
        state?: string;
        country: string;
        postalCode?: string;
    };
    summary: string;
    website?: string; // Optional personal website
    socialLinks?: SocialLink[];
};

// Corresponding Zod schema for validation
export const socialLinkSchema = z.object({
    platform: z.enum(['LinkedIn', 'GitHub', 'Twitter', 'Portfolio', 'Other']),
    url: z.string().url('Please enter a valid URL'),
    label: z.string().optional(),
});

export const personalInfoSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^\+?[\d\s-()]{10,}$/, 'Please enter a valid phone number'),
    location: z.object({
        city: z.string().min(1, 'City is required'),
        state: z.string().optional(),
        country: z.string().min(1, 'Country is required'),
        postalCode: z.string().optional(),
    }),
    summary: z.string()
        .min(50, 'Summary should be at least 50 characters')
        .max(500, 'Summary should not exceed 500 characters'),
    website: z.string().url('Please enter a valid URL').optional(),
    socialLinks: z.array(socialLinkSchema)
        .min(1, 'At least one social link is required')
        .max(5, 'Maximum 5 social links allowed'),

});

export type Experience = {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
};


export const experienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    location: z.string().min(1, "Location is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string(),
    current: z.boolean().default(false),
    description: z.string().min(1, "Description is required"),
});

export type Education = {
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
    location: string;
};

export const educationSchema = z.object({
    school: z.string().min(1, "School name is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field of study is required"),
    graduationDate: z.string().min(1, "Graduation date is required"),
    location: z.string().min(1, "Location is required"),
});

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type Skill = {
    name: string;
    level: SkillLevel;
};

// Zod schema for validation
export const skillSchema = z.object({
    name: z.string()
        .min(2, 'Skill name must be at least 2 characters')
        .max(50, 'Skill name must not exceed 50 characters'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'], {
        required_error: 'Please select a skill level',
    })
});

// Awards Type
export type Award = {
    title: string;
    issuer: string;
    date: string;
    description: string;
};

export const awardSchema = z.object({
    title: z.string()
        .min(2, 'Award title must be at least 2 characters')
        .max(100, 'Award title must not exceed 100 characters'),
    issuer: z.string()
        .min(2, 'Issuer name must be at least 2 characters')
        .max(100, 'Issuer name must not exceed 100 characters'),
    date: z.string()
        .regex(/^\d{4}-\d{2}$/, 'Please use YYYY-MM format'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters'),
});

// Projects Type
export type ProjectStatus = 'Completed' | 'In Progress' | 'Ongoing';

export type Project = {
    title: string;
    description: string;
    role: string;
    startDate: string;
    endDate?: string;
    status: ProjectStatus;
    url?: string;
    techStack: string[];
};

export const projectSchema = z.object({
    title: z.string()
        .min(2, 'Project title must be at least 2 characters')
        .max(100, 'Project title must not exceed 100 characters'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description must not exceed 1000 characters'),
    role: z.string()
        .min(2, 'Role must be at least 2 characters')
        .max(100, 'Role must not exceed 100 characters'),
    startDate: z.string()
        .regex(/^\d{4}-\d{2}$/, 'Please use YYYY-MM format'),
    endDate: z.string()
        .regex(/^\d{4}-\d{2}$/, 'Please use YYYY-MM format')
        .optional(),
    status: z.enum(['Completed', 'In Progress', 'Ongoing']),
    url: z.string()
        .url('Please enter a valid URL')
        .optional(),
    techStack: z.array(z.string())
        .min(1, 'At least one technology must be specified')
        .max(20, 'Maximum 20 technologies allowed'),
});

export type ResumeContent = {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    awards: Award[];
    projects: Project[];
};

export type Resume = {
    title: string;
    content: ResumeContent
};

export const resumeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.object({
        personalInfo: personalInfoSchema,
        experience: z.array(experienceSchema),
        education: z.array(educationSchema),
        skills: z.array(skillSchema),
        awards: z.array(awardSchema),
        projects: z.array(projectSchema)
    }),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;