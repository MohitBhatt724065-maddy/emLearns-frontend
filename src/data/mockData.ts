export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  durationMinutes: number;
  type: 'video' | 'reading' | 'interactive';
  videoUrl?: string;
  content: string;
  clinicalPearls: string[];
  anatomicalLandmarks?: string[];
  surgicalPitfalls?: string[];
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  institution: string;
  bio: string;
  avatarUrl: string;
  credentials: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'Neuroscience Fundamentals' | 'Neuroanatomy' | 'Neurophysiology' | 'Neurological Disorders' | 'Neurosurgery' | 'Brain Imaging';
  difficulty: 'Undergraduate' | 'Medical Student' | 'Neurosurgery Resident' | 'Fellowship';
  thumbnailUrl: string;
  shortDescription: string;
  fullDescription: string;
  durationHours: number;
  totalLessons: number;
  rating: number;
  enrolledStudentsCount: number;
  instructor: Instructor;
  learningObjectives: string[];
  prerequisites: string[];
  modules: Module[];
  assessmentId?: string;
  featured?: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  clinicalTopic: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScorePercentage: number;
  questions: QuizQuestion[];
  category: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  institution: string;
  department: string;
  trainingLevel: string;
  studentId: string;
  joinedDate: string;
  avatarUrl: string;
  bio: string;
}

export const CURRENT_STUDENT: StudentProfile = {
  id: "std-8492",
  name: "Dr. Maya Lin, MBBS",
  email: "maya.lin@neuro.med.edu",
  institution: "Johns Hopkins Department of Neurosurgery",
  department: "Cerebrovascular & Skull Base Surgery Unit",
  trainingLevel: "PGY-3 Neurosurgery Resident",
  studentId: "NS-2024-9102",
  joinedDate: "August 2024",
  avatarUrl: "https://images.unsplash.com/photo-1594824813637-293674e2d837?auto=format&fit=crop&q=80&w=256",
  bio: "Third-year neurosurgical resident focused on microvascular reconstruction, anterior skull base approaches, and intraoperative neurophysiological monitoring."
};

