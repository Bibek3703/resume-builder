"use client";

import { useResume } from "@/contexts/resume-context";
import { Resume } from "@/types/content";
import {
    Document,
    Link,
    Page,
    PDFViewer,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
        lineHeight: 1.4,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingBottom: 5,
    },
    contactInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: "#666",
    },
    item: {
        marginBottom: 10,
    },
    skillLevel: {
        width: "100%",
        height: 5,
        backgroundColor: "#eee",
        marginTop: 3,
    },
    skillLevelFill: {
        height: "100%",
        backgroundColor: "#333",
    },
});

export default function ResumePDF({
    data,
}: {
    data: Resume;
}) {
    const { form } = useResume();
    const {
        content: {
            personalInfo,
            experience,
            education,
            skills,
            awards,
            projects,
        },
    } = form.watch();
    return (
        <PDFViewer className="w-full h-full">
            <Document>
                <Page size="A4" style={styles.page}>
                    {/* Personal Information Section */}
                    <View style={styles.section}>
                        <Text style={styles.name}>{personalInfo.fullName}</Text>
                        <View style={styles.contactInfo}>
                            <View>
                                <Text>{personalInfo.email}</Text>
                                <Text>{personalInfo.phone}</Text>
                                <Text>
                                    {personalInfo.location.city},{" "}
                                    {personalInfo.location.country}
                                </Text>
                            </View>
                            <View>
                                {personalInfo?.socialLinks?.map((
                                    link,
                                    index,
                                ) => (
                                    <Link key={index} src={link.url}>
                                        {link.platform === "Other"
                                            ? link.label
                                            : link.platform}
                                    </Link>
                                ))}
                            </View>
                        </View>
                        <Text style={styles.subtitle}>
                            {personalInfo.summary}
                        </Text>
                    </View>

                    {/* Experience Section */}
                    <View style={styles.section}>
                        <Text style={styles.header}>
                            Professional Experience
                        </Text>
                        {experience.map((exp, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {exp.position} - {exp.company}
                                </Text>
                                <Text style={styles.subtitle}>
                                    {exp.startDate} -{" "}
                                    {exp.current ? "Present" : exp.endDate} |
                                    {" "}
                                    {exp.location}
                                </Text>
                                <Text>{exp.description}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Education Section */}
                    <View style={styles.section}>
                        <Text style={styles.header}>Education</Text>
                        {education.map((edu, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {edu.school}
                                </Text>
                                <Text>{edu.degree} in {edu.field}</Text>
                                <Text style={styles.subtitle}>
                                    Graduated: {edu.graduationDate} |{" "}
                                    {edu.location}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Skills Section */}
                    <View style={styles.section}>
                        <Text style={styles.header}>Technical Skills</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 10,
                            }}
                        >
                            {skills.map((skill, index) => (
                                <View
                                    key={index}
                                    style={{ width: "48%", marginBottom: 8 }}
                                >
                                    <Text>{skill.name}</Text>
                                    <View style={styles.skillLevel}>
                                        <View
                                            style={[
                                                styles.skillLevelFill,
                                                {
                                                    width: `${
                                                        [
                                                                "Beginner",
                                                                "Intermediate",
                                                                "Advanced",
                                                                "Expert",
                                                            ]
                                                                .indexOf(
                                                                    skill.level,
                                                                ) *
                                                            25 + 25
                                                    }%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <Text style={styles.header}>Key Projects</Text>
                        {projects.map((project, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {project.title}
                                </Text>
                                <Text style={styles.subtitle}>
                                    {project.startDate} -{" "}
                                    {project.endDate || "Present"} |{" "}
                                    {project.status}
                                </Text>
                                <Text>Role: {project.role}</Text>
                                <Text>
                                    Tech Stack:{" "}
                                    {project?.techStack.join(", ") || ""}
                                </Text>
                                <Text>{project.description}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Awards Section */}
                    <View style={styles.section}>
                        <Text style={styles.header}>Awards & Recognition</Text>
                        {awards.map((award, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {award.title}
                                </Text>
                                <Text style={styles.subtitle}>
                                    {award.issuer} - {award.date}
                                </Text>
                                <Text>{award.description}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
