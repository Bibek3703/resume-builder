import { ResumeFormData } from "@/types/content";

export const exampleResumeData: ResumeFormData = {
    title: "Senior Software Developer Resume",
    content: {
        personalInfo: {
            fullName: "John Alexander Smith",
            email: "john.smith@email.com",
            phone: "+1 (555) 123-4567",
            location: {
                city: "San Francisco",
                state: "California",
                country: "United States",
                postalCode: "94105"
            },
            summary: "Experienced software developer with over 8 years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.",
            website: "https://johnsmith.dev",
            socialLinks: {
                linkedin:{
                    platform: "LinkedIn",
                    url: "https://linkedin.com/in/johnsmith"
                },
                github:{
                    platform: "GitHub",
                    url: "https://github.com/johnsmith"
                },
                other:{
                    platform: "Other",
                    url: "https://medium.com/@johnsmith",
                    label: "Medium Blog"
                }
            }
        },
        experience: [
            {
                company: "Tech Solutions Inc.",
                position: "Senior Software Engineer",
                location: "San Francisco, CA",
                startDate: "2020-01",
                endDate: "2024-02",
                current: true,
                description: "Led development of microservices architecture, mentored junior developers, and implemented CI/CD pipelines."
            },
            {
                company: "Digital Innovators Ltd.",
                position: "Software Engineer",
                location: "Boston, MA",
                startDate: "2018-03",
                endDate: "2019-12",
                current: false,
                description: "Developed and maintained multiple React applications, improved performance by 40%."
            }
        ],
        education: [
            {
                school: "Massachusetts Institute of Technology",
                degree: "Master of Science",
                field: "Computer Science",
                graduationDate: "2018-05",
                location: "Cambridge, MA"
            },
            {
                school: "University of California, Berkeley",
                degree: "Bachelor of Science",
                field: "Computer Science",
                graduationDate: "2016-05",
                location: "Berkeley, CA"
            }
        ],
        skills: [
            {
                name: "React",
                level: "Expert"
            },
            {
                name: "Node.js",
                level: "Advanced"
            },
            {
                name: "Python",
                level: "Intermediate"
            },
            {
                name: "AWS",
                level: "Advanced"
            }
        ],
        awards: [
            {
                title: "Outstanding Technical Achievement",
                issuer: "Tech Solutions Inc.",
                date: "2023-06",
                description: "Awarded for successfully leading the migration of legacy systems to microservices architecture, resulting in 60% improved system performance."
            },
            {
                title: "Innovation Award",
                issuer: "Silicon Valley Tech Conference",
                date: "2022-11",
                description: "Recognized for developing an AI-powered code review automation tool that reduced review time by 40%."
            }
        ],
        projects: [
            {
                title: "AI Code Review Assistant",
                description: "Developed an AI-powered tool that automates initial code review process using machine learning algorithms. The tool analyzes code quality, identifies potential bugs, and suggests improvements.",
                role: "Lead Developer",
                startDate: "2023-01",
                endDate: "2023-12",
                status: "Completed",
                url: "https://github.com/johnsmith/ai-code-review",
                techStack: ["Python", "TensorFlow", "React", "Node.js", "Docker"]
            },
            {
                title: "Real-time Analytics Dashboard",
                description: "Building a real-time analytics dashboard for monitoring system performance metrics across microservices architecture.",
                role: "Technical Lead",
                startDate: "2024-01",
                status: "In Progress",
                url: "https://analytics.techsolutions.com",
                techStack: ["React", "GraphQL", "AWS", "Kubernetes", "Prometheus"]
            }
        ]
    }
};