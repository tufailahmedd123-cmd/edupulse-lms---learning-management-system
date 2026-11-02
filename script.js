/**
 * ============================================================================
 * EDUPULSE LEARNING MANAGEMENT SYSTEM (LMS) - ENGINE ARCHITECTURE
 * University BSIT Web Technology Academic Prototype
 * Pure Vanilla JavaScript (ES6+) with LocalStorage Persistence
 * ============================================================================
 */

(function () {
  'use strict';

  // --- LocalStorage Keys ---
  const STORAGE_KEYS = {
    USERS: 'edupulse_users',
    CURRENT_USER: 'edupulse_current_user',
    COURSES: 'edupulse_courses',
    CATEGORIES: 'edupulse_categories',
    LESSONS: 'edupulse_lessons',
    ENROLLMENTS: 'edupulse_enrollments',
    PROGRESS: 'edupulse_progress',
    ASSIGNMENTS: 'edupulse_assignments',
    SUBMISSIONS: 'edupulse_submissions',
    QUIZZES: 'edupulse_quizzes',
    QUIZ_ATTEMPTS: 'edupulse_quiz_attempts',
    CERTIFICATES: 'edupulse_certificates',
    NOTIFICATIONS: 'edupulse_notifications',
    MESSAGES: 'edupulse_messages',
    DARK_MODE: 'edupulse_dark_mode'
  };

  // --- Helper Storage Utilities ---
  function saveData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to LocalStorage', e);
    }
  }

  function getData(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Error reading from LocalStorage', e);
      return defaultValue;
    }
  }

  // --- Seed Demo Data Generator ---
  function initDefaultData() {
    // 1. Initial Users (Admin, Instructor, Student)
    if (!getData(STORAGE_KEYS.USERS)) {
      const defaultUsers = [
        {
          id: 'usr_admin_01',
          name: 'System Administrator',
          email: 'admin@lms.com',
          password: 'admin123',
          role: 'admin',
          department: 'Academic Computing Services',
          semester: 'N/A',
          studentId: 'ADMIN-001',
          avatarText: 'AD'
        },
        {
          id: 'usr_inst_01',
          name: 'Prof. Robert Vance',
          email: 'instructor@lms.com',
          password: 'teacher123',
          role: 'instructor',
          department: 'Department of Information Technology',
          semester: 'Faculty Member',
          studentId: 'FAC-802',
          avatarText: 'RV',
          qualification: 'Ph.D. in Computer Science',
          specialization: 'Full-Stack Web Engineering & Distributed Systems'
        },
        {
          id: 'usr_inst_02',
          name: 'Dr. Sarah Jenkins',
          email: 'jenkins@lms.com',
          password: 'teacher123',
          role: 'instructor',
          department: 'Artificial Intelligence Division',
          semester: 'Faculty Member',
          studentId: 'FAC-805',
          avatarText: 'SJ',
          qualification: 'Ph.D. in Machine Learning',
          specialization: 'Deep Learning & Neural Networks'
        },
        {
          id: 'usr_inst_03',
          name: 'Dr. Marcus Vance',
          email: 'marcus@lms.com',
          password: 'teacher123',
          role: 'instructor',
          department: 'Information Assurance & Security',
          semester: 'Faculty Member',
          studentId: 'FAC-809',
          avatarText: 'MV',
          qualification: 'D.Sc. in Cybersecurity',
          specialization: 'Network Security & Penetration Testing'
        },
        {
          id: 'usr_inst_04',
          name: 'Prof. Elena Rostova',
          email: 'elena@lms.com',
          password: 'teacher123',
          role: 'instructor',
          department: 'Data Engineering & Science',
          semester: 'Faculty Member',
          studentId: 'FAC-812',
          avatarText: 'ER',
          qualification: 'M.S. in Database Systems',
          specialization: 'Relational DBs, PostgreSQL, NoSQL'
        },
        {
          id: 'usr_inst_05',
          name: 'Dr. David Thorne',
          email: 'thorne@lms.com',
          password: 'teacher123',
          role: 'instructor',
          department: 'Software Engineering Laboratory',
          semester: 'Faculty Member',
          studentId: 'FAC-818',
          avatarText: 'DT',
          qualification: 'Ph.D. in Software Architecture',
          specialization: 'Cloud Computing, DevOps, Microservices'
        },
        // Sample Student Account (Default Login)
        {
          id: 'usr_stud_01',
          name: 'Alex Hunter',
          email: 'student@lms.com',
          password: 'student123',
          role: 'student',
          department: 'Department of Information Technology',
          semester: 'Semester 5',
          studentId: 'BSIT-2024-001',
          avatarText: 'AH'
        },
        // Additional 14 University Cohort Students
        { id: 'usr_stud_02', name: 'Amina Malik', email: 'amina@university.edu', password: 'password', role: 'student', department: 'Information Technology', semester: 'Semester 6', studentId: 'BSIT-2024-002', avatarText: 'AM' },
        { id: 'usr_stud_03', name: 'David Kim', email: 'david@university.edu', password: 'password', role: 'student', department: 'Information Technology', semester: 'Semester 4', studentId: 'BSIT-2024-003', avatarText: 'DK' },
        { id: 'usr_stud_04', name: 'Sara Rehman', email: 'sara@university.edu', password: 'password', role: 'student', department: 'Computer Science', semester: 'Semester 7', studentId: 'BSCS-2024-010', avatarText: 'SR' },
        { id: 'usr_stud_05', name: 'Carlos Mendez', email: 'carlos@university.edu', password: 'password', role: 'student', department: 'Information Technology', semester: 'Semester 5', studentId: 'BSIT-2024-014', avatarText: 'CM' },
        { id: 'usr_stud_06', name: 'Emily Watson', email: 'emily@university.edu', password: 'password', role: 'student', department: 'Software Engineering', semester: 'Semester 3', studentId: 'BSSE-2024-022', avatarText: 'EW' },
        { id: 'usr_stud_07', name: 'Michael Chen', email: 'michael@university.edu', password: 'password', role: 'student', department: 'Information Technology', semester: 'Semester 5', studentId: 'BSIT-2024-031', avatarText: 'MC' },
        { id: 'usr_stud_08', name: 'Priya Patel', email: 'priya@university.edu', password: 'password', role: 'student', department: 'Artificial Intelligence', semester: 'Semester 4', studentId: 'BSAI-2024-040', avatarText: 'PP' },
        { id: 'usr_stud_09', name: 'Lucas Silva', email: 'lucas@university.edu', password: 'password', role: 'student', department: 'Cybersecurity', semester: 'Semester 6', studentId: 'BSCY-2024-052', avatarText: 'LS' },
        { id: 'usr_stud_10', name: 'Fatima Al-Zahra', email: 'fatima@university.edu', password: 'password', role: 'student', department: 'Information Technology', semester: 'Semester 5', studentId: 'BSIT-2024-061', avatarText: 'FA' },
        { id: 'usr_stud_11', name: 'Daniel Craig', email: 'daniel@university.edu', password: 'password', role: 'student', department: 'Computer Science', semester: 'Semester 8', studentId: 'BSCS-2024-073', avatarText: 'DC' },
        { id: 'usr_stud_12', name: 'Sophie Martin', email: 'sophie@university.edu', password: 'password', role: 'student', department: 'Software Engineering', semester: 'Semester 3', studentId: 'BSSE-2024-080', avatarText: 'SM' },
        { id: 'usr_stud_13', name: 'Kevin O\'Connor', email: 'kevin@university.edu', password: 'password', role: 'student', department: 'Data Science', semester: 'Semester 4', studentId: 'BSDS-2024-091', avatarText: 'KO' },
        { id: 'usr_stud_14', name: 'Liam Neeson', email: 'liam@university.edu', password: 'password', role: 'student', department: 'Information Technology', semester: 'Semester 5', studentId: 'BSIT-2024-105', avatarText: 'LN' },
        { id: 'usr_stud_15', name: 'Chloe Bennet', email: 'chloe@university.edu', password: 'password', role: 'student', department: 'Computer Science', semester: 'Semester 6', studentId: 'BSCS-2024-118', avatarText: 'CB' }
      ];
      saveData(STORAGE_KEYS.USERS, defaultUsers);
    }

    // 2. Initial Categories
    if (!getData(STORAGE_KEYS.CATEGORIES)) {
      const defaultCategories = [
        { id: 'cat_web', name: 'Web Development', icon: 'fa-code', color: '#2563eb', courseCount: 4 },
        { id: 'cat_ai', name: 'Artificial Intelligence', icon: 'fa-brain', color: '#7c3aed', courseCount: 3 },
        { id: 'cat_prog', name: 'Programming', icon: 'fa-laptop-code', color: '#0d9488', courseCount: 3 },
        { id: 'cat_sec', name: 'Cybersecurity', icon: 'fa-shield-halved', color: '#e11d48', courseCount: 2 },
        { id: 'cat_db', name: 'Database Management', icon: 'fa-database', color: '#d97706', courseCount: 2 },
        { id: 'cat_cs', name: 'Computer Science', icon: 'fa-microchip', color: '#059669', courseCount: 2 },
        { id: 'cat_net', name: 'Networking', icon: 'fa-network-wired', color: '#0284c7', courseCount: 2 },
        { id: 'cat_ui', name: 'Graphic Designing', icon: 'fa-bezier-curve', color: '#ec4899', courseCount: 1 }
      ];
      saveData(STORAGE_KEYS.CATEGORIES, defaultCategories);
    }

    // 3. Initial 10 Realistic Courses
    if (!getData(STORAGE_KEYS.COURSES)) {
      const defaultCourses = [
        {
          id: 'crs_web_101',
          title: 'Modern Full-Stack Web Engineering',
          description: 'Master HTML5 semantic markup, CSS3 Flexbox/Grid architectures, modern JavaScript ES6+, RESTful APIs, and responsive design systems suitable for university-level applications.',
          thumbnail: '/src/assets/images/course_web_dev_1793640902083.jpg',
          category: 'Web Development',
          instructor: 'Prof. Robert Vance',
          instructorId: 'usr_inst_01',
          difficulty: 'Intermediate',
          duration: '14 Weeks (42 Hours)',
          lessonsCount: 4,
          studentsCount: 384,
          rating: 4.9,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Basic computing literacy, familiarity with text editors.',
          outcomes: 'Construct responsive web interfaces, implement client-side local storage persistence, build dynamic DOM applications.'
        },
        {
          id: 'crs_ai_201',
          title: 'Artificial Intelligence & Neural Architectures',
          description: 'A deep dive into statistical machine learning algorithms, perceptrons, convolutional neural networks, transformer models, and real-world predictive modeling.',
          thumbnail: '/src/assets/images/course_data_science_1793640901349.jpg',
          category: 'Artificial Intelligence',
          instructor: 'Dr. Sarah Jenkins',
          instructorId: 'usr_inst_02',
          difficulty: 'Advanced',
          duration: '16 Weeks (48 Hours)',
          lessonsCount: 3,
          studentsCount: 295,
          rating: 4.8,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Linear Algebra, Probability, Python Foundations.',
          outcomes: 'Formulate loss functions, train supervised models, evaluate AI accuracy matrices.'
        },
        {
          id: 'crs_sec_301',
          title: 'Enterprise Cybersecurity & Threat Mitigation',
          description: 'Defend enterprise infrastructure using modern penetration testing methodologies, cryptography, firewalls, network packet analysis, and secure code audits.',
          thumbnail: '/src/assets/images/course_cybersecurity_1793640900974.jpg',
          category: 'Cybersecurity',
          instructor: 'Dr. Marcus Vance',
          instructorId: 'usr_inst_03',
          difficulty: 'Advanced',
          duration: '12 Weeks (36 Hours)',
          lessonsCount: 3,
          studentsCount: 210,
          rating: 4.9,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Networking Fundamentals, Linux CLI knowledge.',
          outcomes: 'Analyze security vulnerabilities, configure firewall ACLs, prevent SQL injection.'
        },
        {
          id: 'crs_db_401',
          title: 'Relational Database Design & SQL Optimization',
          description: 'Architect scalable relational databases, normalize schemas to 3NF/BCNF, craft complex multi-table SQL queries, indexing strategies, and transaction isolation.',
          thumbnail: '/src/assets/images/hero_lms_learning_1793640901028.jpg',
          category: 'Database Management',
          instructor: 'Prof. Elena Rostova',
          instructorId: 'usr_inst_04',
          difficulty: 'Intermediate',
          duration: '10 Weeks (30 Hours)',
          lessonsCount: 3,
          studentsCount: 340,
          rating: 4.7,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Discrete Mathematics, basic logical expressions.',
          outcomes: 'Design normalized ER diagrams, optimize indexing execution plans, write stored procedures.'
        },
        {
          id: 'crs_prog_501',
          title: 'Advanced Python for Software Engineers',
          description: 'Harness object-oriented programming, decorators, generators, asynchronous concurrency, and clean test-driven design in production Python.',
          thumbnail: '/src/assets/images/course_data_science_1793640901349.jpg',
          category: 'Programming',
          instructor: 'Dr. Sarah Jenkins',
          instructorId: 'usr_inst_02',
          difficulty: 'Intermediate',
          duration: '10 Weeks (30 Hours)',
          lessonsCount: 3,
          studentsCount: 420,
          rating: 4.9,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Introductory programming concepts.',
          outcomes: 'Write modular Python packages, use context managers, apply asyncio.'
        },
        {
          id: 'crs_cs_601',
          title: 'Data Structures & Algorithmic Analysis',
          description: 'Analyze time-space asymptotic complexity (Big-O), implement binary search trees, graph traversals (BFS/DFS), dynamic programming, and greedy heuristics.',
          thumbnail: '/src/assets/images/course_web_dev_1793640902083.jpg',
          category: 'Computer Science',
          instructor: 'Prof. Robert Vance',
          instructorId: 'usr_inst_01',
          difficulty: 'Advanced',
          duration: '14 Weeks (42 Hours)',
          lessonsCount: 3,
          studentsCount: 512,
          rating: 4.8,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'At least one procedural programming language.',
          outcomes: 'Evaluate Big-O runtimes, implement self-balancing trees, solve complex dynamic programming problems.'
        },
        {
          id: 'crs_net_701',
          title: 'Computer Networks & Internet Protocol Suite',
          description: 'Explore the OSI 7-layer architecture, TCP/IP handshake, DNS routing, subnetting, Wireshark packet capture, and transport layer protocols.',
          thumbnail: '/src/assets/images/course_cybersecurity_1793640900974.jpg',
          category: 'Networking',
          instructor: 'Dr. Marcus Vance',
          instructorId: 'usr_inst_03',
          difficulty: 'Beginner',
          duration: '8 Weeks (24 Hours)',
          lessonsCount: 3,
          studentsCount: 190,
          rating: 4.6,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Basic computing knowledge.',
          outcomes: 'Calculate IPv4/IPv6 CIDR subnets, analyze packet traces, configure DNS lookups.'
        },
        {
          id: 'crs_ui_801',
          title: 'UI/UX Interface Design & Design Systems',
          description: 'Design intuitive digital products using design thinking, user persona mapping, typographic hierarchy, responsive grid systems, and accessibility guidelines.',
          thumbnail: '/src/assets/images/course_web_dev_1793640902083.jpg',
          category: 'Graphic Designing',
          instructor: 'Prof. Robert Vance',
          instructorId: 'usr_inst_01',
          difficulty: 'Beginner',
          duration: '8 Weeks (24 Hours)',
          lessonsCount: 3,
          studentsCount: 275,
          rating: 4.7,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Passion for visual design and digital ergonomics.',
          outcomes: 'Create cohesive design system tokens, maintain WCAG AA contrast standards.'
        },
        {
          id: 'crs_devops_901',
          title: 'Cloud Computing & DevOps Pipelines',
          description: 'Containerize microservices with Docker, automate CI/CD GitHub Actions pipelines, provision cloud compute infrastructure, and monitor telemetry.',
          thumbnail: '/src/assets/images/course_cybersecurity_1793640900974.jpg',
          category: 'Computer Science',
          instructor: 'Dr. David Thorne',
          instructorId: 'usr_inst_05',
          difficulty: 'Advanced',
          duration: '12 Weeks (36 Hours)',
          lessonsCount: 3,
          studentsCount: 230,
          rating: 4.9,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Linux CLI, Git version control.',
          outcomes: 'Build multi-stage Dockerfiles, deploy automated deployment workflows.'
        },
        {
          id: 'crs_prog_1001',
          title: 'Object-Oriented Software Design Patterns',
          description: 'Master Gang of Four (GoF) structural, creational, and behavioral design patterns to architect robust, maintainable, and decoupled enterprise codebases.',
          thumbnail: '/src/assets/images/hero_lms_learning_1793640901028.jpg',
          category: 'Programming',
          instructor: 'Dr. David Thorne',
          instructorId: 'usr_inst_05',
          difficulty: 'Intermediate',
          duration: '10 Weeks (30 Hours)',
          lessonsCount: 3,
          studentsCount: 310,
          rating: 4.8,
          price: 'Free (Academic)',
          status: 'Active',
          requirements: 'Java, C++, or C# foundational syntax.',
          outcomes: 'Implement Factory, Singleton, Strategy, and Observer design patterns.'
        }
      ];
      saveData(STORAGE_KEYS.COURSES, defaultCourses);
    }

    // 4. Initial 30+ Lessons across Courses
    if (!getData(STORAGE_KEYS.LESSONS)) {
      const defaultLessons = [
        // Course 1: Web Engineering (4 Lessons)
        {
          id: 'lsn_web_1',
          courseId: 'crs_web_101',
          title: 'HTML5 Semantic Architecture & Document Structure',
          duration: '22 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'An exhaustive exploration of semantic HTML5 tags: <header>, <main>, <nav>, <article>, and accessibility ARIA landmarks for screen readers and SEO.',
          resources: [
            { name: 'HTML5 Semantic Cheatsheet (PDF)', size: '1.2 MB' },
            { name: 'Document Boilerplate & Starter Code (ZIP)', size: '340 KB' }
          ]
        },
        {
          id: 'lsn_web_2',
          courseId: 'crs_web_101',
          title: 'Modern CSS3 Flexbox & Grid Masterclass',
          duration: '35 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Build robust, responsive two-dimensional web layouts without rigid frameworks. Learn grid-template-columns, minmax(), auto-fit, and flex alignment.',
          resources: [
            { name: 'Flexbox & Grid Visual Reference (PDF)', size: '2.4 MB' },
            { name: 'Responsive Layout Exercises (HTML/CSS)', size: '850 KB' }
          ]
        },
        {
          id: 'lsn_web_3',
          courseId: 'crs_web_101',
          title: 'Vanilla JavaScript ES6+ & DOM Manipulation',
          duration: '45 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Master arrow functions, destructuring, promises, async/await, event delegation, and dynamic DOM rendering without external runtime overhead.',
          resources: [
            { name: 'ES6 Syntax Summary & Guide', size: '1.8 MB' },
            { name: 'DOM Manipulation Interactive Sandbox', size: '1.1 MB' }
          ]
        },
        {
          id: 'lsn_web_4',
          courseId: 'crs_web_101',
          title: 'Client-Side State Persistence with LocalStorage',
          duration: '28 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Learn how single-page applications serialize, parse, and synchronize application state in browser storage for persistent multi-role user sessions.',
          resources: [
            { name: 'Storage Architecture Diagram & Code', size: '920 KB' }
          ]
        },

        // Course 2: AI & Neural Networks (3 Lessons)
        {
          id: 'lsn_ai_1',
          courseId: 'crs_ai_201',
          title: 'Foundations of Statistical Learning & Gradient Descent',
          duration: '40 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'Mathematical intuition behind gradient optimization, cost surfaces, learning rate schedules, and backpropagation.',
          resources: [{ name: 'Gradient Descent Derivation Notes (PDF)', size: '3.1 MB' }]
        },
        {
          id: 'lsn_ai_2',
          courseId: 'crs_ai_201',
          title: 'Multi-Layer Perceptrons & Activation Functions',
          duration: '38 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Examining non-linear activation functions: ReLU, Sigmoid, GELU, and preventing vanishing or exploding gradients.',
          resources: [{ name: 'Activation Functions Compared (PDF)', size: '1.5 MB' }]
        },
        {
          id: 'lsn_ai_3',
          courseId: 'crs_ai_201',
          title: 'Convolutional Networks for Computer Vision',
          duration: '44 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Feature map extraction, pooling strategies, and training image classification pipelines.',
          resources: [{ name: 'CNN Kernel Operations Worksheet', size: '2.0 MB' }]
        },

        // Course 3: Cybersecurity (3 Lessons)
        {
          id: 'lsn_sec_1',
          courseId: 'crs_sec_301',
          title: 'Network Penetration Fundamentals & Port Scanning',
          duration: '32 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Understanding TCP SYN scanning, service banner grabbing, and defensive intrusion detection signatures.',
          resources: [{ name: 'Port Analysis & Reconnaissance Guide', size: '1.7 MB' }]
        },
        {
          id: 'lsn_sec_2',
          courseId: 'crs_sec_301',
          title: 'Public Key Cryptography & TLS 1.3 Handshake',
          duration: '41 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Diffie-Hellman ephemeral key exchanges, AES-GCM symmetric block ciphers, and PKI trust verification.',
          resources: [{ name: 'Cryptography Mathematical Primer', size: '2.5 MB' }]
        },
        {
          id: 'lsn_sec_3',
          courseId: 'crs_sec_301',
          title: 'OWASP Top 10 Web Vulnerability Defenses',
          duration: '36 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'Mitigating Cross-Site Scripting (XSS), SQL Injection, CSRF tokens, and secure HTTP header hardening.',
          resources: [{ name: 'OWASP Security Checklist', size: '980 KB' }]
        },

        // Course 4: Database Management (3 Lessons)
        {
          id: 'lsn_db_1',
          courseId: 'crs_db_401',
          title: 'Entity Relationship Modeling & Normal Forms',
          duration: '30 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'From unnormalized data tables to Boyce-Codd Normal Form (BCNF): removing insertion, update, and deletion anomalies.',
          resources: [{ name: 'Normalization Step-by-Step Guide', size: '1.4 MB' }]
        },
        {
          id: 'lsn_db_2',
          courseId: 'crs_db_401',
          title: 'Advanced SQL Joins, Aggregations, & Window Functions',
          duration: '45 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Mastering INNER/LEFT/FULL OUTER joins, GROUP BY, HAVING, and analytic window functions (ROW_NUMBER, RANK).',
          resources: [{ name: 'SQL Query Workbook & Solutions', size: '2.2 MB' }]
        },
        {
          id: 'lsn_db_3',
          courseId: 'crs_db_401',
          title: 'B-Tree Indexing & Query Execution Plans',
          duration: '34 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Analyzing EXPLAIN execution plans, index scans vs sequential table scans, and composite indexing rules.',
          resources: [{ name: 'Query Optimization Blueprint', size: '1.9 MB' }]
        },

        // Course 5: Python (3 Lessons)
        {
          id: 'lsn_py_1',
          courseId: 'crs_prog_501',
          title: 'Advanced OOP: Polymorphism & Dunder Methods',
          duration: '29 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Special magic methods (__repr__, __enter__, __call__) and Pythonic protocols.',
          resources: [{ name: 'Python Dunder Methods Reference', size: '1.1 MB' }]
        },
        {
          id: 'lsn_py_2',
          courseId: 'crs_prog_501',
          title: 'Generators, Iterators, and Memory Efficiency',
          duration: '33 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'Streaming gigabyte datasets using lazy generator expressions and yield keywords.',
          resources: [{ name: 'Generators Lab Notebook', size: '820 KB' }]
        },
        {
          id: 'lsn_py_3',
          courseId: 'crs_prog_501',
          title: 'Metaprogramming & Function Decorators',
          duration: '38 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Building custom timing, authorization, and caching decorators with functools.wraps.',
          resources: [{ name: 'Decorator Code Patterns', size: '1.3 MB' }]
        },

        // Course 6: Data Structures (3 Lessons)
        {
          id: 'lsn_cs_1',
          courseId: 'crs_cs_601',
          title: 'Asymptotic Analysis & Big-O Notation',
          duration: '26 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Formal definition of Big-O, Big-Omega, Big-Theta, and classifying recurring relations.',
          resources: [{ name: 'Big-O Quick Reference Chart', size: '950 KB' }]
        },
        {
          id: 'lsn_cs_2',
          courseId: 'crs_cs_601',
          title: 'Trees & Graphs: BFS, DFS, and Dijkstra',
          duration: '42 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Breadth-First and Depth-First search, adjacency lists, and shortest path graph algorithms.',
          resources: [{ name: 'Graph Traversal Visual Walkthrough', size: '2.8 MB' }]
        },
        {
          id: 'lsn_cs_3',
          courseId: 'crs_cs_601',
          title: 'Dynamic Programming: Memoization & Tabulation',
          duration: '49 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Overlapping subproblems, optimal substructure, and the 0/1 Knapsack problem.',
          resources: [{ name: 'Dynamic Programming Master Patterns', size: '3.4 MB' }]
        },

        // Course 7: Networking (3 Lessons)
        {
          id: 'lsn_net_1',
          courseId: 'crs_net_701',
          title: 'The OSI Model & Physical vs Logical Addressing',
          duration: '25 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'MAC addresses vs IP addresses, frame encapsulation, and hardware networking components.',
          resources: [{ name: 'OSI 7 Layers Diagram', size: '1.2 MB' }]
        },
        {
          id: 'lsn_net_2',
          courseId: 'crs_net_701',
          title: 'IPv4 Subnetting & CIDR Calculation Workshop',
          duration: '37 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Subnet masks, broadcast addresses, usable host ranges, and VLSM variable length subnetting.',
          resources: [{ name: 'Subnetting Cheat Sheet & Practice Sheet', size: '1.6 MB' }]
        },
        {
          id: 'lsn_net_3',
          courseId: 'crs_net_701',
          title: 'TCP vs UDP Protocols & Three-Way Handshake',
          duration: '31 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Reliable transmission, sequence numbers, checksums, window scaling, and flow control.',
          resources: [{ name: 'TCP Header Analysis Packet Guide', size: '1.4 MB' }]
        },

        // Course 8: UI/UX (3 Lessons)
        {
          id: 'lsn_ui_1',
          courseId: 'crs_ui_801',
          title: 'Visual Hierarchy, Typography, & Spatial Spacing',
          duration: '24 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'The 8pt grid system, font pairing harmonies, and guiding the user eye with intentional weight.',
          resources: [{ name: 'UI Typography Guidelines', size: '2.1 MB' }]
        },
        {
          id: 'lsn_ui_2',
          courseId: 'crs_ui_801',
          title: 'Design Systems & Component Tokenization',
          duration: '30 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Defining semantic color tokens, consistent border radii, and reusable component libraries.',
          resources: [{ name: 'Design Tokens Architecture Starter', size: '1.5 MB' }]
        },
        {
          id: 'lsn_ui_3',
          courseId: 'crs_ui_801',
          title: 'Usability Testing & Accessibility (WCAG 2.1)',
          duration: '27 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'Ensuring color contrast compliance, keyboard focus trapping, and inclusive UX flows.',
          resources: [{ name: 'WCAG 2.1 AA Audit Checklist', size: '1.0 MB' }]
        },

        // Course 9: Cloud & DevOps (3 Lessons)
        {
          id: 'lsn_dev_1',
          courseId: 'crs_devops_901',
          title: 'Docker Architecture & Multi-Stage Containers',
          duration: '35 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Writing lean Dockerfiles, layer caching optimization, and container isolation.',
          resources: [{ name: 'Docker Command Cheat Sheet', size: '1.1 MB' }]
        },
        {
          id: 'lsn_dev_2',
          courseId: 'crs_devops_901',
          title: 'Continuous Integration with GitHub Actions',
          duration: '32 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Automating linting, automated testing, and building production artifacts on git push.',
          resources: [{ name: 'CI/CD Workflow YAML Templates', size: '750 KB' }]
        },
        {
          id: 'lsn_dev_3',
          courseId: 'crs_devops_901',
          title: 'Cloud Infrastructure & Microservice Scaling',
          duration: '40 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Load balancers, horizontal auto-scaling, reverse proxies, and health check monitoring.',
          resources: [{ name: 'Cloud Architecture Diagrams', size: '2.7 MB' }]
        },

        // Course 10: OOP Design Patterns (3 Lessons)
        {
          id: 'lsn_oops_1',
          courseId: 'crs_prog_1001',
          title: 'Creational Patterns: Factory & Singleton',
          duration: '28 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Decoupling object instantiation and controlling global access safely without anti-patterns.',
          resources: [{ name: 'Creational Patterns Code Samples', size: '1.3 MB' }]
        },
        {
          id: 'lsn_oops_2',
          courseId: 'crs_prog_1001',
          title: 'Structural Patterns: Adapter & Decorator',
          duration: '32 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'Composing objects dynamically to extend functionality without modifying existing classes.',
          resources: [{ name: 'Structural Patterns Implementation Guide', size: '1.6 MB' }]
        },
        {
          id: 'lsn_oops_3',
          courseId: 'crs_prog_1001',
          title: 'Behavioral Patterns: Observer & Strategy',
          duration: '36 min',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Event-driven architectures, pub-sub systems, and runtime algorithm interchangeable strategies.',
          resources: [{ name: 'Behavioral Patterns Reference Code', size: '1.9 MB' }]
        }
      ];
      saveData(STORAGE_KEYS.LESSONS, defaultLessons);
    }

    // 5. Initial Enrollments for Demo Student
    if (!getData(STORAGE_KEYS.ENROLLMENTS)) {
      const defaultEnrollments = [
        {
          id: 'enr_01',
          studentId: 'usr_stud_01',
          courseId: 'crs_web_101',
          enrolledAt: '2026-10-15',
          completedLessons: ['lsn_web_1', 'lsn_web_2', 'lsn_web_3'],
          lastViewedLessonId: 'lsn_web_3',
          progressPercent: 75,
          completed: false
        },
        {
          id: 'enr_02',
          studentId: 'usr_stud_01',
          courseId: 'crs_db_401',
          enrolledAt: '2026-10-20',
          completedLessons: ['lsn_db_1', 'lsn_db_2', 'lsn_db_3'],
          lastViewedLessonId: 'lsn_db_3',
          progressPercent: 100,
          completed: true,
          completionDate: '2026-11-01'
        },
        {
          id: 'enr_03',
          studentId: 'usr_stud_01',
          courseId: 'crs_sec_301',
          enrolledAt: '2026-10-28',
          completedLessons: ['lsn_sec_1'],
          lastViewedLessonId: 'lsn_sec_1',
          progressPercent: 33,
          completed: false
        }
      ];
      saveData(STORAGE_KEYS.ENROLLMENTS, defaultEnrollments);
    }

    // 6. Initial 10 Assignments
    if (!getData(STORAGE_KEYS.ASSIGNMENTS)) {
      const defaultAssignments = [
        {
          id: 'asg_01',
          title: 'Responsive University Portfolio Layout',
          courseId: 'crs_web_101',
          courseTitle: 'Modern Full-Stack Web Engineering',
          instructor: 'Prof. Robert Vance',
          dueDate: '2026-11-10',
          totalMarks: 100,
          description: 'Build a mobile-first responsive portfolio using HTML5 semantic elements and CSS Flexbox/Grid. Must adhere strictly to WCAG AA accessibility standards.'
        },
        {
          id: 'asg_02',
          title: 'JavaScript LocalStorage State Manager',
          courseId: 'crs_web_101',
          courseTitle: 'Modern Full-Stack Web Engineering',
          instructor: 'Prof. Robert Vance',
          dueDate: '2026-11-18',
          totalMarks: 100,
          description: 'Construct a reusable Vanilla JavaScript module that serializes application state into browser LocalStorage with error resilience.'
        },
        {
          id: 'asg_03',
          title: 'Backpropagation Gradient Derivation',
          courseId: 'crs_ai_201',
          courseTitle: 'Artificial Intelligence & Neural Architectures',
          instructor: 'Dr. Sarah Jenkins',
          dueDate: '2026-11-14',
          totalMarks: 50,
          description: 'Derive partial derivatives for a 2-layer perceptron network using mean squared error loss function.'
        },
        {
          id: 'asg_04',
          title: 'Penetration Testing Wireshark Packet Analysis',
          courseId: 'crs_sec_301',
          courseTitle: 'Enterprise Cybersecurity & Threat Mitigation',
          instructor: 'Dr. Marcus Vance',
          dueDate: '2026-11-12',
          totalMarks: 100,
          description: 'Inspect sample .pcap network capture files to identify rogue DHCP servers and suspicious TCP handshake anomalies.'
        },
        {
          id: 'asg_05',
          title: 'Database Normalization & BCNF Decomposition',
          courseId: 'crs_db_401',
          courseTitle: 'Relational Database Design & SQL Optimization',
          instructor: 'Prof. Elena Rostova',
          dueDate: '2026-10-30',
          totalMarks: 100,
          description: 'Given an unnormalized enterprise order schema, decompose tables into Third Normal Form (3NF) and demonstrate dependency preservation.'
        },
        {
          id: 'asg_06',
          title: 'Python Custom Async Context Manager',
          courseId: 'crs_prog_501',
          courseTitle: 'Advanced Python for Software Engineers',
          instructor: 'Dr. Sarah Jenkins',
          dueDate: '2026-11-20',
          totalMarks: 100,
          description: 'Implement a non-blocking asynchronous database connection pool using Python asyncio and async context managers.'
        },
        {
          id: 'asg_07',
          title: 'Binary Search Tree Balancing Implementation',
          courseId: 'crs_cs_601',
          courseTitle: 'Data Structures & Algorithmic Analysis',
          instructor: 'Prof. Robert Vance',
          dueDate: '2026-11-25',
          totalMarks: 100,
          description: 'Write an AVL self-balancing tree implementation with left and right rotation algorithms.'
        },
        {
          id: 'asg_08',
          title: 'IPv4 CIDR VLSM Network Design',
          courseId: 'crs_net_701',
          courseTitle: 'Computer Networks & Internet Protocol Suite',
          instructor: 'Dr. Marcus Vance',
          dueDate: '2026-11-15',
          totalMarks: 80,
          description: 'Design an IP allocation scheme for an academic campus with 4 distinct computer labs using /24 subnets.'
        },
        {
          id: 'asg_09',
          title: 'Accessible Design System Component Kit',
          courseId: 'crs_ui_801',
          courseTitle: 'UI/UX Interface Design & Design Systems',
          instructor: 'Prof. Robert Vance',
          dueDate: '2026-11-22',
          totalMarks: 100,
          description: 'Construct a reusable set of UI form components with visible focus rings and WCAG 4.5:1 contrast.'
        },
        {
          id: 'asg_10',
          title: 'Multi-Stage Dockerfile for Node.js Application',
          courseId: 'crs_devops_901',
          courseTitle: 'Cloud Computing & DevOps Pipelines',
          instructor: 'Dr. David Thorne',
          dueDate: '2026-11-28',
          totalMarks: 100,
          description: 'Create an optimized Docker container build that separates compile-time dependencies from production runtime.'
        }
      ];
      saveData(STORAGE_KEYS.ASSIGNMENTS, defaultAssignments);
    }

    // 7. Initial Submissions
    if (!getData(STORAGE_KEYS.SUBMISSIONS)) {
      const defaultSubmissions = [
        {
          id: 'sub_01',
          assignmentId: 'asg_05',
          studentId: 'usr_stud_01',
          studentName: 'Alex Hunter',
          studentEmail: 'student@lms.com',
          status: 'graded',
          submittedAt: '2026-10-29',
          submissionText: 'Completed BCNF decomposition of the relational order schema. Separated customer identifiers, line items, and product catalog into individual tables with foreign key constraints.',
          fileName: 'Database_Schema_BCNF_AlexHunter.pdf',
          marksObtained: 96,
          maxMarks: 100,
          feedback: 'Outstanding normalization proof. Clear ER diagrams and excellent constraint specifications.'
        },
        {
          id: 'sub_02',
          assignmentId: 'asg_01',
          studentId: 'usr_stud_01',
          studentName: 'Alex Hunter',
          studentEmail: 'student@lms.com',
          status: 'submitted',
          submittedAt: '2026-11-01',
          submissionText: 'GitHub Repository: https://github.com/alexhunter/bsit-responsive-portfolio\nImplemented CSS Grid 12-column layout and validated with Lighthouse accessibility score 100/100.',
          fileName: 'Portfolio_Code_Bundle.zip',
          marksObtained: null,
          maxMarks: 100,
          feedback: null
        },
        {
          id: 'sub_03',
          assignmentId: 'asg_01',
          studentId: 'usr_stud_02',
          studentName: 'Amina Malik',
          studentEmail: 'amina@university.edu',
          status: 'submitted',
          submittedAt: '2026-11-01',
          submissionText: 'Live URL: https://amina-web-tech.pages.dev/\nBuilt responsive layout with full semantic navigation and print stylesheet.',
          fileName: 'Amina_Portfolio_Submission.pdf',
          marksObtained: null,
          maxMarks: 100,
          feedback: null
        }
      ];
      saveData(STORAGE_KEYS.SUBMISSIONS, defaultSubmissions);
    }

    // 8. Initial 5 Quizzes with 20+ Questions Total
    if (!getData(STORAGE_KEYS.QUIZZES)) {
      const defaultQuizzes = [
        {
          id: 'qz_01',
          title: 'HTML5 & CSS3 Core Architecture Quiz',
          courseId: 'crs_web_101',
          courseTitle: 'Modern Full-Stack Web Engineering',
          durationMinutes: 10,
          passingScore: 60,
          questions: [
            {
              text: 'Which HTML5 element represents an independent, self-contained piece of content that could be distributed in an RSS feed?',
              options: ['<section>', '<article>', '<aside>', '<div>'],
              correctIndex: 1
            },
            {
              text: 'In CSS Flexbox, which property defines the default size of an element before the remaining space is distributed?',
              options: ['flex-basis', 'flex-grow', 'flex-shrink', 'flex-direction'],
              correctIndex: 0
            },
            {
              text: 'What is the key difference between LocalStorage and SessionStorage in modern browsers?',
              options: [
                'LocalStorage is encrypted automatically while SessionStorage is not',
                'LocalStorage data persists after browser window closure; SessionStorage clears on tab close',
                'LocalStorage cannot store JSON objects',
                'SessionStorage is sent automatically with HTTP request headers'
              ],
              correctIndex: 1
            },
            {
              text: 'Which CSS Grid property specifies automatic multi-column layouts without media queries?',
              options: [
                'grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))',
                'display: flex-wrap: auto',
                'grid-auto-flow: dense-all',
                'grid-columns: flex-auto'
              ],
              correctIndex: 0
            },
            {
              text: 'Which JavaScript method correctly serializes a JavaScript object into a string for storage?',
              options: ['JSON.parse()', 'JSON.stringify()', 'Object.toString()', 'Array.prototype.join()'],
              correctIndex: 1
            }
          ]
        },
        {
          id: 'qz_02',
          title: 'Relational Database SQL Evaluation',
          courseId: 'crs_db_401',
          courseTitle: 'Relational Database Design & SQL Optimization',
          durationMinutes: 10,
          passingScore: 60,
          questions: [
            {
              text: 'Which normal form requires that all non-key attributes are fully functionally dependent on the primary key, eliminating partial dependencies?',
              options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'BCNF'],
              correctIndex: 1
            },
            {
              text: 'What type of index is physically stored in the same order as the actual table records on disk?',
              options: ['Clustered Index', 'Non-Clustered Index', 'Hash Index', 'Composite Index'],
              correctIndex: 0
            },
            {
              text: 'Which SQL clause filters records after aggregation with the GROUP BY statement?',
              options: ['WHERE', 'HAVING', 'FILTER', 'QUALIFY'],
              correctIndex: 1
            },
            {
              text: 'Which ACID property guarantees that all operations within a database transaction succeed or all fail together?',
              options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'qz_03',
          title: 'Cybersecurity & Cryptography Assessment',
          courseId: 'crs_sec_301',
          courseTitle: 'Enterprise Cybersecurity & Threat Mitigation',
          durationMinutes: 10,
          passingScore: 60,
          questions: [
            {
              text: 'Which cryptographic algorithm is asymmetric and relies on the mathematical difficulty of factoring large prime numbers?',
              options: ['AES-256', 'RSA', 'SHA-3', 'DES'],
              correctIndex: 1
            },
            {
              text: 'What primary security mechanism protects web applications against Cross-Site Request Forgery (CSRF)?',
              options: [
                'Strong password requirements',
                'Anti-CSRF synchronizer tokens and SameSite cookie attributes',
                'Using HTTPS exclusively',
                'Disabling JavaScript in the client browser'
              ],
              correctIndex: 1
            },
            {
              text: 'Which Nmap scan flag initiates a half-open TCP SYN stealth scan without completing the full three-way handshake?',
              options: ['-sS', '-sT', '-sU', '-sP'],
              correctIndex: 0
            },
            {
              text: 'What HTTP header instructs the browser to never render a page inside an <iframe>, mitigating clickjacking?',
              options: ['X-Frame-Options: DENY', 'Content-Encoding: gzip', 'Strict-Transport-Security', 'Access-Control-Allow-Origin: *'],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'qz_04',
          title: 'Artificial Intelligence Foundations Exam',
          courseId: 'crs_ai_201',
          courseTitle: 'Artificial Intelligence & Neural Architectures',
          durationMinutes: 10,
          passingScore: 60,
          questions: [
            {
              text: 'What problem commonly occurs when training deep recurrent networks with sigmoid activations over many time steps?',
              options: ['Vanishing Gradient Problem', 'Dead Neurons', 'Negative Eigenvalues', 'Over-pruning'],
              correctIndex: 0
            },
            {
              text: 'Which activation function is defined mathematically as f(x) = max(0, x)?',
              options: ['Sigmoid', 'Tanh', 'ReLU', 'Leaky Softmax'],
              correctIndex: 2
            },
            {
              text: 'In supervised machine learning, which term describes when a model memorizes training noise and fails to generalize to test data?',
              options: ['Underfitting', 'Overfitting', 'Collinearity', 'High Bias'],
              correctIndex: 1
            },
            {
              text: 'What metric evaluates the proportion of true positive predictions among all positive assertions made by a classifier?',
              options: ['Precision', 'Recall', 'Accuracy', 'Specificity'],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'qz_05',
          title: 'Computer Networking & Protocols Quiz',
          courseId: 'crs_net_701',
          courseTitle: 'Computer Networks & Internet Protocol Suite',
          durationMinutes: 10,
          passingScore: 60,
          questions: [
            {
              text: 'How many total usable host IP addresses are available in a standard /27 IPv4 subnet?',
              options: ['32', '30', '16', '14'],
              correctIndex: 1
            },
            {
              text: 'Which OSI layer is responsible for logical routing, IP packet forwarding, and path determination?',
              options: ['Data Link Layer (Layer 2)', 'Network Layer (Layer 3)', 'Transport Layer (Layer 4)', 'Session Layer (Layer 5)'],
              correctIndex: 1
            },
            {
              text: 'What flag sequence represents the standard TCP three-way handshake connection establishment?',
              options: ['SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> RST', 'FIN -> ACK -> FIN-ACK', 'SYN -> FIN -> ACK'],
              correctIndex: 0
            },
            {
              text: 'Which DNS record maps a human-readable hostname directly to an IPv4 address?',
              options: ['AAAA Record', 'A Record', 'CNAME Record', 'MX Record'],
              correctIndex: 1
            }
          ]
        }
      ];
      saveData(STORAGE_KEYS.QUIZZES, defaultQuizzes);
    }

    // 9. Initial Quiz Attempts for Demo Student
    if (!getData(STORAGE_KEYS.QUIZ_ATTEMPTS)) {
      const defaultAttempts = [
        {
          id: 'att_01',
          quizId: 'qz_02',
          studentId: 'usr_stud_01',
          scorePercent: 100,
          correctAnswers: 4,
          totalQuestions: 4,
          passed: true,
          date: '2026-11-01'
        }
      ];
      saveData(STORAGE_KEYS.QUIZ_ATTEMPTS, defaultAttempts);
    }

    // 10. Initial Notifications
    if (!getData(STORAGE_KEYS.NOTIFICATIONS)) {
      const defaultNotifications = [
        {
          id: 'ntf_01',
          userId: 'usr_stud_01',
          title: 'Assignment Graded',
          message: 'Your submission for "Database Normalization & BCNF Decomposition" scored 96/100.',
          time: '2 hours ago',
          read: false,
          icon: 'fa-file-circle-check'
        },
        {
          id: 'ntf_02',
          userId: 'usr_stud_01',
          title: 'Certificate Unlocked!',
          message: 'Congratulations! You have completed Relational Database Design & SQL Optimization.',
          time: '1 day ago',
          read: false,
          icon: 'fa-award'
        },
        {
          id: 'ntf_03',
          userId: 'usr_stud_01',
          title: 'New Lesson Available',
          message: 'Prof. Robert Vance uploaded a new lecture in Modern Full-Stack Web Engineering.',
          time: '3 days ago',
          read: true,
          icon: 'fa-video'
        }
      ];
      saveData(STORAGE_KEYS.NOTIFICATIONS, defaultNotifications);
    }

    // 11. Initial Messages
    if (!getData(STORAGE_KEYS.MESSAGES)) {
      const defaultMessages = [
        {
          id: 'msg_01',
          senderId: 'usr_inst_01',
          senderName: 'Prof. Robert Vance',
          receiverId: 'usr_stud_01',
          text: 'Hello Alex, excellent work on your portfolio draft. Make sure to check the CSS Grid layout on mobile screens before the final deadline!',
          time: 'Nov 1, 14:30',
          isFromMe: false
        },
        {
          id: 'msg_02',
          senderId: 'usr_stud_01',
          senderName: 'Alex Hunter',
          receiverId: 'usr_inst_01',
          text: 'Thank you Professor! I just updated the auto-fit minmax configuration and tested it with Chrome DevTools.',
          time: 'Nov 1, 15:05',
          isFromMe: true
        }
      ];
      saveData(STORAGE_KEYS.MESSAGES, defaultMessages);
    }

    // 12. Certificates
    if (!getData(STORAGE_KEYS.CERTIFICATES)) {
      const defaultCerts = [
        {
          id: 'cert_89412',
          studentId: 'usr_stud_01',
          studentName: 'Alex Hunter',
          courseId: 'crs_db_401',
          courseTitle: 'Relational Database Design & SQL Optimization',
          instructorName: 'Prof. Elena Rostova',
          issueDate: 'November 1, 2026',
          verificationId: 'EP-2026-89412'
        }
      ];
      saveData(STORAGE_KEYS.CERTIFICATES, defaultCerts);
    }
  }

  // --- Main Application Controller (Exposed Globally as LMS_App) ---
  const LMS_App = {
    currentUser: null,
    currentView: 'landing',
    activeStudentTab: 'overview',
    activeInstructorTab: 'overview',
    activeAdminTab: 'overview',
    currentLearningCourse: null,
    currentLessonIndex: 0,
    activeQuiz: null,
    quizTimerInterval: null,
    quizRemainingSeconds: 0,
    quizUserAnswers: {},
    chartInstances: {},

    init() {
      initDefaultData();

      // Check for saved logged-in user
      const savedUser = getData(STORAGE_KEYS.CURRENT_USER);
      if (savedUser) {
        this.currentUser = savedUser;
      }

      // Check dark mode
      const isDark = getData(STORAGE_KEYS.DARK_MODE, false);
      if (isDark) {
        document.body.classList.add('dark-mode');
        this.updateThemeToggleIcon(true);
      }

      this.updateAuthUI();
      this.populateCategoriesDropdowns();
      this.renderLandingPage();

      // Setup window resize listener for chart responsiveness
      window.addEventListener('resize', () => {
        if (this.currentView === 'admin-dashboard' && this.activeAdminTab === 'overview') {
          this.renderAdminCharts();
        }
      });
    },

    // =========================================================================
    // NAVIGATION & VIEW ROUTING
    // =========================================================================
    navigate(viewName, params = {}) {
      // Clear any active quiz timers if navigating away
      if (this.currentView === 'quiz-runner' && viewName !== 'quiz-runner') {
        clearInterval(this.quizTimerInterval);
      }

      // Hide all views
      const views = document.querySelectorAll('.app-view');
      views.forEach(v => v.style.display = 'none');

      // Update active nav links
      const navLinks = document.querySelectorAll('#mainNavLinks .nav-link');
      navLinks.forEach(link => link.classList.remove('active'));

      this.currentView = viewName;

      switch (viewName) {
        case 'landing': {
          const v = document.getElementById('view-landing');
          if (v) v.style.display = 'block';
          this.renderLandingPage();
          window.scrollTo(0, 0);
          break;
        }
        case 'courses': {
          const v = document.getElementById('view-courses');
          if (v) v.style.display = 'block';
          this.renderCoursesCatalog();
          window.scrollTo(0, 0);
          break;
        }
        case 'course-detail': {
          const v = document.getElementById('view-course-details');
          if (v) v.style.display = 'block';
          this.renderCourseDetails(params.courseId);
          window.scrollTo(0, 0);
          break;
        }
        case 'student-dashboard': {
          if (!this.requireAuth('student')) return;
          const v = document.getElementById('view-student-dashboard');
          if (v) v.style.display = 'block';
          this.renderStudentDashboard();
          break;
        }
        case 'instructor-dashboard': {
          if (!this.requireAuth('instructor')) return;
          const v = document.getElementById('view-instructor-dashboard');
          if (v) v.style.display = 'block';
          this.renderInstructorDashboard();
          break;
        }
        case 'admin-dashboard': {
          if (!this.requireAuth('admin')) return;
          const v = document.getElementById('view-admin-dashboard');
          if (v) v.style.display = 'block';
          this.renderAdminDashboard();
          break;
        }
        case 'player': {
          if (!this.requireAuth('student')) return;
          const v = document.getElementById('view-player');
          if (v) v.style.display = 'flex';
          this.initCoursePlayer(params.courseId, params.lessonId);
          break;
        }
        case 'certificate': {
          const v = document.getElementById('view-certificate');
          if (v) v.style.display = 'block';
          this.renderCertificate(params.certificateId || params.courseId);
          window.scrollTo(0, 0);
          break;
        }
        default:
          this.navigate('landing');
      }
    },

    navigateRoleDashboard() {
      if (!this.currentUser) {
        this.openAuthModal('login');
        return;
      }
      if (this.currentUser.role === 'admin') {
        this.navigate('admin-dashboard');
      } else if (this.currentUser.role === 'instructor') {
        this.navigate('instructor-dashboard');
      } else {
        this.navigate('student-dashboard');
      }
    },

    requireAuth(expectedRole) {
      if (!this.currentUser) {
        this.showToast('Please log in to access this academic portal.', 'warning');
        this.openAuthModal('login');
        return false;
      }
      if (expectedRole && this.currentUser.role !== expectedRole && this.currentUser.role !== 'admin') {
        this.showToast(`Access restricted to ${expectedRole} accounts.`, 'error');
        this.navigateRoleDashboard();
        return false;
      }
      return true;
    },

    scrollToSection(sectionId) {
      if (this.currentView !== 'landing') {
        this.navigate('landing');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },

    // =========================================================================
    // AUTHENTICATION ENGINE
    // =========================================================================
    openAuthModal(tab = 'login') {
      const modal = document.getElementById('authModal');
      modal.classList.add('active');
      this.switchAuthTab(tab);
    },

    closeAuthModal() {
      const modal = document.getElementById('authModal');
      modal.classList.remove('active');
    },

    switchAuthTab(tab) {
      const title = document.getElementById('authModalTitle');
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      const forgotForm = document.getElementById('forgotForm');

      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
      forgotForm.style.display = 'none';

      if (tab === 'login') {
        title.textContent = 'Sign In to EduPulse LMS';
        loginForm.style.display = 'block';
      } else if (tab === 'register') {
        title.textContent = 'Register Academic Account';
        registerForm.style.display = 'block';
      } else if (tab === 'forgot') {
        title.textContent = 'Password Recovery';
        forgotForm.style.display = 'block';
      }
    },

    fillDemoLogin(role) {
      const emailField = document.getElementById('loginEmail');
      const passwordField = document.getElementById('loginPassword');
      this.switchAuthTab('login');

      if (role === 'admin') {
        emailField.value = 'admin@lms.com';
        passwordField.value = 'admin123';
      } else if (role === 'instructor') {
        emailField.value = 'instructor@lms.com';
        passwordField.value = 'teacher123';
      } else {
        emailField.value = 'student@lms.com';
        passwordField.value = 'student123';
      }
      this.showToast(`Loaded ${role.toUpperCase()} demo credentials. Click Sign In!`, 'info');
    },

    quickLogin(role) {
      const users = getData(STORAGE_KEYS.USERS, []);
      let user = null;
      if (role === 'admin') user = users.find(u => u.email === 'admin@lms.com');
      else if (role === 'instructor') user = users.find(u => u.email === 'instructor@lms.com');
      else user = users.find(u => u.email === 'student@lms.com');

      if (user) {
        this.currentUser = user;
        saveData(STORAGE_KEYS.CURRENT_USER, user);
        this.updateAuthUI();
        this.showToast(`Logged in as ${user.name} (${user.role.toUpperCase()})`, 'success');
        this.navigateRoleDashboard();
      }
    },

    togglePasswordVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-regular fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fa-regular fa-eye';
      }
    },

    handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      const users = getData(STORAGE_KEYS.USERS, []);
      const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

      if (user) {
        this.currentUser = user;
        saveData(STORAGE_KEYS.CURRENT_USER, user);
        this.closeAuthModal();
        this.updateAuthUI();
        this.showToast(`Welcome back, ${user.name}!`, 'success');
        this.navigateRoleDashboard();
      } else {
        this.showToast('Invalid email or password. Try demo accounts below!', 'error');
      }
    },

    onRegRoleChange() {
      const role = document.getElementById('regRole').value;
      const studentFields = document.getElementById('regStudentFields');
      if (role === 'instructor') {
        studentFields.style.display = 'none';
      } else {
        studentFields.style.display = 'grid';
      }
    },

    handleRegister(e) {
      e.preventDefault();
      const fullName = document.getElementById('regFullName').value.trim();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const role = document.getElementById('regRole').value;
      const department = document.getElementById('regDepartment').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;
      const studentId = document.getElementById('regStudentId').value.trim() || `BSIT-${Math.floor(1000 + Math.random() * 9000)}`;
      const semester = document.getElementById('regSemester').value;

      if (password !== confirmPassword) {
        this.showToast('Passwords do not match.', 'error');
        return;
      }

      const users = getData(STORAGE_KEYS.USERS, []);
      if (users.some(u => u.email.toLowerCase() === email)) {
        this.showToast('An account with this email already exists.', 'error');
        return;
      }

      // Compute initials
      const names = fullName.split(' ');
      const initials = (names[0][0] + (names[1] ? names[1][0] : '')).toUpperCase();

      const newUser = {
        id: `usr_${Date.now()}`,
        name: fullName,
        email: email,
        password: password,
        role: role,
        department: department,
        semester: role === 'student' ? semester : 'Faculty',
        studentId: studentId,
        avatarText: initials
      };

      users.push(newUser);
      saveData(STORAGE_KEYS.USERS, users);

      this.currentUser = newUser;
      saveData(STORAGE_KEYS.CURRENT_USER, newUser);

      this.closeAuthModal();
      this.updateAuthUI();
      this.showToast(`Account created successfully! Welcome, ${fullName}.`, 'success');
      this.navigateRoleDashboard();
    },

    handleForgot(e) {
      e.preventDefault();
      const email = document.getElementById('forgotEmail').value.trim();
      this.showToast(`Demo password reset token generated for ${email}. You may sign in with password: "password"`, 'info');
      this.switchAuthTab('login');
    },

    confirmLogout() {
      this.openConfirmModal(
        'Confirm Sign Out',
        'Are you sure you want to log out of your academic session?',
        () => {
          this.currentUser = null;
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
          this.updateAuthUI();
          this.navigate('landing');
          this.showToast('You have been signed out successfully.', 'info');
        }
      );
    },

    updateAuthUI() {
      const guestGroup = document.getElementById('guestNavGroup');
      const userGroup = document.getElementById('userNavGroup');
      const roleLink = document.getElementById('roleDashboardLink');
      const navAvatar = document.getElementById('navAvatarInitials');
      const navName = document.getElementById('navUserName');
      const navRole = document.getElementById('navUserRole');

      if (this.currentUser) {
        guestGroup.style.display = 'none';
        userGroup.style.display = 'flex';
        roleLink.style.display = 'inline-block';
        roleLink.textContent = `${this.capitalize(this.currentUser.role)} Portal`;

        navAvatar.textContent = this.currentUser.avatarText || 'US';
        navName.textContent = this.currentUser.name;
        navRole.textContent = this.currentUser.role.toUpperCase();

        this.updateNotificationsBadge();
      } else {
        guestGroup.style.display = 'flex';
        userGroup.style.display = 'none';
        roleLink.style.display = 'none';
      }
    },

    toggleMobileMenu() {
      const nav = document.getElementById('mainNavLinks');
      nav.classList.toggle('mobile-open');
    },

    toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      saveData(STORAGE_KEYS.DARK_MODE, isDark);
      this.updateThemeToggleIcon(isDark);
      this.showToast(`${isDark ? 'Dark Mode' : 'Light Mode'} enabled.`, 'info');
      if (this.currentView === 'admin-dashboard' && this.activeAdminTab === 'overview') {
        this.renderAdminCharts();
      }
    },

    updateThemeToggleIcon(isDark) {
      const btn = document.getElementById('themeToggleBtn');
      if (!btn) return;
      btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    },

    // =========================================================================
    // NOTIFICATIONS SYSTEM
    // =========================================================================
    toggleNotifications() {
      const dropdown = document.getElementById('notifDropdown');
      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        this.renderNotificationsList();
      }
    },

    renderNotificationsList() {
      const container = document.getElementById('notifListContainer');
      const notifs = getData(STORAGE_KEYS.NOTIFICATIONS, []);
      const userNotifs = this.currentUser
        ? notifs.filter(n => !n.userId || n.userId === this.currentUser.id)
        : notifs.slice(0, 3);

      if (userNotifs.length === 0) {
        container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No new notifications</div>`;
        return;
      }

      container.innerHTML = userNotifs.map(n => `
        <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 0.75rem; background: ${n.read ? 'transparent' : 'var(--primary-light)'};">
          <div style="color: var(--primary); font-size: 1.1rem; margin-top: 0.2rem;"><i class="fa-solid ${n.icon || 'fa-bell'}"></i></div>
          <div style="flex-grow: 1;">
            <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">${n.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.35; margin-top: 0.15rem;">${n.message}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.35rem;">${n.time}</div>
          </div>
        </div>
      `).join('');
    },

    updateNotificationsBadge() {
      const badge = document.getElementById('notifBadge');
      if (!this.currentUser) {
        badge.style.display = 'none';
        return;
      }
      const notifs = getData(STORAGE_KEYS.NOTIFICATIONS, []);
      const unread = notifs.filter(n => (!n.userId || n.userId === this.currentUser.id) && !n.read).length;
      if (unread > 0) {
        badge.textContent = unread;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    },

    markAllNotificationsRead() {
      const notifs = getData(STORAGE_KEYS.NOTIFICATIONS, []);
      notifs.forEach(n => {
        if (!n.userId || (this.currentUser && n.userId === this.currentUser.id)) {
          n.read = true;
        }
      });
      saveData(STORAGE_KEYS.NOTIFICATIONS, notifs);
      this.updateNotificationsBadge();
      this.renderNotificationsList();
      this.showToast('All notifications marked as read.', 'info');
    },

    clearAllNotifications() {
      saveData(STORAGE_KEYS.NOTIFICATIONS, []);
      this.updateNotificationsBadge();
      this.renderNotificationsList();
      this.showToast('Notifications cleared.', 'info');
    },

    // =========================================================================
    // LANDING PAGE RENDERING
    // =========================================================================
    renderLandingPage() {
      // 1. Render Categories
      const catContainer = document.getElementById('landingCategoriesGrid');
      const categories = getData(STORAGE_KEYS.CATEGORIES, []);
      catContainer.innerHTML = categories.map(c => `
        <div class="category-card" onclick="LMS_App.filterByCategory('${c.name}')">
          <div class="category-icon" style="background: ${c.color}15; color: ${c.color};">
            <i class="fa-solid ${c.icon}"></i>
          </div>
          <div>
            <div class="category-title">${c.name}</div>
            <div class="category-count">${c.courseCount} Courses Available</div>
          </div>
        </div>
      `).join('');

      // 2. Render Featured Courses
      const featContainer = document.getElementById('landingFeaturedCoursesGrid');
      const courses = getData(STORAGE_KEYS.COURSES, []).slice(0, 6);
      featContainer.innerHTML = courses.map(c => this.createCourseCardHTML(c)).join('');

      // 3. Render Popular Instructors
      const instContainer = document.getElementById('landingInstructorsGrid');
      const users = getData(STORAGE_KEYS.USERS, []);
      const instructors = users.filter(u => u.role === 'instructor');
      instContainer.innerHTML = instructors.map(inst => `
        <div class="content-panel" style="margin-bottom: 0; text-align: center;">
          <div class="sidebar-avatar" style="width: 64px; height: 64px; margin: 0 auto 1rem; font-size: 1.4rem;">${inst.avatarText || 'IN'}</div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.2rem;">${inst.name}</h4>
          <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700; display: block; margin-bottom: 0.4rem;">${inst.specialization || 'Academic Faculty'}</span>
          <p style="font-size: 0.8rem; color: var(--text-muted);">${inst.department}</p>
        </div>
      `).join('');
    },

    // =========================================================================
    // COURSES CATALOG & SEARCH/FILTER
    // =========================================================================
    populateCategoriesDropdowns() {
      const categories = getData(STORAGE_KEYS.CATEGORIES, []);
      const catFilter = document.getElementById('courseCategoryFilter');
      const formCat = document.getElementById('courseFormCategory');

      if (catFilter) {
        catFilter.innerHTML = `<option value="ALL">All Categories</option>` +
          categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
      }
      if (formCat) {
        formCat.innerHTML = categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
      }
    },

    renderCoursesCatalog() {
      this.filterCourses();
    },

    filterCourses() {
      const keyword = (document.getElementById('courseSearchInput')?.value || '').toLowerCase();
      const category = document.getElementById('courseCategoryFilter')?.value || 'ALL';
      const difficulty = document.getElementById('courseDifficultyFilter')?.value || 'ALL';
      const sort = document.getElementById('courseSortFilter')?.value || 'popular';

      let courses = getData(STORAGE_KEYS.COURSES, []);

      // Keyword filter
      if (keyword) {
        courses = courses.filter(c =>
          c.title.toLowerCase().includes(keyword) ||
          c.description.toLowerCase().includes(keyword) ||
          c.instructor.toLowerCase().includes(keyword)
        );
      }

      // Category filter
      if (category !== 'ALL') {
        courses = courses.filter(c => c.category === category);
      }

      // Difficulty filter
      if (difficulty !== 'ALL') {
        courses = courses.filter(c => c.difficulty === difficulty);
      }

      // Sort
      if (sort === 'rating') {
        courses.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'popular') {
        courses.sort((a, b) => b.studentsCount - a.studentsCount);
      }

      const grid = document.getElementById('catalogCoursesGrid');
      const emptyState = document.getElementById('noCoursesFound');

      if (courses.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
        grid.innerHTML = courses.map(c => this.createCourseCardHTML(c)).join('');
      }
    },

    filterByCategory(categoryName) {
      this.navigate('courses');
      setTimeout(() => {
        const select = document.getElementById('courseCategoryFilter');
        if (select) {
          select.value = categoryName;
          this.filterCourses();
        }
      }, 50);
    },

    resetCourseFilters() {
      const search = document.getElementById('courseSearchInput');
      const cat = document.getElementById('courseCategoryFilter');
      const diff = document.getElementById('courseDifficultyFilter');
      if (search) search.value = '';
      if (cat) cat.value = 'ALL';
      if (diff) diff.value = 'ALL';
      this.filterCourses();
    },

    createCourseCardHTML(c) {
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const isEnrolled = this.currentUser && enrollments.some(e => e.studentId === this.currentUser.id && e.courseId === c.id);
      const enrData = isEnrolled ? enrollments.find(e => e.studentId === this.currentUser.id && e.courseId === c.id) : null;

      return `
        <div class="course-card">
          <div class="course-thumb-wrap">
            <img src="${c.thumbnail}" alt="${c.title}" referrerPolicy="no-referrer" />
            <div class="course-badge-level">${c.difficulty}</div>
            <div class="course-category-tag">${c.category}</div>
          </div>
          <div class="course-body">
            <div class="course-meta-row">
              <span><i class="fa-regular fa-clock"></i> ${c.duration}</span>
              <span><i class="fa-solid fa-book-open"></i> ${c.lessonsCount} Lessons</span>
            </div>
            <h3 class="course-title" title="${c.title}">${c.title}</h3>
            <div class="course-instructor-text">
              <i class="fa-solid fa-chalkboard-user"></i> ${c.instructor}
            </div>

            ${isEnrolled ? `
              <div class="course-progress-container">
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: ${enrData.progressPercent}%;"></div>
                </div>
                <div class="progress-text-row">
                  <span>Progress</span>
                  <span class="tabular-nums">${enrData.progressPercent}%</span>
                </div>
              </div>
            ` : ''}

            <div class="course-footer">
              <div class="course-rating-box">
                <i class="fa-solid fa-star"></i>
                <span>${c.rating}</span>
                <span style="color: var(--text-muted); font-size: 0.75rem;">(${c.studentsCount})</span>
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn btn-outline btn-sm" onclick="LMS_App.navigate('course-detail', { courseId: '${c.id}' })">
                  Overview
                </button>
                ${isEnrolled ? `
                  <button class="btn btn-primary btn-sm" onclick="LMS_App.startCourse('${c.id}')">
                    Continue <i class="fa-solid fa-play"></i>
                  </button>
                ` : `
                  <button class="btn btn-primary btn-sm" onclick="LMS_App.enrollCourse('${c.id}')">
                    Enroll Free
                  </button>
                `}
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // =========================================================================
    // COURSE DETAILS VIEW
    // =========================================================================
    renderCourseDetails(courseId) {
      const courses = getData(STORAGE_KEYS.COURSES, []);
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        this.showToast('Course not found.', 'error');
        this.navigate('courses');
        return;
      }

      const allLessons = getData(STORAGE_KEYS.LESSONS, []);
      const courseLessons = allLessons.filter(l => l.courseId === course.id);

      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const isEnrolled = this.currentUser && enrollments.some(e => e.studentId === this.currentUser.id && e.courseId === course.id);

      const container = document.getElementById('courseDetailsContainer');
      container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;">
          <button class="btn btn-subtle btn-sm" onclick="LMS_App.navigate('courses')">
            <i class="fa-solid fa-arrow-left"></i> All Courses
          </button>
          <span style="color: var(--text-muted);">/</span>
          <span style="color: var(--text-muted); font-size: 0.85rem;">${course.category}</span>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem; align-items: start;">
          <div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
              <span class="status-pill submitted">${course.difficulty}</span>
              <span class="status-pill pending">${course.category}</span>
            </div>
            <h1 class="font-display" style="font-size: 2.4rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem;">
              ${course.title}
            </h1>
            <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
              ${course.description}
            </p>

            <div style="display: flex; gap: 2rem; padding: 1.25rem 0; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); margin-bottom: 2rem; flex-wrap: wrap;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">INSTRUCTOR</span>
                <strong style="font-size: 0.95rem;">${course.instructor}</strong>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">DURATION</span>
                <strong style="font-size: 0.95rem;">${course.duration}</strong>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">STUDENTS</span>
                <strong style="font-size: 0.95rem;">${course.studentsCount} Enrolled</strong>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">RATING</span>
                <strong style="font-size: 0.95rem; color: #f59e0b;"><i class="fa-solid fa-star"></i> ${course.rating} / 5.0</strong>
              </div>
            </div>

            <!-- Learning Outcomes -->
            <div class="content-panel">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">
                <i class="fa-solid fa-bullseye" style="color: var(--primary);"></i> What You Will Learn
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                ${(course.outcomes || '').split(',').map(o => `
                  <div style="display: flex; gap: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
                    <i class="fa-solid fa-check" style="color: var(--accent-emerald); margin-top: 0.25rem;"></i>
                    <span>${o.trim()}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Prerequisites -->
            <div class="content-panel">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem;">
                <i class="fa-solid fa-list-check" style="color: var(--secondary);"></i> Prerequisites & Requirements
              </h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">${course.requirements || 'No formal prerequisites required.'}</p>
            </div>

            <!-- Curriculum Syllabus -->
            <div class="content-panel">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">
                <i class="fa-solid fa-book-bookmark" style="color: var(--accent-purple);"></i> Course Curriculum (${courseLessons.length} Modules)
              </h3>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${courseLessons.map((les, idx) => `
                  <div style="background: var(--bg-subtle); padding: 1rem 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <div class="user-avatar-mini" style="background: var(--bg-surface); color: var(--primary); border: 1px solid var(--border-light);">
                        ${idx + 1}
                      </div>
                      <div>
                        <strong style="font-size: 0.95rem; color: var(--text-primary);">${les.title}</strong>
                        <span style="display: block; font-size: 0.75rem; color: var(--text-muted);">${les.description}</span>
                      </div>
                    </div>
                    <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${les.duration}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Sticky Right Sidebar -->
          <div style="position: sticky; top: 90px;">
            <div class="content-panel" style="padding: 1.5rem; text-align: center;">
              <img src="${course.thumbnail}" style="border-radius: var(--radius-md); margin-bottom: 1.25rem; width: 100%; aspect-ratio: 16/9; object-fit: cover;" alt="${course.title}" />
              <div style="font-size: 1.75rem; font-weight: 800; font-family: var(--font-display); color: var(--accent-emerald); margin-bottom: 1rem;">
                100% Free <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">(University Accredited)</span>
              </div>
              ${isEnrolled ? `
                <button class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 0.75rem;" onclick="LMS_App.startCourse('${course.id}')">
                  <i class="fa-solid fa-play"></i> Continue Learning
                </button>
                <button class="btn btn-outline btn-sm" style="width: 100%; color: #ef4444;" onclick="LMS_App.confirmUnenroll('${course.id}')">
                  Unenroll from Course
                </button>
              ` : `
                <button class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 0.75rem;" onclick="LMS_App.enrollCourse('${course.id}')">
                  <i class="fa-solid fa-user-plus"></i> Enroll in Course
                </button>
              `}
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 1rem; line-height: 1.5;">
                <i class="fa-solid fa-shield-halved"></i> Includes Lifetime Access & Official BSIT Certificate of Completion.
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // =========================================================================
    // ENROLLMENT ENGINE
    // =========================================================================
    enrollCourse(courseId) {
      if (!this.currentUser) {
        this.showToast('Please sign in as a student to enroll.', 'warning');
        this.openAuthModal('login');
        return;
      }
      if (this.currentUser.role !== 'student') {
        this.showToast('Only student accounts can enroll in courses.', 'info');
        return;
      }

      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      if (enrollments.some(e => e.studentId === this.currentUser.id && e.courseId === courseId)) {
        this.showToast('You are already enrolled in this course!', 'info');
        this.startCourse(courseId);
        return;
      }

      const courses = getData(STORAGE_KEYS.COURSES, []);
      const course = courses.find(c => c.id === courseId);
      if (course) {
        course.studentsCount = (course.studentsCount || 0) + 1;
        saveData(STORAGE_KEYS.COURSES, courses);
      }

      const allLessons = getData(STORAGE_KEYS.LESSONS, []);
      const firstLesson = allLessons.find(l => l.courseId === courseId);

      const newEnrollment = {
        id: `enr_${Date.now()}`,
        studentId: this.currentUser.id,
        courseId: courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        completedLessons: [],
        lastViewedLessonId: firstLesson ? firstLesson.id : null,
        progressPercent: 0,
        completed: false
      };

      enrollments.push(newEnrollment);
      saveData(STORAGE_KEYS.ENROLLMENTS, enrollments);

      // Add Notification
      this.createNotification(
        this.currentUser.id,
        'Enrollment Confirmed',
        `You have successfully enrolled in "${course.title}". Start lesson 1 now!`,
        'fa-graduation-cap'
      );

      this.showToast(`Enrolled successfully in ${course.title}!`, 'success');
      this.startCourse(courseId);
    },

    confirmUnenroll(courseId) {
      const courses = getData(STORAGE_KEYS.COURSES, []);
      const course = courses.find(c => c.id === courseId);
      this.openConfirmModal(
        'Confirm Unenrollment',
        `Are you sure you want to unenroll from "${course ? course.title : 'this course'}"? Your completed lesson history for this course will be reset.`,
        () => {
          let enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
          enrollments = enrollments.filter(e => !(e.studentId === this.currentUser.id && e.courseId === courseId));
          saveData(STORAGE_KEYS.ENROLLMENTS, enrollments);
          this.showToast('Unenrolled from course.', 'info');
          this.navigate('student-dashboard');
        }
      );
    },

    // =========================================================================
    // MODULE 12: COURSE LEARNING PLAYER (CRITICAL IMPLEMENTATION)
    // =========================================================================
    startCourse(courseId) {
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const enr = enrollments.find(e => e.studentId === this.currentUser.id && e.courseId === courseId);
      const lessonId = enr ? enr.lastViewedLessonId : null;
      this.navigate('player', { courseId, lessonId });
    },

    initCoursePlayer(courseId, targetLessonId) {
      const courses = getData(STORAGE_KEYS.COURSES, []);
      this.currentLearningCourse = courses.find(c => c.id === courseId);
      if (!this.currentLearningCourse) {
        this.showToast('Course not found.', 'error');
        this.navigateRoleDashboard();
        return;
      }

      const allLessons = getData(STORAGE_KEYS.LESSONS, []);
      this.currentCourseLessons = allLessons.filter(l => l.courseId === courseId);

      if (this.currentCourseLessons.length === 0) {
        this.showToast('No lessons found in this course syllabus.', 'warning');
        this.navigateRoleDashboard();
        return;
      }

      // Determine initial active lesson
      let initialIndex = 0;
      if (targetLessonId) {
        const foundIdx = this.currentCourseLessons.findIndex(l => l.id === targetLessonId);
        if (foundIdx !== -1) initialIndex = foundIdx;
      }
      this.currentLessonIndex = initialIndex;

      // Update Player Header
      document.getElementById('playerCourseTitle').textContent = this.currentLearningCourse.title;
      document.getElementById('playerLessonCount').textContent = this.currentCourseLessons.length;

      this.updatePlayerProgressUI();
      this.renderPlayerLessonsSidebar();
      this.loadLessonIntoPlayer(this.currentLessonIndex);
    },

    renderPlayerLessonsSidebar() {
      const container = document.getElementById('playerLessonList');
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const enr = enrollments.find(e => e.studentId === this.currentUser.id && e.courseId === this.currentLearningCourse.id);
      const completedList = enr ? enr.completedLessons || [] : [];

      container.innerHTML = this.currentCourseLessons.map((lesson, idx) => {
        const isCompleted = completedList.includes(lesson.id);
        const isActive = idx === this.currentLessonIndex;
        return `
          <div class="player-lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" onclick="LMS_App.loadLessonIntoPlayer(${idx})">
            <div class="player-lesson-check">
              <i class="fa-solid fa-check"></i>
            </div>
            <div class="player-lesson-meta">
              <div class="player-lesson-title">Lesson ${idx + 1}: ${lesson.title}</div>
              <div class="player-lesson-duration"><i class="fa-regular fa-clock"></i> ${lesson.duration}</div>
            </div>
          </div>
        `;
      }).join('');
    },

    loadLessonIntoPlayer(index) {
      if (index < 0 || index >= this.currentCourseLessons.length) return;
      this.currentLessonIndex = index;
      const lesson = this.currentCourseLessons[index];

      // Update Active in Sidebar
      this.renderPlayerLessonsSidebar();

      // Video Source Setup
      const videoElement = document.getElementById('playerVideoElement');
      const videoSource = document.getElementById('playerVideoSource');
      if (lesson.videoUrl) {
        videoSource.src = lesson.videoUrl;
        videoElement.load();
      }

      // Lesson Details
      document.getElementById('playerLessonBadge').textContent = `Lesson ${index + 1} of ${this.currentCourseLessons.length}`;
      document.getElementById('playerLessonHeading').textContent = lesson.title;
      document.getElementById('playerLessonNotes').innerHTML = `
        <p style="margin-bottom: 1rem;">${lesson.description}</p>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1.25rem;">
          <h4 style="font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Key Takeaway & Implementation Tip</h4>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">
            Follow along with the lecture notes and inspect the provided starter resources. Complete the practical exercise before marking this module complete to unlock your certificate.
          </p>
        </div>
      `;

      // Downloadable Resources
      const resContainer = document.getElementById('playerResourceList');
      if (lesson.resources && lesson.resources.length > 0) {
        resContainer.innerHTML = lesson.resources.map(res => `
          <div class="resource-link-item">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-regular fa-file-pdf" style="color: #ef4444;"></i>
              <span>${res.name}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">(${res.size})</span>
            </div>
            <button class="btn btn-subtle btn-sm" onclick="LMS_App.downloadResource('${res.name}')">
              <i class="fa-solid fa-download"></i> Download
            </button>
          </div>
        `).join('');
      } else {
        resContainer.innerHTML = `<span style="font-size: 0.85rem; color: var(--text-muted);">No external attachments required for this module.</span>`;
      }

      // Update Mark Completed Button State
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const enr = enrollments.find(e => e.studentId === this.currentUser.id && e.courseId === this.currentLearningCourse.id);
      const isCompleted = enr && (enr.completedLessons || []).includes(lesson.id);

      const markBtn = document.getElementById('playerMarkCompleteBtn');
      const markText = document.getElementById('playerMarkCompleteText');
      if (isCompleted) {
        markBtn.className = 'btn btn-success';
        markText.textContent = 'Completed';
      } else {
        markBtn.className = 'btn btn-primary';
        markText.textContent = 'Mark as Completed';
      }

      // Prev / Next Buttons
      document.getElementById('playerPrevBtn').disabled = index === 0;
      document.getElementById('playerNextBtn').disabled = index === this.currentCourseLessons.length - 1;

      // Update Last Viewed in Enrollment
      if (enr) {
        enr.lastViewedLessonId = lesson.id;
        saveData(STORAGE_KEYS.ENROLLMENTS, enrollments);
      }
    },

    toggleCurrentLessonComplete() {
      const lesson = this.currentCourseLessons[this.currentLessonIndex];
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const enr = enrollments.find(e => e.studentId === this.currentUser.id && e.courseId === this.currentLearningCourse.id);

      if (!enr) return;
      enr.completedLessons = enr.completedLessons || [];

      const existsIdx = enr.completedLessons.indexOf(lesson.id);
      if (existsIdx === -1) {
        enr.completedLessons.push(lesson.id);
        this.showToast(`Lesson "${lesson.title}" marked completed!`, 'success');
      } else {
        enr.completedLessons.splice(existsIdx, 1);
        this.showToast(`Lesson marked uncompleted.`, 'info');
      }

      // Calculate progress formula: (completed / total) * 100
      const total = this.currentCourseLessons.length;
      const completed = enr.completedLessons.length;
      enr.progressPercent = Math.round((completed / total) * 100);

      // Check if course 100% complete
      if (enr.progressPercent === 100 && !enr.completed) {
        enr.completed = true;
        enr.completionDate = new Date().toISOString().split('T')[0];
        this.issueCertificate(this.currentUser.id, this.currentLearningCourse.id);
        this.showToast('🎉 Congratulations! You completed 100% of this course. Certificate issued!', 'success');
      }

      saveData(STORAGE_KEYS.ENROLLMENTS, enrollments);

      this.updatePlayerProgressUI();
      this.loadLessonIntoPlayer(this.currentLessonIndex);
    },

    navigateLesson(delta) {
      const nextIdx = this.currentLessonIndex + delta;
      if (nextIdx >= 0 && nextIdx < this.currentCourseLessons.length) {
        this.loadLessonIntoPlayer(nextIdx);
      }
    },

    updatePlayerProgressUI() {
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const enr = enrollments.find(e => e.studentId === this.currentUser.id && e.courseId === this.currentLearningCourse.id);
      const percent = enr ? enr.progressPercent : 0;

      document.getElementById('playerProgressText').textContent = `${percent}%`;
      document.getElementById('playerProgressBarFill').style.width = `${percent}%`;

      const certBtn = document.getElementById('playerCertQuickBtn');
      if (percent === 100) {
        certBtn.style.display = 'inline-flex';
      } else {
        certBtn.style.display = 'none';
      }
    },

    downloadResource(name) {
      this.showToast(`Downloading "${name}" to browser...`, 'success');
      // Create a dummy text blob download
      const blob = new Blob([`EduPulse Academic Learning Resource: ${name}\nGenerated for ${this.currentUser ? this.currentUser.name : 'Student'}`], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name.replace(/\s+/g, '_');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    viewCertificateFromPlayer() {
      this.exitPlayer();
      this.navigate('certificate', { courseId: this.currentLearningCourse.id });
    },

    exitPlayer() {
      const videoElement = document.getElementById('playerVideoElement');
      if (videoElement) videoElement.pause();
      const v = document.getElementById('view-player');
      if (v) v.style.display = 'none';
      this.navigateRoleDashboard();
    },

    // =========================================================================
    // STUDENT DASHBOARD
    // =========================================================================
    renderStudentDashboard() {
      // Sidebar Profile Info
      document.getElementById('studentSidebarName').textContent = this.currentUser.name;
      document.getElementById('studentSidebarMeta').textContent = `${this.currentUser.department} · ${this.currentUser.semester}`;
      document.getElementById('studentSidebarAvatar').textContent = this.currentUser.avatarText || 'ST';

      const content = document.getElementById('studentDashboardContent');

      // Calculate Statistics
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []).filter(e => e.studentId === this.currentUser.id);
      const courses = getData(STORAGE_KEYS.COURSES, []);
      const totalEnrolled = enrollments.length;
      const completedCourses = enrollments.filter(e => e.progressPercent === 100).length;
      const inProgressCourses = totalEnrolled - completedCourses;
      const totalHours = totalEnrolled * 12 + 8; // Calculated estimate
      const avgProgress = totalEnrolled > 0
        ? Math.round(enrollments.reduce((acc, e) => acc + (e.progressPercent || 0), 0) / totalEnrolled)
        : 0;

      // Active Learning Course
      const activeEnr = enrollments.find(e => e.progressPercent < 100) || enrollments[0];
      const activeCourse = activeEnr ? courses.find(c => c.id === activeEnr.courseId) : null;

      content.innerHTML = `
        <div style="margin-bottom: 2rem;">
          <h1 class="font-display" style="font-size: 2rem; font-weight: 800; margin-bottom: 0.25rem;">
            Welcome back, ${this.currentUser.name}! 👋
          </h1>
          <p style="color: var(--text-muted);">Track your courses, submit pending assignments, and assess your skills.</p>
        </div>

        <!-- 5 Key Metric Cards -->
        <div class="metrics-row">
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${totalEnrolled}</span>
              <span class="metric-label">Enrolled Courses</span>
            </div>
            <div class="metric-icon-wrap" style="background: var(--primary-light); color: var(--primary);">
              <i class="fa-solid fa-book-bookmark"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${completedCourses}</span>
              <span class="metric-label">Completed Courses</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald);">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${inProgressCourses}</span>
              <span class="metric-label">In Progress</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
              <i class="fa-solid fa-spinner"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${totalHours}h</span>
              <span class="metric-label">Learning Hours</span>
            </div>
            <div class="metric-icon-wrap" style="background: var(--secondary-light); color: var(--secondary);">
              <i class="fa-regular fa-clock"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${avgProgress}%</span>
              <span class="metric-label">Overall Progress</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(124, 58, 237, 0.15); color: var(--accent-purple);">
              <i class="fa-solid fa-chart-pie"></i>
            </div>
          </div>
        </div>

        <!-- Continue Learning Highlight Banner -->
        ${activeCourse ? `
          <div class="continue-learning-card">
            <div class="continue-details">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.8; font-weight: 700;">Continue Learning</span>
              <h4>${activeCourse.title}</h4>
              <p><i class="fa-solid fa-chalkboard-user"></i> ${activeCourse.instructor} · ${activeEnr.progressPercent}% Completed</p>
              <div class="continue-progress-wrap">
                <div class="progress-bar-track" style="background: rgba(255,255,255,0.25);">
                  <div class="progress-bar-fill" style="background: #ffffff; width: ${activeEnr.progressPercent}%;"></div>
                </div>
              </div>
            </div>
            <button class="btn btn-outline" style="background: #ffffff; color: var(--primary); border: none; padding: 0.8rem 1.5rem;" onclick="LMS_App.startCourse('${activeCourse.id}')">
              Resume Lesson <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ` : ''}

        <!-- 2 Column Section: My Enrolled Courses + Upcoming Quizzes/Assignments -->
        <div class="dashboard-grid-2col">
          <div>
            <div class="content-panel">
              <div class="panel-header">
                <h3 class="panel-title"><i class="fa-solid fa-graduation-cap" style="color: var(--primary);"></i> My Enrolled Courses</h3>
                <button class="btn btn-subtle btn-sm" onclick="LMS_App.navigate('courses')">Explore More</button>
              </div>
              <div class="courses-grid" style="grid-template-columns: 1fr;">
                ${enrollments.map(e => {
                  const c = courses.find(item => item.id === e.courseId);
                  if (!c) return '';
                  return `
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
                      <div style="display: flex; align-items: center; gap: 1rem;">
                        <img src="${c.thumbnail}" style="width: 72px; height: 50px; border-radius: var(--radius-sm); object-fit: cover;" alt="${c.title}" />
                        <div>
                          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">${c.title}</h4>
                          <span style="font-size: 0.75rem; color: var(--text-muted);">${c.instructor} · Enrolled on ${e.enrolledAt}</span>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 1.5rem;">
                        <div style="width: 120px;">
                          <div class="progress-bar-track">
                            <div class="progress-bar-fill" style="width: ${e.progressPercent}%;"></div>
                          </div>
                          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;" class="tabular-nums">${e.progressPercent}% completed</span>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="LMS_App.startCourse('${c.id}')">
                          Learn <i class="fa-solid fa-play"></i>
                        </button>
                        ${e.progressPercent === 100 ? `
                          <button class="btn btn-outline btn-sm" onclick="LMS_App.navigate('certificate', { courseId: '${c.id}' })" title="View Certificate">
                            <i class="fa-solid fa-award"></i>
                          </button>
                        ` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Right Column: Assignments & Quizzes -->
          <div>
            <!-- Upcoming Assignments -->
            <div class="content-panel">
              <div class="panel-header">
                <h3 class="panel-title"><i class="fa-solid fa-file-pen" style="color: var(--secondary);"></i> Pending Assignments</h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="studentUpcomingAssignments">
                ${this.renderStudentPendingAssignmentsHTML()}
              </div>
            </div>

            <!-- Upcoming Quizzes -->
            <div class="content-panel">
              <div class="panel-header">
                <h3 class="panel-title"><i class="fa-solid fa-circle-question" style="color: var(--accent-purple);"></i> Practice Quizzes</h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${this.renderStudentQuizzesHTML()}
              </div>
            </div>
          </div>
        </div>
      `;
    },

    setStudentTab(tab) {
      this.activeStudentTab = tab;
      const items = document.querySelectorAll('#view-student-dashboard .sidebar-nav-item');
      items.forEach(i => i.classList.remove('active'));
      // highlight active sidebar item
      const content = document.getElementById('studentDashboardContent');

      if (tab === 'overview') {
        this.renderStudentDashboard();
      } else if (tab === 'my-courses') {
        const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []).filter(e => e.studentId === this.currentUser.id);
        const courses = getData(STORAGE_KEYS.COURSES, []);
        content.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">My Enrolled Courses</h1>
            <p style="color: var(--text-muted);">All active courses and certifications registered under your student ID.</p>
          </div>
          <div class="courses-grid">
            ${enrollments.map(e => {
              const c = courses.find(item => item.id === e.courseId);
              return c ? this.createCourseCardHTML(c) : '';
            }).join('')}
          </div>
        `;
      } else if (tab === 'assignments') {
        content.innerHTML = this.renderStudentAssignmentsFullView();
      } else if (tab === 'quizzes') {
        content.innerHTML = this.renderStudentQuizzesFullView();
      } else if (tab === 'certificates') {
        content.innerHTML = this.renderStudentCertificatesFullView();
      } else if (tab === 'messages') {
        content.innerHTML = this.renderMessagingInterface();
      } else if (tab === 'profile') {
        content.innerHTML = this.renderUserProfileSettings();
      }
    },

    renderStudentPendingAssignmentsHTML() {
      const assignments = getData(STORAGE_KEYS.ASSIGNMENTS, []).slice(0, 3);
      const submissions = getData(STORAGE_KEYS.SUBMISSIONS, []).filter(s => s.studentId === this.currentUser.id);

      return assignments.map(a => {
        const sub = submissions.find(s => s.assignmentId === a.id);
        const status = sub ? sub.status : 'pending';
        return `
          <div style="padding: 0.85rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); background: var(--bg-surface);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
              <h5 style="font-size: 0.85rem; font-weight: 700;">${a.title}</h5>
              <span class="status-pill ${status}">${status}</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.6rem;">
              Due: ${a.dueDate} · ${a.totalMarks} Marks
            </div>
            <div style="display: flex; justify-content: flex-end;">
              ${status === 'pending' ? `
                <button class="btn btn-primary btn-sm" onclick="LMS_App.openSubmitAssignmentModal('${a.id}')">Submit Solution</button>
              ` : `
                <button class="btn btn-subtle btn-sm" onclick="LMS_App.viewSubmissionDetails('${sub.id}')">View Details</button>
              `}
            </div>
          </div>
        `;
      }).join('');
    },

    renderStudentQuizzesHTML() {
      const quizzes = getData(STORAGE_KEYS.QUIZZES, []).slice(0, 3);
      const attempts = getData(STORAGE_KEYS.QUIZ_ATTEMPTS, []).filter(a => a.studentId === this.currentUser.id);

      return quizzes.map(q => {
        const att = attempts.find(a => a.quizId === q.id);
        return `
          <div style="padding: 0.85rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); background: var(--bg-surface); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <h5 style="font-size: 0.85rem; font-weight: 700;">${q.title}</h5>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${q.durationMinutes} mins · ${q.questions.length} Questions</span>
              ${att ? `<span style="font-size: 0.75rem; color: var(--accent-emerald); display: block; font-weight: 600;">Score: ${att.scorePercent}%</span>` : ''}
            </div>
            <button class="btn btn-outline btn-sm" onclick="LMS_App.startQuiz('${q.id}')">
              ${att ? 'Retake' : 'Start'}
            </button>
          </div>
        `;
      }).join('');
    },

    renderStudentAssignmentsFullView() {
      const assignments = getData(STORAGE_KEYS.ASSIGNMENTS, []);
      const submissions = getData(STORAGE_KEYS.SUBMISSIONS, []).filter(s => s.studentId === this.currentUser.id);

      return `
        <div style="margin-bottom: 2rem;">
          <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Academic Assignments</h1>
          <p style="color: var(--text-muted);">Submit homework, laboratory projects, and review faculty evaluations.</p>
        </div>
        <div class="content-panel">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Assignment Title</th>
                  <th>Course</th>
                  <th>Due Date</th>
                  <th>Total Marks</th>
                  <th>Status</th>
                  <th>Obtained Marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${assignments.map(a => {
                  const sub = submissions.find(s => s.assignmentId === a.id);
                  const status = sub ? sub.status : 'pending';
                  const marks = sub && sub.marksObtained !== null ? `${sub.marksObtained} / ${a.totalMarks}` : '-';
                  return `
                    <tr>
                      <td><strong>${a.title}</strong></td>
                      <td>${a.courseTitle || 'Computing'}</td>
                      <td>${a.dueDate}</td>
                      <td>${a.totalMarks}</td>
                      <td><span class="status-pill ${status}">${status}</span></td>
                      <td class="font-mono">${marks}</td>
                      <td>
                        ${status === 'pending' ? `
                          <button class="btn btn-primary btn-sm" onclick="LMS_App.openSubmitAssignmentModal('${a.id}')">Submit</button>
                        ` : `
                          <button class="btn btn-subtle btn-sm" onclick="LMS_App.viewSubmissionDetails('${sub.id}')">View</button>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    renderStudentQuizzesFullView() {
      const quizzes = getData(STORAGE_KEYS.QUIZZES, []);
      const attempts = getData(STORAGE_KEYS.QUIZ_ATTEMPTS, []).filter(a => a.studentId === this.currentUser.id);

      return `
        <div style="margin-bottom: 2rem;">
          <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Timed Academic Quizzes</h1>
          <p style="color: var(--text-muted);">Test conceptual knowledge under university timed assessment parameters.</p>
        </div>
        <div class="courses-grid">
          ${quizzes.map(q => {
            const att = attempts.find(a => a.quizId === q.id);
            return `
              <div class="content-panel" style="margin-bottom: 0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                  <span class="status-pill submitted"><i class="fa-regular fa-clock"></i> ${q.durationMinutes} Minutes</span>
                  ${att ? `<span class="status-pill ${att.passed ? 'passed' : 'failed'}">${att.passed ? 'PASSED' : 'FAILED'}</span>` : ''}
                </div>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem;">${q.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">${q.courseTitle}</p>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                  <div><i class="fa-solid fa-list-ol"></i> ${q.questions.length} Multiple Choice Questions</div>
                  <div><i class="fa-solid fa-bullseye"></i> Passing Score: ${q.passingScore}%</div>
                  ${att ? `<div style="font-weight: 700; color: var(--primary); margin-top: 0.35rem;">Previous Result: ${att.scorePercent}% (${att.correctAnswers}/${att.totalQuestions} correct)</div>` : ''}
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="LMS_App.startQuiz('${q.id}')">
                  ${att ? 'Retake Assessment' : 'Start Timed Assessment'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    },

    renderStudentCertificatesFullView() {
      const certs = getData(STORAGE_KEYS.CERTIFICATES, []).filter(c => c.studentId === this.currentUser.id);

      return `
        <div style="margin-bottom: 2rem;">
          <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">My Certificates of Completion</h1>
          <p style="color: var(--text-muted);">Verified academic credentials awarded for 100% course fulfillment.</p>
        </div>
        ${certs.length === 0 ? `
          <div class="content-panel" style="text-align: center; padding: 4rem 2rem;">
            <i class="fa-solid fa-award" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
            <h3 style="font-size: 1.2rem; font-weight: 700;">No certificates issued yet</h3>
            <p style="color: var(--text-muted); max-width: 440px; margin: 0.5rem auto 1.5rem;">
              Complete all lessons in any course to unlock your official verified certificate!
            </p>
            <button class="btn btn-primary" onclick="LMS_App.navigate('courses')">Explore Courses</button>
          </div>
        ` : `
          <div class="courses-grid">
            ${certs.map(cert => `
              <div class="content-panel" style="margin-bottom: 0;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                  <div class="user-avatar-mini" style="background: var(--accent-emerald);">
                    <i class="fa-solid fa-stamp"></i>
                  </div>
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Official Verified Certificate</span>
                    <h4 style="font-size: 1.05rem; font-weight: 700;">${cert.courseTitle}</h4>
                  </div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                  Issued to: <strong>${cert.studentName}</strong><br />
                  Issued Date: ${cert.issueDate}<br />
                  Verification ID: <span class="font-mono">${cert.verificationId}</span>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn btn-primary btn-sm" style="flex-grow: 1;" onclick="LMS_App.navigate('certificate', { certificateId: '${cert.id}' })">
                    <i class="fa-solid fa-eye"></i> View & Print
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      `;
    },

    // =========================================================================
    // INSTRUCTOR DASHBOARD
    // =========================================================================
    renderInstructorDashboard() {
      document.getElementById('instructorSidebarName').textContent = this.currentUser.name;
      document.getElementById('instructorSidebarAvatar').textContent = this.currentUser.avatarText || 'PR';

      const content = document.getElementById('instructorDashboardContent');

      const allCourses = getData(STORAGE_KEYS.COURSES, []);
      const myCourses = allCourses.filter(c => c.instructorId === this.currentUser.id || c.instructor === this.currentUser.name);
      const assignments = getData(STORAGE_KEYS.ASSIGNMENTS, []);
      const submissions = getData(STORAGE_KEYS.SUBMISSIONS, []);
      const pendingSubmissions = submissions.filter(s => s.status === 'submitted');
      const totalStudents = myCourses.reduce((sum, c) => sum + (c.studentsCount || 0), 0);

      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 class="font-display" style="font-size: 2rem; font-weight: 800; margin-bottom: 0.25rem;">
              Faculty Desk: ${this.currentUser.name}
            </h1>
            <p style="color: var(--text-muted);">Manage curricula, evaluate student programming assignments, and monitor test results.</p>
          </div>
          <button class="btn btn-primary" onclick="LMS_App.openCreateCourseModal()">
            <i class="fa-solid fa-plus"></i> Create New Course
          </button>
        </div>

        <!-- Instructor Metrics -->
        <div class="metrics-row">
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${myCourses.length}</span>
              <span class="metric-label">Active Courses</span>
            </div>
            <div class="metric-icon-wrap" style="background: var(--primary-light); color: var(--primary);">
              <i class="fa-solid fa-book-open"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${totalStudents}</span>
              <span class="metric-label">Total Scholars</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald);">
              <i class="fa-solid fa-users"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${assignments.length}</span>
              <span class="metric-label">Course Assignments</span>
            </div>
            <div class="metric-icon-wrap" style="background: var(--secondary-light); color: var(--secondary);">
              <i class="fa-solid fa-file-pen"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${pendingSubmissions.length}</span>
              <span class="metric-label">Pending Grading</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
              <i class="fa-solid fa-bell"></i>
            </div>
          </div>
        </div>

        <!-- Instructor Submissions Table -->
        <div class="content-panel">
          <div class="panel-header">
            <h3 class="panel-title"><i class="fa-solid fa-check-to-slot" style="color: var(--primary);"></i> Submissions Requiring Evaluation</h3>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Assignment</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${submissions.map(sub => {
                  const asg = assignments.find(a => a.id === sub.assignmentId);
                  return `
                    <tr>
                      <td><strong>${sub.studentName}</strong></td>
                      <td>${asg ? asg.title : 'Assignment'}</td>
                      <td>${sub.submittedAt}</td>
                      <td><span class="status-pill ${sub.status}">${sub.status}</span></td>
                      <td class="font-mono">${sub.marksObtained !== null ? `${sub.marksObtained}/${sub.maxMarks}` : 'Pending'}</td>
                      <td>
                        <button class="btn btn-primary btn-sm" onclick="LMS_App.openGradingModal('${sub.id}')">
                          <i class="fa-solid fa-marker"></i> ${sub.status === 'graded' ? 'Update Grade' : 'Grade'}
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Instructor Courses Table -->
        <div class="content-panel">
          <div class="panel-header">
            <h3 class="panel-title"><i class="fa-solid fa-layer-group" style="color: var(--secondary);"></i> My Published Courses</h3>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Duration</th>
                  <th>Students</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${myCourses.map(c => `
                  <tr>
                    <td><strong>${c.title}</strong></td>
                    <td>${c.category}</td>
                    <td>${c.difficulty}</td>
                    <td>${c.duration}</td>
                    <td class="tabular-nums">${c.studentsCount}</td>
                    <td style="color: #f59e0b;"><i class="fa-solid fa-star"></i> ${c.rating}</td>
                    <td>
                      <div style="display: flex; gap: 0.4rem;">
                        <button class="btn btn-subtle btn-sm" onclick="LMS_App.openEditCourseModal('${c.id}')"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn btn-subtle btn-sm" style="color: #ef4444;" onclick="LMS_App.confirmDeleteCourse('${c.id}')"><i class="fa-solid fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    setInstructorTab(tab) {
      this.activeInstructorTab = tab;
      const items = document.querySelectorAll('#view-instructor-dashboard .sidebar-nav-item');
      items.forEach(i => i.classList.remove('active'));

      const content = document.getElementById('instructorDashboardContent');

      if (tab === 'overview') {
        this.renderInstructorDashboard();
      } else if (tab === 'courses') {
        const myCourses = getData(STORAGE_KEYS.COURSES, []);
        content.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Course Management</h1>
            <button class="btn btn-primary" onclick="LMS_App.openCreateCourseModal()"><i class="fa-solid fa-plus"></i> Add Course</button>
          </div>
          <div class="courses-grid">
            ${myCourses.map(c => this.createCourseCardHTML(c)).join('')}
          </div>
        `;
      } else if (tab === 'submissions') {
        this.renderInstructorDashboard();
      } else if (tab === 'students') {
        const students = getData(STORAGE_KEYS.USERS, []).filter(u => u.role === 'student');
        content.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Enrolled Scholars Directory</h1>
            <p style="color: var(--text-muted);">View student progress, semester standing, and academic email details.</p>
          </div>
          <div class="content-panel">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${students.map(s => `
                    <tr>
                      <td class="font-mono"><strong>${s.studentId}</strong></td>
                      <td>${s.name}</td>
                      <td>${s.department}</td>
                      <td>${s.semester}</td>
                      <td>${s.email}</td>
                      <td><span class="status-pill passed">Enrolled</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (tab === 'profile') {
        content.innerHTML = this.renderUserProfileSettings();
      }
    },

    // =========================================================================
    // ADMIN DASHBOARD & ADVANCED ANALYTICS (CHART.JS)
    // =========================================================================
    renderAdminDashboard() {
      const content = document.getElementById('adminDashboardContent');

      const users = getData(STORAGE_KEYS.USERS, []);
      const students = users.filter(u => u.role === 'student');
      const instructors = users.filter(u => u.role === 'instructor');
      const courses = getData(STORAGE_KEYS.COURSES, []);
      const enrollments = getData(STORAGE_KEYS.ENROLLMENTS, []);
      const assignments = getData(STORAGE_KEYS.ASSIGNMENTS, []);
      const quizzes = getData(STORAGE_KEYS.QUIZZES, []);

      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 class="font-display" style="font-size: 2rem; font-weight: 800; margin-bottom: 0.25rem;">
              University LMS Admin Console
            </h1>
            <p style="color: var(--text-muted);">Institutional oversight, course catalog accreditation, user provisioning, and analytics.</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline" onclick="LMS_App.generateAcademicReport()"><i class="fa-solid fa-file-export"></i> Export Report</button>
            <button class="btn btn-primary" onclick="LMS_App.openCreateCourseModal()"><i class="fa-solid fa-plus"></i> New Course</button>
          </div>
        </div>

        <!-- 6 Institutional Metrics -->
        <div class="metrics-row">
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${students.length}</span>
              <span class="metric-label">Enrolled Students</span>
            </div>
            <div class="metric-icon-wrap" style="background: var(--primary-light); color: var(--primary);">
              <i class="fa-solid fa-user-graduate"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${instructors.length}</span>
              <span class="metric-label">Faculty Members</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald);">
              <i class="fa-solid fa-chalkboard-user"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${courses.length}</span>
              <span class="metric-label">Accredited Courses</span>
            </div>
            <div class="metric-icon-wrap" style="background: var(--secondary-light); color: var(--secondary);">
              <i class="fa-solid fa-book-open"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${enrollments.length + 1420}</span>
              <span class="metric-label">Total Enrollments</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
              <i class="fa-solid fa-chart-line"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${assignments.length}</span>
              <span class="metric-label">Course Assignments</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(225, 29, 72, 0.15); color: var(--accent-rose);">
              <i class="fa-solid fa-file-lines"></i>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-value tabular-nums">${quizzes.length}</span>
              <span class="metric-label">Active Quizzes</span>
            </div>
            <div class="metric-icon-wrap" style="background: rgba(124, 58, 237, 0.15); color: var(--accent-purple);">
              <i class="fa-solid fa-circle-question"></i>
            </div>
          </div>
        </div>

        <!-- Interactive Chart.js Visuals -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2rem; margin-bottom: 2rem;">
          <div class="content-panel" style="margin-bottom: 0;">
            <div class="panel-header">
              <h3 class="panel-title"><i class="fa-solid fa-chart-area" style="color: var(--primary);"></i> Monthly Student Registrations & Enrollments</h3>
            </div>
            <div style="height: 280px; position: relative;">
              <canvas id="adminEnrollmentChart"></canvas>
            </div>
          </div>

          <div class="content-panel" style="margin-bottom: 0;">
            <div class="panel-header">
              <h3 class="panel-title"><i class="fa-solid fa-chart-pie" style="color: var(--accent-purple);"></i> Courses by Category Breakdown</h3>
            </div>
            <div style="height: 280px; position: relative;">
              <canvas id="adminCategoryChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Recent Registered Students & Quick Management -->
        <div class="content-panel">
          <div class="panel-header">
            <h3 class="panel-title"><i class="fa-solid fa-users-gear" style="color: var(--accent-emerald);"></i> Registered Students Roster</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${students.length} Total Registered Scholars</span>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${students.slice(0, 8).map(s => `
                  <tr>
                    <td class="font-mono"><strong>${s.studentId}</strong></td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.department}</td>
                    <td>${s.semester}</td>
                    <td>
                      <button class="btn btn-subtle btn-sm" onclick="LMS_App.deleteUser('${s.id}')" style="color: #ef4444;"><i class="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      setTimeout(() => {
        this.renderAdminCharts();
      }, 50);
    },

    setAdminTab(tab) {
      this.activeAdminTab = tab;
      const content = document.getElementById('adminDashboardContent');

      if (tab === 'overview') {
        this.renderAdminDashboard();
      } else if (tab === 'students') {
        const students = getData(STORAGE_KEYS.USERS, []).filter(u => u.role === 'student');
        content.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Student Management</h1>
            <p style="color: var(--text-muted);">Manage registered university student profiles, course histories, and credentials.</p>
          </div>
          <div class="content-panel">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${students.map(s => `
                    <tr>
                      <td class="font-mono"><strong>${s.studentId}</strong></td>
                      <td>${s.name}</td>
                      <td>${s.email}</td>
                      <td>${s.department}</td>
                      <td>${s.semester}</td>
                      <td>
                        <button class="btn btn-subtle btn-sm" style="color: #ef4444;" onclick="LMS_App.deleteUser('${s.id}')">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (tab === 'instructors') {
        const instructors = getData(STORAGE_KEYS.USERS, []).filter(u => u.role === 'instructor');
        content.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Faculty & Instructor Roster</h1>
            <p style="color: var(--text-muted);">Approve university teaching staff and assign departments.</p>
          </div>
          <div class="content-panel">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Faculty ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Qualification</th>
                    <th>Specialization</th>
                  </tr>
                </thead>
                <tbody>
                  ${instructors.map(inst => `
                    <tr>
                      <td class="font-mono"><strong>${inst.studentId || 'FAC-100'}</strong></td>
                      <td><strong>${inst.name}</strong></td>
                      <td>${inst.department}</td>
                      <td>${inst.qualification || 'M.S. / Ph.D.'}</td>
                      <td>${inst.specialization || 'Computing Systems'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (tab === 'courses') {
        const courses = getData(STORAGE_KEYS.COURSES, []);
        content.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Course Catalog Moderation</h1>
            <button class="btn btn-primary" onclick="LMS_App.openCreateCourseModal()"><i class="fa-solid fa-plus"></i> Add Course</button>
          </div>
          <div class="content-panel">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Instructor</th>
                    <th>Difficulty</th>
                    <th>Enrolled</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${courses.map(c => `
                    <tr>
                      <td><strong>${c.title}</strong></td>
                      <td>${c.category}</td>
                      <td>${c.instructor}</td>
                      <td>${c.difficulty}</td>
                      <td class="tabular-nums">${c.studentsCount}</td>
                      <td><span class="status-pill passed">Accredited</span></td>
                      <td>
                        <div style="display: flex; gap: 0.35rem;">
                          <button class="btn btn-subtle btn-sm" onclick="LMS_App.openEditCourseModal('${c.id}')"><i class="fa-solid fa-pen"></i></button>
                          <button class="btn btn-subtle btn-sm" style="color: #ef4444;" onclick="LMS_App.confirmDeleteCourse('${c.id}')"><i class="fa-solid fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (tab === 'reports') {
        this.generateAcademicReport();
      }
    },

    renderAdminCharts() {
      if (typeof Chart === 'undefined') return;

      const isDark = document.body.classList.contains('dark-mode');
      const textColor = isDark ? '#94a3b8' : '#64748b';
      const gridColor = isDark ? '#334155' : '#e2e8f0';

      // 1. Enrollment Line Chart
      const lineCtx = document.getElementById('adminEnrollmentChart');
      if (lineCtx) {
        if (this.chartInstances.enrollment) this.chartInstances.enrollment.destroy();
        this.chartInstances.enrollment = new Chart(lineCtx, {
          type: 'line',
          data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [
              {
                label: 'Course Enrollments',
                data: [120, 240, 480, 710, 950, 1280, 1540],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.35
              },
              {
                label: 'Certificates Awarded',
                data: [40, 85, 190, 310, 490, 720, 960],
                borderColor: '#10b981',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.35
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: textColor } }
            },
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor } }
            }
          }
        });
      }

      // 2. Category Doughnut Chart
      const catCtx = document.getElementById('adminCategoryChart');
      if (catCtx) {
        if (this.chartInstances.category) this.chartInstances.category.destroy();
        const categories = getData(STORAGE_KEYS.CATEGORIES, []);
        this.chartInstances.category = new Chart(catCtx, {
          type: 'doughnut',
          data: {
            labels: categories.map(c => c.name),
            datasets: [{
              data: categories.map(c => c.courseCount),
              backgroundColor: ['#2563eb', '#7c3aed', '#0d9488', '#e11d48', '#d97706', '#059669', '#0284c7', '#ec4899']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } }
            }
          }
        });
      }
    },

    generateAcademicReport() {
      const students = getData(STORAGE_KEYS.USERS, []).filter(u => u.role === 'student');
      const courses = getData(STORAGE_KEYS.COURSES, []);
      const assignments = getData(STORAGE_KEYS.ASSIGNMENTS, []);
      const quizzes = getData(STORAGE_KEYS.QUIZZES, []);

      const reportWindow = window.open('', '_blank');
      if (!reportWindow) {
        this.showToast('Please allow popups to view the generated academic report.', 'warning');
        return;
      }

      reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>EduPulse LMS - Academic Institution Evaluation Report</title>
          <style>
            body { font-family: -apple-system, sans-serif; padding: 2rem; color: #0f172a; line-height: 1.5; }
            h1 { color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; margin-bottom: 2rem; }
            th, td { border: 1px solid #cbd5e1; padding: 0.6rem 0.8rem; text-align: left; font-size: 0.85rem; }
            th { background: #f1f5f9; }
            .badge { display: inline-block; padding: 0.2rem 0.5rem; background: #dbeafe; color: #1e40af; border-radius: 4px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>EduPulse LMS · University Institutional Report</h1>
          <p>Generated on ${new Date().toLocaleString()} for BSIT Web Technology Course Review</p>
          <div style="display: flex; gap: 2rem; margin: 1.5rem 0;">
            <div><strong>Total Enrolled Students:</strong> ${students.length}</div>
            <div><strong>Accredited Courses:</strong> ${courses.length}</div>
            <div><strong>Active Assignments:</strong> ${assignments.length}</div>
            <div><strong>Standard Quizzes:</strong> ${quizzes.length}</div>
          </div>

          <h2>Accredited Course Catalog</h2>
          <table>
            <thead>
              <tr><th>Course Title</th><th>Instructor</th><th>Category</th><th>Difficulty</th><th>Students</th></tr>
            </thead>
            <tbody>
              ${courses.map(c => `<tr><td>${c.title}</td><td>${c.instructor}</td><td>${c.category}</td><td>${c.difficulty}</td><td>${c.studentsCount}</td></tr>`).join('')}
            </tbody>
          </table>

          <h2>Student Registry Summary</h2>
          <table>
            <thead>
              <tr><th>Student ID</th><th>Name</th><th>Department</th><th>Semester</th><th>Email</th></tr>
            </thead>
            <tbody>
              ${students.map(s => `<tr><td>${s.studentId}</td><td>${s.name}</td><td>${s.department}</td><td>${s.semester}</td><td>${s.email}</td></tr>`).join('')}
            </tbody>
          </table>
          <button onclick="window.print()" style="padding: 0.6rem 1.2rem; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Print Academic Report</button>
        </body>
        </html>
      `);
      reportWindow.document.close();
    },

    deleteUser(userId) {
      this.openConfirmModal('Delete User Account', 'Are you sure you want to delete this user from the academic roster?', () => {
        let users = getData(STORAGE_KEYS.USERS, []);
        users = users.filter(u => u.id !== userId);
        saveData(STORAGE_KEYS.USERS, users);
        this.showToast('User account removed.', 'info');
        this.renderAdminDashboard();
      });
    },

    // =========================================================================
    // QUIZ MANAGEMENT & RUNNER ENGINE
    // =========================================================================
    startQuiz(quizId) {
      if (!this.requireAuth('student')) return;

      const quizzes = getData(STORAGE_KEYS.QUIZZES, []);
      this.activeQuiz = quizzes.find(q => q.id === quizId);
      if (!this.activeQuiz) {
        this.showToast('Quiz not found.', 'error');
        return;
      }

      this.quizCurrentQuestion = 0;
      this.quizUserAnswers = {};
      this.quizRemainingSeconds = this.activeQuiz.durationMinutes * 60;

      // Reset modal UI
      document.getElementById('quizRunnerTitle').textContent = this.activeQuiz.title;
      document.getElementById('quizRunnerMeta').textContent = `Course: ${this.activeQuiz.courseTitle} · Passing: ${this.activeQuiz.passingScore}%`;
      document.getElementById('quizResultScorecard').style.display = 'none';
      document.getElementById('quizQuestionContainer').style.display = 'block';
      document.getElementById('quizRunnerFooter').style.display = 'flex';

      const modal = document.getElementById('view-quiz-runner');
      modal.style.display = 'flex';

      this.renderQuizDots();
      this.loadQuizQuestion(0);
      this.startQuizTimer();
    },

    startQuizTimer() {
      clearInterval(this.quizTimerInterval);
      this.updateQuizTimerDisplay();

      this.quizTimerInterval = setInterval(() => {
        this.quizRemainingSeconds--;
        this.updateQuizTimerDisplay();

        if (this.quizRemainingSeconds <= 0) {
          clearInterval(this.quizTimerInterval);
          this.showToast('Time expired! Submitting assessment automatically.', 'warning');
          this.submitQuiz();
        }
      }, 1000);
    },

    updateQuizTimerDisplay() {
      const minutes = Math.floor(this.quizRemainingSeconds / 60);
      const seconds = this.quizRemainingSeconds % 60;
      const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const display = document.getElementById('quizTimerDisplay');
      const box = document.getElementById('quizTimerBox');
      if (display) display.textContent = formatted;

      if (this.quizRemainingSeconds <= 60 && box) {
        box.classList.add('timer-warning');
      } else if (box) {
        box.classList.remove('timer-warning');
      }
    },

    renderQuizDots() {
      const container = document.getElementById('quizDotsContainer');
      container.innerHTML = this.activeQuiz.questions.map((_, idx) => `
        <div class="quiz-dot ${idx === this.quizCurrentQuestion ? 'active' : ''} ${this.quizUserAnswers[idx] !== undefined ? 'answered' : ''}" onclick="LMS_App.loadQuizQuestion(${idx})">
          ${idx + 1}
        </div>
      `).join('');
    },

    loadQuizQuestion(index) {
      if (!this.activeQuiz || index < 0 || index >= this.activeQuiz.questions.length) return;
      this.quizCurrentQuestion = index;
      const q = this.activeQuiz.questions[index];

      document.getElementById('quizQuestionIndex').textContent = `Question ${index + 1} of ${this.activeQuiz.questions.length}`;
      document.getElementById('quizQuestionText').textContent = q.text;

      const letters = ['A', 'B', 'C', 'D'];
      const selectedOption = this.quizUserAnswers[index];

      const optionsList = document.getElementById('quizOptionsList');
      optionsList.innerHTML = q.options.map((opt, optIdx) => `
        <label class="quiz-option-label ${selectedOption === optIdx ? 'selected' : ''}" onclick="LMS_App.selectQuizOption(${index}, ${optIdx})">
          <div class="option-indicator">${letters[optIdx]}</div>
          <span style="font-size: 0.95rem; color: var(--text-primary); font-weight: 500;">${opt}</span>
        </label>
      `).join('');

      document.getElementById('quizPrevBtn').disabled = index === 0;
      document.getElementById('quizNextBtn').disabled = index === this.activeQuiz.questions.length - 1;

      this.renderQuizDots();
    },

    selectQuizOption(questionIndex, optionIndex) {
      this.quizUserAnswers[questionIndex] = optionIndex;
      this.loadQuizQuestion(questionIndex);
    },

    navQuizQuestion(delta) {
      this.loadQuizQuestion(this.quizCurrentQuestion + delta);
    },

    confirmSubmitQuiz() {
      const answeredCount = Object.keys(this.quizUserAnswers).length;
      const total = this.activeQuiz.questions.length;
      if (answeredCount < total) {
        this.openConfirmModal(
          'Submit Assessment?',
          `You have answered ${answeredCount} of ${total} questions. Are you sure you wish to submit now?`,
          () => this.submitQuiz()
        );
      } else {
        this.submitQuiz();
      }
    },

    submitQuiz() {
      clearInterval(this.quizTimerInterval);

      let correctCount = 0;
      const total = this.activeQuiz.questions.length;

      this.activeQuiz.questions.forEach((q, idx) => {
        if (this.quizUserAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });

      const scorePercent = Math.round((correctCount / total) * 100);
      const passed = scorePercent >= this.activeQuiz.passingScore;

      // Save attempt
      const attempts = getData(STORAGE_KEYS.QUIZ_ATTEMPTS, []);
      const newAttempt = {
        id: `att_${Date.now()}`,
        quizId: this.activeQuiz.id,
        studentId: this.currentUser.id,
        scorePercent: scorePercent,
        correctAnswers: correctCount,
        totalQuestions: total,
        passed: passed,
        date: new Date().toISOString().split('T')[0]
      };
      attempts.push(newAttempt);
      saveData(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts);

      // Show scorecard
      document.getElementById('quizQuestionContainer').style.display = 'none';
      document.getElementById('quizRunnerFooter').style.display = 'none';
      const scorecard = document.getElementById('quizResultScorecard');
      scorecard.style.display = 'block';

      document.getElementById('quizScorePercent').textContent = `${scorePercent}%`;
      const passStatus = document.getElementById('quizPassFailStatus');
      passStatus.textContent = passed ? 'PASSED' : 'FAILED';
      passStatus.style.color = passed ? 'var(--accent-emerald)' : '#ef4444';

      document.getElementById('quizScoreCircle').style.borderColor = passed ? 'var(--accent-emerald)' : '#ef4444';
      document.getElementById('quizScoreHeadline').textContent = passed ? 'Assessment Passed! 🎉' : 'Assessment Incomplete';
      document.getElementById('quizScoreDetails').textContent = `You correctly answered ${correctCount} out of ${total} questions (${scorePercent}%). Passing grade is ${this.activeQuiz.passingScore}%.`;

      this.showToast(`Quiz completed: ${scorePercent}% score!`, passed ? 'success' : 'warning');
    },

    reviewQuizAnswers() {
      // In review mode, show question 0 with answer indicators
      document.getElementById('quizResultScorecard').style.display = 'none';
      document.getElementById('quizQuestionContainer').style.display = 'block';
      document.getElementById('quizRunnerFooter').style.display = 'flex';
      this.loadQuizQuestion(0);
    },

    closeQuizModal() {
      clearInterval(this.quizTimerInterval);
      const modal = document.getElementById('view-quiz-runner');
      modal.style.display = 'none';
      this.navigateRoleDashboard();
    },

    // =========================================================================
    // ASSIGNMENT MANAGEMENT & SUBMISSION
    // =========================================================================
    openSubmitAssignmentModal(assignmentId) {
      if (!this.requireAuth('student')) return;

      const assignments = getData(STORAGE_KEYS.ASSIGNMENTS, []);
      const asg = assignments.find(a => a.id === assignmentId);
      if (!asg) return;

      document.getElementById('assignSubmitId').value = asg.id;
      document.getElementById('assignSubmitTitleText').textContent = asg.title;
      document.getElementById('assignSubmitInstructions').textContent = asg.description;
      document.getElementById('assignSubmitDueDate').textContent = asg.dueDate;
      document.getElementById('assignSubmitTotalMarks').textContent = asg.totalMarks;
      document.getElementById('assignSubmitText').value = '';

      const modal = document.getElementById('assignmentSubmitModal');
      modal.classList.add('active');
    },

    saveAssignmentSubmission(e) {
      e.preventDefault();
      const assignmentId = document.getElementById('assignSubmitId').value;
      const text = document.getElementById('assignSubmitText').value.trim();
      const fileInput = document.getElementById('assignSubmitFile');
      const fileName = fileInput.files[0] ? fileInput.files[0].name : 'Solution_Document.txt';

      const submissions = getData(STORAGE_KEYS.SUBMISSIONS, []);
      const existingIdx = submissions.findIndex(s => s.assignmentId === assignmentId && s.studentId === this.currentUser.id);

      const subData = {
        id: existingIdx !== -1 ? submissions[existingIdx].id : `sub_${Date.now()}`,
        assignmentId: assignmentId,
        studentId: this.currentUser.id,
        studentName: this.currentUser.name,
        studentEmail: this.currentUser.email,
        status: 'submitted',
        submittedAt: new Date().toISOString().split('T')[0],
        submissionText: text,
        fileName: fileName,
        marksObtained: null,
        maxMarks: 100,
        feedback: null
      };

      if (existingIdx !== -1) {
        submissions[existingIdx] = subData;
      } else {
        submissions.push(subData);
      }

      saveData(STORAGE_KEYS.SUBMISSIONS, submissions);
      this.closeModal('assignmentSubmitModal');
      this.showToast('Assignment submitted successfully for instructor review!', 'success');
      this.navigateRoleDashboard();
    },

    viewSubmissionDetails(submissionId) {
      const submissions = getData(STORAGE_KEYS.SUBMISSIONS, []);
      const sub = submissions.find(s => s.id === submissionId);
      if (!sub) return;

      alert(`Assignment Submission Details:\n\nStudent: ${sub.studentName}\nStatus: ${sub.status.toUpperCase()}\nSubmitted Date: ${sub.submittedAt}\n\nMarks Obtained: ${sub.marksObtained !== null ? sub.marksObtained + ' / ' + sub.maxMarks : 'Pending Evaluation'}\n\nInstructor Feedback:\n${sub.feedback || 'No feedback published yet.'}`);
    },

    openGradingModal(submissionId) {
      const submissions = getData(STORAGE_KEYS.SUBMISSIONS, []);
      const sub = submissions.find(s => s.id === submissionId);
      if (!sub) return;

      const assignments = getData(STORAGE_KEYS.ASSIGNMENTS, []);
      const asg = assignments.find(a => a.id === sub.assignmentId);

      document.getElementById('gradeSubmissionId').value = sub.id;
      document.getElementById('gradeStudentName').textContent = sub.studentName;
      document.getElementById('gradeStudentId').textContent = sub.studentEmail;
      document.getElementById('gradeAssignTitle').textContent = asg ? asg.title : 'Assignment';
      document.getElementById('gradeSubmissionContent').textContent = sub.submissionText || 'No text provided.';
      document.getElementById('gradeMaxMarks').textContent = sub.maxMarks || 100;
      document.getElementById('gradeMarksObtained').value = sub.marksObtained !== null ? sub.marksObtained : 85;
      document.getElementById('gradeFeedbackText').value = sub.feedback || 'Well-structured solution with accurate adherence to project requirements.';

      document.getElementById('gradingModal').classList.add('active');
    },

    saveGrading(e) {
      e.preventDefault();
      const subId = document.getElementById('gradeSubmissionId').value;
      const marks = parseInt(document.getElementById('gradeMarksObtained').value, 10);
      const feedback = document.getElementById('gradeFeedbackText').value.trim();

      const submissions = getData(STORAGE_KEYS.SUBMISSIONS, []);
      const sub = submissions.find(s => s.id === subId);
      if (sub) {
        sub.status = 'graded';
        sub.marksObtained = marks;
        sub.feedback = feedback;
        saveData(STORAGE_KEYS.SUBMISSIONS, submissions);

        // Add Notification for student
        this.createNotification(
          sub.studentId,
          'Assignment Graded',
          `Your assignment was graded by instructor. Score: ${marks}/${sub.maxMarks}.`,
          'fa-check-double'
        );

        this.closeModal('gradingModal');
        this.showToast('Grade and feedback saved successfully!', 'success');
        this.renderInstructorDashboard();
      }
    },

    // =========================================================================
    // COURSE CRUD (INSTRUCTOR & ADMIN)
    // =========================================================================
    openCreateCourseModal() {
      if (!this.requireAuth('instructor')) return;
      document.getElementById('courseModalTitle').textContent = 'Create New Course';
      document.getElementById('courseFormId').value = '';
      document.getElementById('courseFormTitle').value = '';
      document.getElementById('courseFormInstructor').value = this.currentUser.name;
      document.getElementById('courseFormDuration').value = '10 Weeks (30 Hours)';
      document.getElementById('courseFormDescription').value = '';
      document.getElementById('courseFormRequirements').value = 'Basic computer literacy';
      document.getElementById('courseFormOutcomes').value = 'Master core concepts, Build practical applications';

      this.populateCategoriesDropdowns();
      document.getElementById('courseModal').classList.add('active');
    },

    openEditCourseModal(courseId) {
      const courses = getData(STORAGE_KEYS.COURSES, []);
      const c = courses.find(item => item.id === courseId);
      if (!c) return;

      document.getElementById('courseModalTitle').textContent = 'Edit Course';
      document.getElementById('courseFormId').value = c.id;
      document.getElementById('courseFormTitle').value = c.title;
      document.getElementById('courseFormCategory').value = c.category;
      document.getElementById('courseFormDifficulty').value = c.difficulty;
      document.getElementById('courseFormInstructor').value = c.instructor;
      document.getElementById('courseFormDuration').value = c.duration;
      document.getElementById('courseFormDescription').value = c.description;
      document.getElementById('courseFormRequirements').value = c.requirements || '';
      document.getElementById('courseFormOutcomes').value = c.outcomes || '';
      document.getElementById('courseFormThumbnail').value = c.thumbnail;

      document.getElementById('courseModal').classList.add('active');
    },

    saveCourseForm(e) {
      e.preventDefault();
      const courseId = document.getElementById('courseFormId').value;
      const title = document.getElementById('courseFormTitle').value.trim();
      const category = document.getElementById('courseFormCategory').value;
      const difficulty = document.getElementById('courseFormDifficulty').value;
      const instructor = document.getElementById('courseFormInstructor').value.trim();
      const duration = document.getElementById('courseFormDuration').value.trim();
      const description = document.getElementById('courseFormDescription').value.trim();
      const requirements = document.getElementById('courseFormRequirements').value.trim();
      const outcomes = document.getElementById('courseFormOutcomes').value.trim();
      const thumbnail = document.getElementById('courseFormThumbnail').value;

      const courses = getData(STORAGE_KEYS.COURSES, []);

      if (courseId) {
        // Edit
        const c = courses.find(item => item.id === courseId);
        if (c) {
          c.title = title;
          c.category = category;
          c.difficulty = difficulty;
          c.instructor = instructor;
          c.duration = duration;
          c.description = description;
          c.requirements = requirements;
          c.outcomes = outcomes;
          c.thumbnail = thumbnail;
          this.showToast('Course updated successfully!', 'success');
        }
      } else {
        // Create new
        const newCourse = {
          id: `crs_${Date.now()}`,
          title,
          category,
          difficulty,
          instructor,
          instructorId: this.currentUser.id,
          duration,
          description,
          requirements,
          outcomes,
          thumbnail,
          lessonsCount: 3,
          studentsCount: 0,
          rating: 5.0,
          price: 'Free',
          status: 'Active'
        };
        courses.push(newCourse);

        // Seed 3 default lessons for this new course
        const allLessons = getData(STORAGE_KEYS.LESSONS, []);
        allLessons.push(
          {
            id: `lsn_${Date.now()}_1`,
            courseId: newCourse.id,
            title: `Introduction to ${newCourse.title}`,
            duration: '20 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: `Orientation and foundational syllabus lecture for ${newCourse.title}.`,
            resources: [{ name: 'Lecture Syllabus & Notes (PDF)', size: '1.2 MB' }]
          },
          {
            id: `lsn_${Date.now()}_2`,
            courseId: newCourse.id,
            title: 'Core Architecture & Methodologies',
            duration: '35 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'In-depth conceptual analysis and practical engineering examples.',
            resources: [{ name: 'Project Exercises (ZIP)', size: '2.5 MB' }]
          },
          {
            id: `lsn_${Date.now()}_3`,
            courseId: newCourse.id,
            title: 'Advanced Capstone Implementation',
            duration: '40 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Putting it all together into a production-grade academic project.',
            resources: [{ name: 'Final Solution Template', size: '1.8 MB' }]
          }
        );
        saveData(STORAGE_KEYS.LESSONS, allLessons);
        this.showToast('New course created and syllabus published!', 'success');
      }

      saveData(STORAGE_KEYS.COURSES, courses);
      this.closeModal('courseModal');
      this.navigateRoleDashboard();
    },

    confirmDeleteCourse(courseId) {
      this.openConfirmModal('Delete Course', 'Are you sure you want to permanently delete this course and its curriculum lessons?', () => {
        let courses = getData(STORAGE_KEYS.COURSES, []);
        courses = courses.filter(c => c.id !== courseId);
        saveData(STORAGE_KEYS.COURSES, courses);

        let lessons = getData(STORAGE_KEYS.LESSONS, []);
        lessons = lessons.filter(l => l.courseId !== courseId);
        saveData(STORAGE_KEYS.LESSONS, lessons);

        this.showToast('Course deleted.', 'info');
        this.navigateRoleDashboard();
      });
    },

    // =========================================================================
    // CERTIFICATE GENERATION & DISPLAY
    // =========================================================================
    issueCertificate(studentId, courseId) {
      const certs = getData(STORAGE_KEYS.CERTIFICATES, []);
      if (certs.some(c => c.studentId === studentId && c.courseId === courseId)) return;

      const courses = getData(STORAGE_KEYS.COURSES, []);
      const course = courses.find(c => c.id === courseId);
      const student = getData(STORAGE_KEYS.USERS, []).find(u => u.id === studentId);

      const verificationId = `EP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const newCert = {
        id: `cert_${Date.now()}`,
        studentId: studentId,
        studentName: student ? student.name : 'University Scholar',
        courseId: courseId,
        courseTitle: course ? course.title : 'Academic Course',
        instructorName: course ? course.instructor : 'Faculty Chair',
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        verificationId: verificationId
      };

      certs.push(newCert);
      saveData(STORAGE_KEYS.CERTIFICATES, certs);

      this.createNotification(
        studentId,
        'Certificate Unlocked',
        `Official Certificate of Completion awarded for ${newCert.courseTitle}.`,
        'fa-award'
      );
    },

    renderCertificate(certIdOrCourseId) {
      const certs = getData(STORAGE_KEYS.CERTIFICATES, []);
      let cert = certs.find(c => c.id === certIdOrCourseId || c.courseId === certIdOrCourseId);

      // If not yet formally issued, generate sample view for demonstration
      if (!cert) {
        const courses = getData(STORAGE_KEYS.COURSES, []);
        const course = courses.find(c => c.id === certIdOrCourseId) || courses[0];
        cert = {
          studentName: this.currentUser ? this.currentUser.name : 'Alex Hunter',
          courseTitle: course.title,
          instructorName: course.instructor,
          issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          verificationId: `EP-2026-${Math.floor(10000 + Math.random() * 90000)}`
        };
      }

      document.getElementById('certStudentName').textContent = cert.studentName;
      document.getElementById('certCourseTitle').textContent = cert.courseTitle;
      document.getElementById('certInstructorName').textContent = cert.instructorName;
      document.getElementById('certIssueDate').textContent = cert.issueDate;
      document.getElementById('certVerificationId').textContent = cert.verificationId;
    },

    // =========================================================================
    // MESSAGING INTERFACE
    // =========================================================================
    renderMessagingInterface() {
      const messages = getData(STORAGE_KEYS.MESSAGES, []);
      return `
        <div style="margin-bottom: 2rem;">
          <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Academic Communication</h1>
          <p style="color: var(--text-muted);">Direct consultation channel between scholars and course faculty.</p>
        </div>
        <div class="content-panel" style="max-width: 780px;">
          <div style="height: 340px; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; border-bottom: 1px solid var(--border-light);" id="chatMessagesBox">
            ${messages.map(m => `
              <div style="display: flex; flex-direction: column; align-items: ${m.isFromMe ? 'flex-end' : 'flex-start'};">
                <span style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.2rem;">${m.senderName} · ${m.time}</span>
                <div style="background: ${m.isFromMe ? 'var(--primary)' : 'var(--bg-subtle)'}; color: ${m.isFromMe ? '#ffffff' : 'var(--text-primary)'}; padding: 0.75rem 1rem; border-radius: var(--radius-md); max-width: 75%; font-size: 0.9rem;">
                  ${m.text}
                </div>
              </div>
            `).join('')}
          </div>
          <form onsubmit="LMS_App.sendMessage(event)" style="display: flex; gap: 0.75rem; padding-top: 1rem;">
            <input type="text" id="chatInputMessage" class="form-control" placeholder="Type an academic inquiry or consultation message..." required />
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Send</button>
          </form>
        </div>
      `;
    },

    sendMessage(e) {
      e.preventDefault();
      const input = document.getElementById('chatInputMessage');
      const text = input.value.trim();
      if (!text) return;

      const messages = getData(STORAGE_KEYS.MESSAGES, []);
      const newMsg = {
        id: `msg_${Date.now()}`,
        senderId: this.currentUser.id,
        senderName: this.currentUser.name,
        receiverId: 'usr_inst_01',
        text: text,
        time: 'Just now',
        isFromMe: true
      };
      messages.push(newMsg);
      saveData(STORAGE_KEYS.MESSAGES, messages);
      input.value = '';

      // Re-render
      const chatBox = document.getElementById('chatMessagesBox');
      if (chatBox) {
        const div = document.createElement('div');
        div.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end;';
        div.innerHTML = `
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.2rem;">${newMsg.senderName} · ${newMsg.time}</span>
          <div style="background: var(--primary); color: #ffffff; padding: 0.75rem 1rem; border-radius: var(--radius-md); max-width: 75%; font-size: 0.9rem;">
            ${newMsg.text}
          </div>
        `;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
      this.showToast('Consultation message dispatched.', 'success');
    },

    // =========================================================================
    // PROFILE & SETTINGS
    // =========================================================================
    renderUserProfileSettings() {
      const u = this.currentUser;
      return `
        <div style="margin-bottom: 2rem;">
          <h1 class="font-display" style="font-size: 1.85rem; font-weight: 800;">Academic Profile & Settings</h1>
          <p style="color: var(--text-muted);">Manage your personal academic details, university email, and portal preferences.</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 960px;">
          <div class="content-panel">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem;">
              <i class="fa-regular fa-id-badge" style="color: var(--primary);"></i> Scholar Information
            </h3>
            <form onsubmit="LMS_App.saveUserProfile(event)">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="profName" class="form-control" value="${u.name}" required />
              </div>
              <div class="form-group">
                <label class="form-label">University Email</label>
                <input type="email" id="profEmail" class="form-control" value="${u.email}" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Department</label>
                  <input type="text" id="profDept" class="form-control" value="${u.department || ''}" />
                </div>
                <div class="form-group">
                  <label class="form-label">${u.role === 'student' ? 'Semester' : 'Title'}</label>
                  <input type="text" id="profSem" class="form-control" value="${u.semester || ''}" />
                </div>
              </div>
              <button type="submit" class="btn btn-primary"><i class="fa-solid fa-save"></i> Save Profile</button>
            </form>
          </div>

          <div class="content-panel">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem;">
              <i class="fa-solid fa-sliders" style="color: var(--secondary);"></i> Portal Preferences
            </h3>
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
                <div>
                  <strong style="font-size: 0.9rem; display: block;">Dark Appearance Theme</strong>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">Toggle low-glare dark color palette</span>
                </div>
                <button class="btn btn-outline btn-sm" onclick="LMS_App.toggleDarkMode()">Toggle Theme</button>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
                <div>
                  <strong style="font-size: 0.9rem; display: block;">Email Notifications</strong>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">Receive alerts on assignment grading</span>
                </div>
                <input type="checkbox" checked style="width: 18px; height: 18px;" />
              </div>

              <div style="padding-top: 0.5rem;">
                <button class="btn btn-outline btn-sm" style="color: #ef4444;" onclick="LMS_App.resetDemoData()">
                  <i class="fa-solid fa-arrows-rotate"></i> Reset All System Demo Data
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    saveUserProfile(e) {
      e.preventDefault();
      const name = document.getElementById('profName').value.trim();
      const email = document.getElementById('profEmail').value.trim();
      const dept = document.getElementById('profDept').value.trim();
      const sem = document.getElementById('profSem').value.trim();

      this.currentUser.name = name;
      this.currentUser.email = email;
      this.currentUser.department = dept;
      this.currentUser.semester = sem;

      const users = getData(STORAGE_KEYS.USERS, []);
      const idx = users.findIndex(u => u.id === this.currentUser.id);
      if (idx !== -1) {
        users[idx] = this.currentUser;
        saveData(STORAGE_KEYS.USERS, users);
      }
      saveData(STORAGE_KEYS.CURRENT_USER, this.currentUser);

      this.updateAuthUI();
      this.showToast('Profile updated successfully!', 'success');
      this.navigateRoleDashboard();
    },

    // =========================================================================
    // UTILITIES, MODALS, NOTIFICATIONS & TOASTS
    // =========================================================================
    openConfirmModal(title, message, onConfirm) {
      const modal = document.getElementById('confirmModal');
      document.getElementById('confirmModalTitle').textContent = title;
      document.getElementById('confirmModalMessage').textContent = message;

      const actionBtn = document.getElementById('confirmModalActionBtn');
      actionBtn.onclick = () => {
        this.closeModal('confirmModal');
        if (typeof onConfirm === 'function') onConfirm();
      };

      modal.classList.add('active');
    },

    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    },

    showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;

      let iconClass = 'fa-circle-info';
      if (type === 'success') iconClass = 'fa-circle-check';
      if (type === 'error') iconClass = 'fa-triangle-exclamation';
      if (type === 'warning') iconClass = 'fa-circle-exclamation';

      toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
        <div class="toast-msg">${message}</div>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 200);
      }, 3500);
    },

    createNotification(userId, title, message, icon) {
      const notifs = getData(STORAGE_KEYS.NOTIFICATIONS, []);
      notifs.unshift({
        id: `ntf_${Date.now()}`,
        userId: userId,
        title: title,
        message: message,
        time: 'Just now',
        read: false,
        icon: icon || 'fa-bell'
      });
      saveData(STORAGE_KEYS.NOTIFICATIONS, notifs);
      this.updateNotificationsBadge();
    },

    resetDemoData() {
      if (confirm('Are you sure you want to clear and re-initialize all LocalStorage demo data to university defaults?')) {
        localStorage.clear();
        initDefaultData();
        this.currentUser = getData(STORAGE_KEYS.USERS).find(u => u.email === 'student@lms.com');
        saveData(STORAGE_KEYS.CURRENT_USER, this.currentUser);
        this.updateAuthUI();
        this.navigate('landing');
        this.showToast('All demo data re-initialized successfully!', 'success');
      }
    },

    capitalize(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  };

  // Expose to window for inline onclick attributes
  window.LMS_App = LMS_App;

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    LMS_App.init();
  });
})();