export const COURSES: Course[] = [
  {
    id: "course-1",
    slug: "cranial-base-microsurgery",
    title: "Cranial Base Microsurgical Anatomy & Approaches",
    category: "Neurosurgery",
    difficulty: "Neurosurgery Resident",
    thumbnailUrl: "/src/assets/images/course_microsurgery_anatomy_1794031423567.jpg",
    shortDescription: "Master anterior and lateral skull base microsurgery, petrosal anatomy, and cavernous sinus exploration with 3D surgical perspectives.",
    fullDescription: "An advanced masterclass tailored for neurosurgical trainees and skull base fellows. This curriculum provides comprehensive dissection video lectures, high-resolution vascular corridor reconstructions, and surgical nuance for accessing lesions in the anterior fossa, parasellar corridor, and cerebellopontine angle.",
    durationHours: 18.5,
    totalLessons: 14,
    rating: 4.95,
    enrolledStudentsCount: 3840,
    featured: true,
    assessmentId: "quiz-skull-base",
    instructor: {
      id: "inst-1",
      name: "Prof. Kenneth Sterling, MD, FRCS (SN)",
      title: "Professor & Chair of Skull Base Surgery",
      institution: "The Walton Centre for Neurology and Neurosurgery, UK",
      credentials: "MD, FRCS (Neuro.Surg), IFAANS",
      avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256",
      bio: "Over 25 years of operative experience in complex skull base tumors, acoustic neuromas, and vascular bypass procedures with more than 180 peer-reviewed neurosurgical publications."
    },
    learningObjectives: [
      "Demonstrate thorough 3D topographical knowledge of the cavernous sinus walls and neurovascular contents.",
      "Execute safe microdissection along the anterior clinoid process and optic canal unroofing.",
      "Identify key landmarks for the retrosigmoid corridor to the cerebellopontine angle (CPA).",
      "Anticipate and manage vascular injuries to the internal carotid artery (ICA) segments C4 through C6."
    ],
    prerequisites: [
      "Core General Surgery & Neurosurgery PGY-1/2 Residency",
      "Advanced Cranial Neuroanatomy"
    ],
    modules: [
      {
        id: "mod-1",
        courseId: "course-1",
        title: "Module 1: The Sellar & Parasellar Corridor",
        description: "Anatomical corridors, optic strut relationships, and clinoidectomy techniques.",
        order: 1,
        lessons: [
          {
            id: "les-1-1",
            moduleId: "mod-1",
            title: "Extradural vs. Intradural Anterior Clinoidectomy",
            description: "Step-by-step operative exposure of the clinoid segment (C5) of the ICA and optic nerve mobilization.",
            order: 1,
            durationMinutes: 42,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            clinicalPearls: [
              "Continuous diamond burr irrigation is mandatory to prevent thermal injury to the adjacent optic nerve.",
              "The optic strut separates the optic canal from the superior orbital fissure and marks the anterior carotid collar."
            ],
            anatomicalLandmarks: [
              "Optic strut",
              "Anterior clinoid process",
              "Ophthalmic artery origin",
              "Distal dural ring",
              "Carotico-clinoid ligament"
            ],
            surgicalPitfalls: [
              "Encountering an ossified carotico-clinoid ligament requires sharp micro-rongeurs rather than rotational drill torque to avoid arterial laceration."
            ],
            content: `### Operative Rationale
The anterior clinoid process (ACP) is a pyramidal bony projection forming the anterior roof of the cavernous sinus and the lateral wall of the optic canal. Removing the ACP creates a wide surgical corridor to the paraclinoid internal carotid artery, ophthalmic artery, and superior orbital fissure.

### Technique: Extradural Approach
1. Perform a standard frontotemporal (pterional) craniotomy with extensive sphenoid ridge flattening.
2. Peel the outer dura of the temporal lobe from the superior orbital fissure to expose the meningo-orbital band (MOB).
3. Coagulate and divide the MOB to separate periorbita from the frontotemporal dura.
4. Drill the roof of the optic canal and core out the cancellous bone within the ACP using a 3mm diamond burr under copious chilled saline irrigation.
5. Fracture the shell of the optic strut medially into the sphenoid sinus once cortical bone is thinned to paper thickness.`
          },
          {
            id: "les-1-2",
            moduleId: "mod-1",
            title: "Cavernous Sinus Triangles: Parkinson & Kawase",
            description: "Surgical access triangles within the lateral wall and posterior fossa petrous apex.",
            order: 2,
            durationMinutes: 38,
            type: "interactive",
            clinicalPearls: [
              "Parkinson's triangle is bounded by the trochlear nerve (CN IV) superiorly and ophthalmic division (V1) inferiorly.",
              "Kawase's triangle allows access to the upper petroclival region without sacrificing labyrinthine structures."
            ],
            anatomicalLandmarks: [
              "Trochlear nerve (CN IV)",
              "Ophthalmic nerve (V1)",
              "Maxillary nerve (V2)",
              "Greater superficial petrosal nerve (GSPN)",
              "Arcuate eminence"
            ],
            surgicalPitfalls: [
              "Excessive traction on the GSPN during subtemporal elevation can cause facial nerve traction neuropraxia via the geniculate ganglion."
            ],
            content: `### Cavernous Sinus Triangles
The lateral wall of the cavernous sinus contains designated triangular corridors through which intradural pathology or intracavernous aneurysms can be targeted while minimizing cranial neuropathy.

### Parkinson's Triangle
- **Superior Border**: Free edge of the tentorium and trochlear nerve (CN IV).
- **Inferior Border**: Ophthalmic branch of the trigeminal nerve (V1).
- **Posterior Border**: Clivus / tentorial attachment.
- **Surgical Target**: Cavernous segment of the ICA and origin of the meningohypophyseal trunk.`
          }
        ]
      },
      {
        id: "mod-2",
        courseId: "course-1",
        title: "Module 2: Cerebellopontine Angle & Retrosigmoid Route",
        description: "Petrous bone navigation, internal auditory canal exposure, and lower cranial nerve preservation.",
        order: 2,
        lessons: [
          {
            id: "les-1-3",
            moduleId: "mod-2",
            title: "Retrosigmoid Craniotomy & CPA Cisternal Opening",
            description: "Patient positioning, asterion landmarks, and arachnoid dissection for acoustic schwannoma resection.",
            order: 1,
            durationMinutes: 48,
            type: "video",
            clinicalPearls: [
              "Opening the cerebellomedullary cistern early releases CSF, achieving cerebellar relaxation without brain retraction.",
              "The facial nerve (CN VII) is most frequently displaced anterior-superiorly by vestibular schwannomas."
            ],
            content: `### Retrosigmoid Keyhole Principles
The retrosigmoid approach provides an optimal trajectory along the petrous bone to the cerebellopontine angle, petroclival junction, and internal acoustic meatus (IAM).`
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    slug: "clinical-neurophysiology-synaptic",
    title: "Clinical Neurophysiology & Synaptic Transmission",
    category: "Neurophysiology",
    difficulty: "Medical Student",
    thumbnailUrl: "/src/assets/images/course_neurophysiology_synapse_1794031423211.jpg",
    shortDescription: "Ion channel kinetics, Goldman-Hodgkin-Katz membrane potentials, EPSP/IPSP summation, and intraoperative neuromonitoring (IONM).",
    fullDescription: "From biophysical equations to clinical neuro-diagnostics. This course bridges the gap between molecular biophysics and clinical electrophysiology (EMG, EEG, Somatosensory Evoked Potentials (SSEP), and Motor Evoked Potentials (MEP)). Essential for both medical board examinations and operating room neuromonitoring.",
    durationHours: 14.0,
    totalLessons: 12,
    rating: 4.88,
    enrolledStudentsCount: 5210,
    featured: true,
    assessmentId: "quiz-neurophysiology",
    instructor: {
      id: "inst-2",
      name: "Dr. Elena Rostova, MD, PhD",
      title: "Chief of Clinical Neurophysiology",
      institution: "Karolinska Institute, Department of Clinical Neuroscience",
      credentials: "MD, PhD, Board Certified in Clinical Neurophysiology",
      avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256",
      bio: "Pioneer in intraoperative MEP monitoring during spine instrumentation and high-density EEG microstate analysis in epilepsy syndromes."
    },
    learningObjectives: [
      "Calculate resting membrane potentials and understand Nernst equilibrium potentials for sodium, potassium, and chloride ions.",
      "Interpret Motor Evoked Potential (MEP) amplitude degradation during spinal cord deformity correction.",
      "Differentiate between channelopathies causing familial hemiplegic migraine vs. episodic ataxias."
    ],
    prerequisites: [
      "Undergraduate Cellular Biology & Biochemistry",
      "General Medical Physiology"
    ],
    modules: [
      {
        id: "mod-2-1",
        courseId: "course-2",
        title: "Module 1: Cellular Electrogenesis & Channel Kinetics",
        description: "Voltage-gated sodium and potassium channels, Hodgkin-Huxley equations, and refractory dynamics.",
        order: 1,
        lessons: [
          {
            id: "les-2-1",
            moduleId: "mod-2-1",
            title: "Action Potential Propagation & Saltatory Conduction",
            description: "Myelination mechanisms, Nodes of Ranvier, and demyelination consequences in Multiple Sclerosis.",
            order: 1,
            durationMinutes: 35,
            type: "video",
            clinicalPearls: [
              "Safety factor for conduction is highest at nodes of Ranvier (around 5 to 7), preventing propagation failure.",
              "Tetrodotoxin blocks voltage-gated Na+ channels selectively, whereas 4-aminopyridine blocks voltage-gated K+ channels."
            ],
            content: `### Biophysics of Saltatory Conduction
Myelin sheath, produced by oligodendrocytes in the CNS and Schwann cells in the PNS, drastically increases membrane resistance ($R_m$) and lowers membrane capacitance ($C_m$), confining inward ionic current exclusively to the unmyelinated nodes of Ranvier.`
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    slug: "advanced-neuroimaging-fmri-tractography",
    title: "Advanced Neuroimaging: fMRI & DTI Tractography",
    category: "Brain Imaging",
    difficulty: "Neurosurgery Resident",
    thumbnailUrl: "/src/assets/images/course_fmri_neuroimaging_1794031423253.jpg",
    shortDescription: "Diffusion Tensor Imaging, functional MRI paradigms, cortical functional localization, and intraoperative neuronavigation integration.",
    fullDescription: "A comprehensive translational course on modern neuroimaging modalities. Learn how to reconstruct critical white matter tracts (corticospinal tract, arcuate fasciculus, optic radiation) and design BOLD fMRI paradigms for preoperative language and motor mapping prior to eloquent cortex glioma resection.",
    durationHours: 16.0,
    totalLessons: 10,
    rating: 4.92,
    enrolledStudentsCount: 4120,
    featured: true,
    assessmentId: "quiz-imaging",
    instructor: {
      id: "inst-3",
      name: "Dr. Julian Thorne, MD, PhD",
      title: "Director of Functional Neuroimaging",
      institution: "Harvard Medical School / Massachusetts General Hospital",
      credentials: "MD, PhD, Senior Member ASNR",
      avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256",
      bio: "Leading neuro-radiologist specialized in high-order diffusion tractography and resting-state functional MRI connectomics."
    },
    learningObjectives: [
      "Understand fractional anisotropy (FA) and mean diffusivity (MD) indices in healthy vs. infiltrated brain parenchyma.",
      "Perform fiber tracking of Meyer's loop to avoid quadrantanopia during temporal lobectomy.",
      "Evaluate hemodynamic response function (HRF) deconvolution in task-based fMRI."
    ],
    prerequisites: [
      "Introductory Brain MRI interpretation",
      "Neuroanatomy of the Cerebrum"
    ],
    modules: [
      {
        id: "mod-3-1",
        courseId: "course-3",
        title: "Module 1: Principles of Diffusion Tensor Imaging",
        description: "Diffusion ellipsoids, eigenvalue decomposition, and deterministic vs. probabilistic tractography.",
        order: 1,
        lessons: [
          {
            id: "les-3-1",
            moduleId: "mod-3-1",
            title: "Reconstructing the Corticospinal Tract (CST)",
            description: "Seed regions of interest (ROI) in the precentral gyrus, internal capsule posterior limb, and cerebral peduncle.",
            order: 1,
            durationMinutes: 40,
            type: "video",
            clinicalPearls: [
              "Edema reduces FA artificially; utilizing free-water corrected diffusion algorithms prevents underestimating tract margins adjacent to tumors.",
              "A tumor-to-tract distance < 8mm significantly correlates with postoperative motor deficit risk."
            ],
            content: `### DTI Tensor Formulation
Diffusion tensor imaging characterizes water diffusion in 3 dimensions using a symmetric $3 \\times 3$ matrix with 6 independent tensor elements.`
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    slug: "cerebrovascular-stroke-management",
    title: "Cerebrovascular Anatomy & Acute Ischemic Stroke Management",
    category: "Neurological Disorders",
    difficulty: "Medical Student",
    thumbnailUrl: "/src/assets/images/course_microsurgery_anatomy_1794031423567.jpg",
    shortDescription: "Circle of Willis variants, penumbra imaging on CT perfusion, intravenous thrombolysis, and endovascular thrombectomy protocols.",
    fullDescription: "From vascular anatomy to hyperacute stroke workflows. Study the arterial supply of the brainstem and hemispheres, collateral circulation through the ophthalmic and leptomeningeal arteries, and clinical decision criteria for MT (mechanical thrombectomy) beyond the standard therapeutic time window.",
    durationHours: 12.0,
    totalLessons: 8,
    rating: 4.85,
    enrolledStudentsCount: 6100,
    featured: false,
    instructor: {
      id: "inst-4",
      name: "Dr. Rachel Zhang, MD",
      title: "Vascular Neurologist & Stroke Director",
      institution: "UCSF Weill Institute for Neurosciences",
      credentials: "MD, FAHA, FNCS",
      avatarUrl: "https://images.unsplash.com/photo-1594824813637-293674e2d837?auto=format&fit=crop&q=80&w=256",
      bio: "Principal investigator on hyperacute multimodal CT perfusion imaging trials and stroke neuroprotection registries."
    },
    learningObjectives: [
      "Interpret ASPECTS score on non-contrast head CT.",
      "Evaluate penumbra-to-core ischemic mismatch on automated CT perfusion (RAPID).",
      "Formulate patient selection based on DAWN and DEFUSE-3 clinical trial criteria."
    ],
    prerequisites: ["General Neuroscience", "Basic Head CT Interpretation"],
    modules: [
      {
        id: "mod-4-1",
        courseId: "course-4",
        title: "Module 1: Arterial Territorials and Collateral Reserve",
        description: "Anterior, middle, and posterior cerebral artery branches and watershed zones.",
        order: 1,
        lessons: [
          {
            id: "les-4-1",
            moduleId: "mod-4-1",
            title: "MCA Bifurcation vs. Basilar Artery Occlusions",
            description: "Clinical presentations, NIHSS thresholds, and urgent triage algorithms.",
            order: 1,
            durationMinutes: 30,
            type: "video",
            clinicalPearls: [
              "Basilar artery occlusion often presents with fluctuating 'top-of-the-basilar' symptoms: pupillary abnormalities, altered consciousness, and quadriparesis.",
              "ASPECTS 10 represents normal parenchyma, while each cortical region loss subtracts 1 point."
            ],
            content: `### Collateral Circulation Pathways
The primary collateral pathway in acute MCA occlusion is leptomeningeal anastomoses between distal ACA/PCA branches and MCA pial arterioles.`
          }
        ]
      }
    ]
  },
  {
    id: "course-5",
    slug: "foundations-neuroscience-neuroanatomy",
    title: "Comprehensive Functional Neuroanatomy",
    category: "Neuroanatomy",
    difficulty: "Undergraduate",
    thumbnailUrl: "/src/assets/images/hero_brain_neuroscience_1794031422423.jpg",
    shortDescription: "Brainstem nuclei, basal ganglia circuits, limbic structures, cranial nerves, and ascending/descending spinal tracts.",
    fullDescription: "The definitive functional neuroanatomy foundation for preclinical students and neuroscience undergraduates. Learn the direct and indirect basal ganglia motor loop, cranial nerve nuclei locations in the medulla, pons, and midbrain, and cerebellar circuitry for motor coordination.",
    durationHours: 22.0,
    totalLessons: 18,
    rating: 4.97,
    enrolledStudentsCount: 8940,
    featured: true,
    assessmentId: "quiz-neuroanatomy",
    instructor: {
      id: "inst-5",
      name: "Prof. Arthur Pendelton, DSc",
      title: "Emeritus Chair of Anatomical Sciences",
      institution: "Oxford University Department of Physiology, Anatomy & Genetics",
      credentials: "MA, DPhil, DSc, FRSB",
      avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256",
      bio: "Author of standard medical neuroanatomy atlases with 40 years of teaching medical, dental, and neuroscience undergraduates."
    },
    learningObjectives: [
      "Trace the 12 pairs of cranial nerves from their brainstem nuclei to peripheral target tissues.",
      "Diagram the direct, indirect, and hyperdirect pathways of the basal ganglia.",
      "Localize neurological lesions causing hemiballismus, parkinsonism, and cerebellar ataxia."
    ],
    prerequisites: ["None - Introductory Pre-Medical Neuroscience"],
    modules: [
      {
        id: "mod-5-1",
        courseId: "course-5",
        title: "Module 1: The Basal Ganglia & Movement Control",
        description: "Striatum, globus pallidus, subthalamic nucleus, and substantia nigra connections.",
        order: 1,
        lessons: [
          {
            id: "les-5-1",
            moduleId: "mod-5-1",
            title: "Direct vs. Indirect Pathway Circuitry",
            description: "D1 vs. D2 dopamine receptor modulation on thalamic disinhibition and hyperkinetic vs hypokinetic states.",
            order: 1,
            durationMinutes: 38,
            type: "video",
            clinicalPearls: [
              "Subthalamic nucleus (STN) lesion causes contralateral hemiballismus due to loss of STN excitation of the GPi.",
              "Deep Brain Stimulation (DBS) in Parkinson's disease typically targets either the STN or GPi to restore balance in the thalamocortical drive."
            ],
            content: `### Basal Ganglia Motor Loops
The basal ganglia are subcortical nuclei that select and initiate purposeful motor programs while suppressing unwanted involuntary movements.`
          }
        ]
      }
    ]
  },
  {
    id: "course-6",
    slug: "molecular-cellular-neuroscience",
    title: "Molecular & Cellular Neuroscience Fundamentals",
    category: "Neuroscience Fundamentals",
    difficulty: "Undergraduate",
    thumbnailUrl: "/src/assets/images/course_neurophysiology_synapse_1794031423211.jpg",
    shortDescription: "G-protein coupled neuroreceptors, synaptic vesicle release machinery (SNARE proteins), and long-term potentiation (LTP).",
    fullDescription: "Explore the molecular machinery of cognition and neural transmission. Detailed coverage of synaptotagmin, syntaxin, SNAP-25, AMPA and NMDA receptor trafficking, retrograde nitric oxide signaling, and epigenetic plasticity in memory consolidation.",
    durationHours: 15.0,
    totalLessons: 10,
    rating: 4.82,
    enrolledStudentsCount: 3450,
    featured: false,
    instructor: {
      id: "inst-2",
      name: "Dr. Elena Rostova, MD, PhD",
      title: "Chief of Clinical Neurophysiology",
      institution: "Karolinska Institute",
      credentials: "MD, PhD",
      avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256",
      bio: "Molecular neuroscience investigator exploring presynaptic vesicle replenishment dynamics."
    },
    learningObjectives: [
      "Detail the calcium-sensing mechanism of Synaptotagmin-1 during fast neurotransmitter release.",
      "Explain the biophysical requirement of magnesium unblocking in NMDA channels during LTP induction.",
      "Describe the pathology of botulinum and tetanus neurotoxin cleavage of SNARE complexes."
    ],
    prerequisites: ["Introductory Biochemistry & Cell Biology"],
    modules: [
      {
        id: "mod-6-1",
        courseId: "course-6",
        title: "Module 1: The Synaptic Machinery",
        description: "Vesicle docking, priming, fusion pore formation, and endocytic recycling.",
        order: 1,
        lessons: [
          {
            id: "les-6-1",
            moduleId: "mod-6-1",
            title: "SNARE Complex Dynamics & Vesicle Exocytosis",
            description: "Syntaxin-1A, SNAP-25, and Synaptobrevin assembly into four-helix bundle.",
            order: 1,
            durationMinutes: 32,
            type: "reading",
            clinicalPearls: [
              "Botulinum toxin serotype A cleaves SNAP-25, blocking acetylcholine release at the neuromuscular junction.",
              "Tetanus toxin retrogradely travels to spinal inhibitory interneurons, cleaving synaptobrevin and causing spastic tetany."
            ],
            content: `### Molecular Basis of Exocytosis
Fast neurotransmitter release occurs within 200 microseconds of calcium influx into the presynaptic active zone.`
          }
        ]
      }
    ]
  }
];

export const ASSESSMENTS: Assessment[] = [
  {
    id: "quiz-skull-base",
    courseId: "course-1",
    title: "Cranial Base & Vascular Neurosurgery Board Simulation",
    description: "Evaluates anatomical orientation, surgical triangles of the cavernous sinus, and clinoidectomy landmarks under simulated board examination conditions.",
    timeLimitMinutes: 15,
    passingScorePercentage: 75,
    category: "Neurosurgery",
    questions: [
      {
        id: "q-1",
        questionText: "During an anterior clinoidectomy, what anatomical structure separates the optic canal from the superior orbital fissure?",
        options: [
          "Lesser sphenoid wing crest",
          "Optic strut",
          "Carotico-clinoid ligament",
          "Tuberculum sellae"
        ],
        correctOptionIndex: 1,
        explanation: "The optic strut is a pillar of bone connecting the body of the sphenoid with the anterior clinoid process. It physically separates the optic canal (medially) from the superior orbital fissure (laterally and inferiorly).",
        clinicalTopic: "Anterior Skull Base Anatomy"
      },
      {
        id: "q-2",
        questionText: "Which cranial nerve forms the superior boundary of Parkinson's triangle within the lateral wall of the cavernous sinus?",
        options: [
          "Oculomotor nerve (CN III)",
          "Abducens nerve (CN VI)",
          "Trochlear nerve (CN IV)",
          "Ophthalmic division of trigeminal nerve (V1)"
        ],
        correctOptionIndex: 2,
        explanation: "Parkinson's triangle (infratrochlear triangle) is bounded superiorly by the trochlear nerve (CN IV) and inferiorly by the ophthalmic division of the trigeminal nerve (V1).",
        clinicalTopic: "Cavernous Sinus Triangles"
      },
      {
        id: "q-3",
        questionText: "During a retrosigmoid craniotomy for vestibular schwannoma, what maneuver provides immediate cerebellar relaxation without surgical brain retraction?",
        options: [
          "Early lumbar puncture drain placement",
          "Opening the arachnoid of the cerebellomedullary cistern to drain CSF",
          "Hyperventilation to PaCO2 < 25 mmHg",
          "Intravenous mannitol bolus 2.0 g/kg"
        ],
        correctOptionIndex: 1,
        explanation: "Sharply opening the arachnoid of the cerebellomedullary cistern (cisterna magna / lateral medullary cistern) releases cerebrospinal fluid immediately, causing the cerebellar hemisphere to naturally fall away from the petrous bone without retractor-induced contusion.",
        clinicalTopic: "Posterior Fossa Surgical Principles"
      },
      {
        id: "q-4",
        questionText: "Which segment of the Internal Carotid Artery (Bouthillier classification) is directly exposed after complete removal of the anterior clinoid process?",
        options: [
          "C3 (Lacerum segment)",
          "C4 (Cavernous segment)",
          "C5 (Clinoid segment)",
          "C7 (Communicating segment)"
        ],
        correctOptionIndex: 2,
        explanation: "The C5 segment (clinoid segment) of the ICA lies between the proximal and distal dural rings and is unroofed following removal of the anterior clinoid process.",
        clinicalTopic: "Vascular Classification & Exposure"
      },
      {
        id: "q-5",
        questionText: "During subtemporal petrosal approach (Kawase approach), excessive anterior traction on which nerve risks causing an acute facial nerve palsy?",
        options: [
          "Greater superficial petrosal nerve (GSPN)",
          "Lesser superficial petrosal nerve",
          "Deep petrosal nerve",
          "Chorda tympani"
        ],
        correctOptionIndex: 0,
        explanation: "The GSPN runs across the anterior petrous surface and joins the geniculate ganglion of the facial nerve (CN VII). Excessive traction on the GSPN transfers mechanical tension directly to the geniculate ganglion, causing facial palsy.",
        clinicalTopic: "Skull Base Complication Avoidance"
      }
    ]
  },
  {
    id: "quiz-neurophysiology",
    courseId: "course-2",
    title: "Synaptic Biophysics & Intraoperative Neurophysiology Exam",
    description: "Evaluates Goldman-Hodgkin-Katz calculations, channel gating kinetics, and somatosensory/motor evoked potential diagnostic thresholds.",
    timeLimitMinutes: 12,
    passingScorePercentage: 70,
    category: "Neurophysiology",
    questions: [
      {
        id: "q-np-1",
        questionText: "In intraoperative transcranial motor evoked potential (MEP) monitoring during spinal deformity surgery, what change represents an alarming critical threshold for spinal cord ischemia?",
        options: [
          "10% increase in stimulation latency",
          "50% or greater decrease in MEP amplitude",
          "Change in baseline body temperature of 1 degree Celsius",
          "A brief burst of EMG spontaneous firing"
        ],
        correctOptionIndex: 1,
        explanation: "A reduction in transcranial MEP amplitude of 50% or greater (or total disappearance of MEP responses) is the widely accepted standard warning criterion indicating impending motor pathway ischemia requiring immediate intervention (e.g. elevating MAP, adjusting hardware).",
        clinicalTopic: "Intraoperative Neuromonitoring (IONM)"
      },
      {
        id: "q-np-2",
        questionText: "The unblocking of which ion channel requires both glutamate binding AND postsynaptic membrane depolarization to relieve magnesium (Mg2+) blockade?",
        options: [
          "AMPA receptor",
          "Kainate receptor",
          "NMDA receptor",
          "GABA-A receptor"
        ],
        correctOptionIndex: 2,
        explanation: "NMDA (N-methyl-D-aspartate) receptors are voltage-dependent coincidence detectors. At resting potentials (-70mV), extracellular Mg2+ blocks the channel pore. Only upon membrane depolarization is the Mg2+ expelled, allowing Ca2+ and Na+ influx.",
        clinicalTopic: "Synaptic Plasticity & Ion Channels"
      },
      {
        id: "q-np-3",
        questionText: "Which SNARE protein is localized specifically on the synaptic vesicle membrane (v-SNARE) rather than the plasma membrane (t-SNARE)?",
        options: [
          "Syntaxin-1",
          "SNAP-25",
          "Synaptobrevin (VAMP)",
          "Munc-18"
        ],
        correctOptionIndex: 2,
        explanation: "Synaptobrevin (also termed VAMP, Vesicle-Associated Membrane Protein) is the primary v-SNARE embedded in the synaptic vesicle membrane, which pairs with t-SNAREs (Syntaxin-1 and SNAP-25) to form the trans-SNARE core complex.",
        clinicalTopic: "Molecular Neurobiology"
      }
    ]
  }
];

export interface StudentAnalytics {
  totalHoursStudied: number;
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  averageScorePercent: number;
  clinicalReadinessScore: number;
  subjectMastery: { subject: string; score: number; benchmark: number }[];
  weeklyActivity: { day: string; hours: number; assessments: number }[];
  performanceTrend: { date: string; score: number; average: number }[];
  recentActivities: {
    id: string;
    title: string;
    type: 'course' | 'quiz' | 'reading' | 'certificate';
    timestamp: string;
    score?: number;
    courseName: string;
  }[];
  quizHistory: {
    id: string;
    title: string;
    date: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    status: 'Passed' | 'Retake Required';
  }[];
}

export const STUDENT_ANALYTICS: StudentAnalytics = {
  totalHoursStudied: 42.5,
  totalCoursesEnrolled: 4,
  totalCoursesCompleted: 2,
  averageScorePercent: 88.5,
  clinicalReadinessScore: 91,
  subjectMastery: [
    { subject: "Neuroanatomy", score: 94, benchmark: 75 },
    { subject: "Neurosurgery", score: 89, benchmark: 70 },
    { subject: "Neurophysiology", score: 85, benchmark: 72 },
    { subject: "Brain Imaging", score: 91, benchmark: 74 },
    { subject: "Neurological Disorders", score: 84, benchmark: 70 }
  ],
  weeklyActivity: [
    { day: "Mon", hours: 3.5, assessments: 1 },
    { day: "Tue", hours: 4.2, assessments: 0 },
    { day: "Wed", hours: 5.0, assessments: 2 },
    { day: "Thu", hours: 2.8, assessments: 0 },
    { day: "Fri", hours: 6.1, assessments: 1 },
    { day: "Sat", hours: 4.5, assessments: 1 },
    { day: "Sun", hours: 3.2, assessments: 0 }
  ],
  performanceTrend: [
    { date: "Oct 12", score: 80, average: 72 },
    { date: "Oct 19", score: 84, average: 73 },
    { date: "Oct 26", score: 87, average: 75 },
    { date: "Nov 02", score: 92, average: 74 },
    { date: "Nov 06", score: 89, average: 76 }
  ],
  recentActivities: [
    {
      id: "act-1",
      title: "Completed Lesson: Extradural vs. Intradural Clinoidectomy",
      type: "course",
      timestamp: "2 hours ago",
      courseName: "Cranial Base Microsurgical Anatomy"
    },
    {
      id: "act-2",
      title: "Attempted Assessment: Cranial Base Board Simulation",
      type: "quiz",
      score: 93,
      timestamp: "Yesterday",
      courseName: "Cranial Base Microsurgical Anatomy"
    },
    {
      id: "act-3",
      title: "Completed Lesson: Reconstructing the Corticospinal Tract",
      type: "course",
      timestamp: "3 days ago",
      courseName: "Advanced Neuroimaging: fMRI & DTI Tractography"
    },
    {
      id: "act-4",
      title: "Earned Certificate: Foundations of Clinical Neurophysiology",
      type: "certificate",
      timestamp: "1 week ago",
      courseName: "Clinical Neurophysiology & Synaptic Transmission"
    }
  ],
  quizHistory: [
    {
      id: "qh-1",
      title: "Cranial Base & Vascular Neurosurgery Board Simulation",
      date: "Nov 05, 2026",
      score: 93,
      totalQuestions: 5,
      correctAnswers: 5,
      status: "Passed"
    },
    {
      id: "qh-2",
      title: "Synaptic Biophysics & Intraoperative Neurophysiology",
      date: "Oct 29, 2026",
      score: 84,
      totalQuestions: 3,
      correctAnswers: 2,
      status: "Passed"
    },
    {
      id: "qh-3",
      title: "Neurovascular Anatomy & Circle of Willis Diagnostics",
      date: "Oct 15, 2026",
      score: 88,
      totalQuestions: 10,
      correctAnswers: 8,
      status: "Passed"
    }
  ]
};
