import { SkillLevel } from "@/types/content";

export const resumeDefaultValues = {
    title: '',
    content: {
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: {
                city: "",
                state: "",
                country: "",
                postalCode: "",
            },
            summary: '',
        },
        experience: [{
            company: '',
            position: '',
            location: '',
            startDate: '',
            current: false,
            description: ''
        }],
        education: [{
            school: '',
            degree: '',
            field: '',
            graduationDate: '',
            location: ''
        }],
        skills: [{
            name: '',
            level: "Beginner" as SkillLevel
        }],
        awards: [],
        projects:[]
    }
}