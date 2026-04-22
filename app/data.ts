type Education = {
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    classes: string[];
    clubs?: string[];
    awards?: string[];
    activities?: string[];
}

export const education: Education[]  = [
     {
        school: "California Polytechnic State University, San Luis Obispo",
        degree: "B.S. Computer Science",
        location: "San Luis Obispo, CA",
        startDate: "2026",
        endDate: "2028",
        classes: ["Operating Systems"]
    },
    {
        school: "College of the Canyons",
        degree: "A.S. Computer Science, A.S. Mathematics, A.S. Physics",
        location: "Santa Clarita, CA",
        startDate: "2023",
        endDate: "2026",
        classes: ["Data Structures", "C and C++ Programming", "Java", "Calculus", "Vector Calculus", "Linear Algebra and Differential Equations", "Circuits", "Electricity and Magnetism Physics"],
        clubs: ["COC Tech Club", "MESA", "MESA Skills Lab", "Active Minds"],
        awards: ["3.65 GPA", "Phi Theta Kappa", "NSLS"],
        activities: ["Founding Member and President of COC Tech Club, pushing it to the highest attendance in the club's history."]
    },
   
]