// Hospitality Terminology Learning App

class HospitalityApp {
    constructor() {
        this.vocabularyData = {
            "basic": [],
            "intermediate": [],
            "advanced": []
        };
        this.topicsData = {}; // Store vocabulary organized by topics
        this.csvData = [];
        this.searchResults = [];
        this.quizMistakes = [];
        this.notifications = [];
        
        // Social Learning Data
        this.discussions = [];
        this.leaderboard = {
            daily: [],
            weekly: [],
            monthly: []
        };
        
        // Enhanced gamification data
        this.challenges = {
            weekly: null,
            progress: {},
            rewards: {}
        };
        
        // Enhanced learning system
        this.userProfile = {
            currentLevel: 'basic',
            experience: 0,
            totalPoints: 0,
            badges: [],
            streak: 0,
            lastActiveDate: new Date().toDateString(),
            learningPath: 'reception', // reception, housekeeping, restaurant, food-safety
            completedModules: [],
            currentModule: null,
            learningGoals: [],
            // Enhanced personalized learning data
            recommendedLessons: [],
            reviewSchedule: [],
            weakAreas: [],
            studyBuddies: [],
            mentorId: null,
            performanceHistory: {
                quizScores: {},
                scenarioScores: {},
                lessonTimeSpent: {},
                lastPerformanceUpdate: null
            }
        };
        
        // Current lesson context for navigation
        this.currentLessonContext = {
            moduleId: null,
            level: null
        };
        
        this.gamification = {
            points: {
                lessonComplete: 10,
                quizCorrect: 5,
                streakBonus: 5,
                badgeEarned: 25,
                moduleComplete: 50
            },
            badges: {
                'first-lesson': { name: 'Bắt đầu hành trình', description: 'Hoàn thành bài học đầu tiên', icon: '🎯' },
                'streak-7': { name: 'Kiên trì', description: 'Học liên tục 7 ngày', icon: '🔥' },
                'quiz-master': { name: 'Bậc thầy quiz', description: 'Đạt 100% điểm quiz', icon: '🧠' },
                'vocabulary-expert': { name: 'Chuyên gia từ vựng', description: 'Học 100 thuật ngữ', icon: '📚' },
                'scenario-solver': { name: 'Giải quyết tình huống', description: 'Hoàn thành 10 tình huống', icon: '🎭' },
                // New enhanced badges
                'front-desk-master': { name: 'Bậc thầy Lễ tân', description: 'Hoàn thành tất cả bài học lễ tân', icon: '🏨' },
                'fb-pro': { name: 'Chuyên gia F&B', description: 'Thành thạo tất cả kỹ năng ẩm thực', icon: '🍽️' },
                'housekeeping-expert': { name: 'Chuyên gia Buồng phòng', description: 'Hoàn thành module buồng phòng nâng cao', icon: '🧹' },
                'management-leader': { name: 'Lãnh đạo Quản lý', description: 'Hoàn thành tất cả bài học quản lý', icon: '👑' },
                'milestone-50': { name: '50 Bài học', description: 'Hoàn thành 50 bài học', icon: '🎖️' },
                'milestone-100': { name: '100 Thuật ngữ', description: 'Học thuộc 100 thuật ngữ', icon: '💯' },
                'milestone-1000': { name: '1000 XP', description: 'Đạt được 1000 điểm kinh nghiệm', icon: '⭐' },
                'helpful-mentor': { name: 'Mentor Hữu ích', description: 'Giúp đỡ 10 học viên khác', icon: '🤝' },
                'discussion-star': { name: 'Ngôi sao Thảo luận', description: 'Đóng góp 20 bài thảo luận', icon: '💬' },
                'streak-14': { name: 'Kiên định', description: 'Học liên tục 14 ngày', icon: '🔥' },
                'streak-30': { name: 'Bất khuất', description: 'Học liên tục 30 ngày', icon: '💪' },
                'streak-60': { name: 'Bất diệt', description: 'Học liên tục 60 ngày', icon: '🏆' },
                'speed-demon': { name: 'Tốc độ', description: 'Hoàn thành quiz trong thời gian kỷ lục', icon: '⚡' },
                'perfect-week': { name: 'Tuần Hoàn hảo', description: 'Hoàn thành thử thách tuần', icon: '🌟' }
            },
            leaderboards: {
                daily: [],
                weekly: [],
                monthly: []
            }
        };
        
        this.microlearningModules = {
            'comprehensive': [
                {
                    id: 'reception-comprehensive',
                    title: 'Nghiệp vụ Lễ tân',
                    duration: 30,
                    description: 'Module tổng hợp toàn diện về nghiệp vụ lễ tân khách sạn, từ cơ bản đến nâng cao',
                    lessons: [
                        // Cơ bản
                        { id: 'check-in-process', title: 'Quy trình check-in cơ bản', duration: 3, type: 'video', level: 'basic' },
                        { id: 'reservation-handling', title: 'Xử lý đặt phòng', duration: 2, type: 'interactive', level: 'basic' },
                        { id: 'guest-communication', title: 'Giao tiếp với khách', duration: 3, type: 'scenario', level: 'basic' },
                        { id: 'brand-standards', title: 'Tiêu chuẩn thương hiệu', duration: 2, type: 'video', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'complaint-handling', title: 'Xử lý khiếu nại', duration: 4, type: 'vr-simulation', level: 'intermediate' },
                        { id: 'overbooking-recovery', title: 'Xử lý overbooking', duration: 3, type: 'scenario', level: 'intermediate' },
                        { id: 'upselling-techniques', title: 'Kỹ thuật upselling', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'guest-relations', title: 'Quan hệ khách hàng', duration: 3, type: 'video', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'vip-management', title: 'Quản lý khách VIP', duration: 4, type: 'vr-simulation', level: 'advanced' },
                        { id: 'revenue-management', title: 'Quản lý doanh thu', duration: 4, type: 'interactive', level: 'advanced' },
                        { id: 'crisis-management', title: 'Quản lý khủng hoảng', duration: 4, type: 'scenario', level: 'advanced' }
                    ]
                },
                {
                    id: 'housekeeping-comprehensive',
                    title: 'Nghiệp vụ Buồng phòng',
                    duration: 25,
                    description: 'Module tổng hợp về quản lý buồng phòng, từ vệ sinh cơ bản đến quản lý chất lượng nâng cao',
                    lessons: [
                        // Cơ bản
                        { id: 'room-cleaning', title: 'Vệ sinh phòng nghỉ cơ bản', duration: 3, type: 'video', level: 'basic' },
                        { id: 'linen-management', title: 'Quản lý ga gối', duration: 2, type: 'interactive', level: 'basic' },
                        { id: 'maintenance-reporting', title: 'Báo cáo sửa chữa', duration: 1, type: 'simulation', level: 'basic' },
                        { id: 'safety-procedures', title: 'Quy trình an toàn', duration: 2, type: 'video', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'deep-cleaning', title: 'Vệ sinh sâu', duration: 4, type: 'video', level: 'intermediate' },
                        { id: 'inventory-management', title: 'Quản lý tồn kho', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'guest-requests', title: 'Xử lý yêu cầu khách', duration: 2, type: 'scenario', level: 'intermediate' },
                        { id: 'quality-inspection', title: 'Kiểm tra chất lượng', duration: 3, type: 'interactive', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'quality-control', title: 'Kiểm soát chất lượng nâng cao', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'staff-scheduling', title: 'Lập lịch nhân viên', duration: 3, type: 'interactive', level: 'advanced' },
                        { id: 'sustainability', title: 'Thực hành bền vững', duration: 3, type: 'simulation', level: 'advanced' }
                    ]
                },
                {
                    id: 'food-beverage-comprehensive',
                    title: 'Nghiệp vụ Ẩm thực',
                    duration: 35,
                    description: 'Module tổng hợp về dịch vụ F&B, từ phục vụ cơ bản đến quản lý nhà hàng cao cấp',
                    lessons: [
                        // Cơ bản
                        { id: 'basic-service', title: 'Phục vụ cơ bản', duration: 3, type: 'video', level: 'basic' },
                        { id: 'table-setting', title: 'Kỹ năng đặt bàn', duration: 2, type: 'interactive', level: 'basic' },
                        { id: 'menu-knowledge', title: 'Hiểu biết thực đơn', duration: 3, type: 'video', level: 'basic' },
                        { id: 'order-taking', title: 'Ghi nhận đơn hàng', duration: 2, type: 'scenario', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'wine-service', title: 'Dịch vụ rượu vang', duration: 4, type: 'video', level: 'intermediate' },
                        { id: 'upselling-techniques', title: 'Kỹ thuật upselling', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'complaint-handling', title: 'Xử lý khiếu nại', duration: 3, type: 'scenario', level: 'intermediate' },
                        { id: 'special-dietary', title: 'Yêu cầu ăn uống đặc biệt', duration: 3, type: 'video', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'fine-dining-service', title: 'Dịch vụ fine dining', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'sommelier-skills', title: 'Kỹ năng sommelier', duration: 4, type: 'interactive', level: 'advanced' },
                        { id: 'restaurant-management', title: 'Quản lý nhà hàng', duration: 4, type: 'simulation', level: 'advanced' }
                    ]
                },
                {
                    id: 'trends-2025',
                    title: 'Xu hướng 2025',
                    duration: 25,
                    description: 'Module tổng hợp về 3 xu hướng chính: Tech-driven Service, Wellness & Bleisure, Sustainability',
                    lessons: [
                        // Tech-driven Service
                        { id: 'tech-mobile-checkin', title: 'Mobile Check-in & Digital Keys', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'ai-concierge', title: 'AI Concierge & Smart Services', duration: 3, type: 'interactive', level: 'advanced' },
                        { id: 'tech-integration', title: 'Tích hợp Công nghệ', duration: 3, type: 'scenario', level: 'advanced' },
                        
                        // Wellness & Bleisure
                        { id: 'sleep-wellness', title: 'Sleep Kit & Wellness Programs', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'workation-packages', title: 'Workation Packages', duration: 3, type: 'interactive', level: 'advanced' },
                        { id: 'quiet-zones', title: 'Quiet Zones & Meditation Spaces', duration: 2, type: 'scenario', level: 'advanced' },
                        
                        // Sustainability
                        { id: 'zero-waste', title: 'Zero Waste & Recycling', duration: 3, type: 'video', level: 'advanced' },
                        { id: 'local-sourcing', title: 'Local Sourcing & Farm-to-Table', duration: 3, type: 'interactive', level: 'advanced' },
                        { id: 'green-certifications', title: 'Green Certifications & LEED', duration: 3, type: 'scenario', level: 'advanced' }
                    ]
                },
                {
                    id: 'table-skills-comprehensive',
                    title: 'Kỹ năng Đặt bàn',
                    duration: 20,
                    description: 'Module tổng hợp về kỹ năng đặt bàn và phục vụ bàn ăn chuyên nghiệp',
                    lessons: [
                        // Cơ bản
                        { id: 'basic-table-setting', title: 'Đặt bàn cơ bản', duration: 2, type: 'video', level: 'basic' },
                        { id: 'tableware-knowledge', title: 'Hiểu biết đồ dùng bàn', duration: 2, type: 'interactive', level: 'basic' },
                        { id: 'place-setting', title: 'Bộ đồ ăn cá nhân', duration: 2, type: 'video', level: 'basic' },
                        { id: 'table-manners', title: 'Phép tắc bàn ăn', duration: 2, type: 'video', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'formal-table-setting', title: 'Đặt bàn trang trọng', duration: 3, type: 'video', level: 'intermediate' },
                        { id: 'service-styles', title: 'Phong cách phục vụ', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'special-occasions', title: 'Sự kiện đặc biệt', duration: 3, type: 'scenario', level: 'intermediate' },
                        { id: 'dining-etiquette', title: 'Nghi thức ăn uống', duration: 2, type: 'video', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'banquet-management', title: 'Quản lý tiệc buffet', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'luxury-service', title: 'Dịch vụ cao cấp', duration: 3, type: 'interactive', level: 'advanced' },
                        { id: 'cultural-dining', title: 'Văn hóa ăn uống đa dạng', duration: 3, type: 'simulation', level: 'advanced' }
                    ]
                },
                {
                    id: 'allergies-diet-comprehensive',
                    title: 'Dị ứng & Chế độ ăn',
                    duration: 25,
                    description: 'Module tổng hợp về quản lý dị ứng và các chế độ ăn đặc biệt',
                    lessons: [
                        // Cơ bản
                        { id: 'allergy-awareness', title: 'Nhận thức về dị ứng', duration: 3, type: 'video', level: 'basic' },
                        { id: 'common-allergens', title: 'Chất gây dị ứng thường gặp', duration: 2, type: 'interactive', level: 'basic' },
                        { id: 'cross-contamination', title: 'Nhiễm chéo', duration: 2, type: 'video', level: 'basic' },
                        { id: 'emergency-response', title: 'Xử lý khẩn cấp', duration: 3, type: 'scenario', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'dietary-restrictions', title: 'Hạn chế ăn uống', duration: 3, type: 'video', level: 'intermediate' },
                        { id: 'special-diets', title: 'Chế độ ăn đặc biệt', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'menu-modifications', title: 'Điều chỉnh thực đơn', duration: 3, type: 'scenario', level: 'intermediate' },
                        { id: 'guest-communication', title: 'Giao tiếp với khách', duration: 2, type: 'video', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'nutritional-knowledge', title: 'Kiến thức dinh dưỡng', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'therapeutic-diets', title: 'Chế độ ăn điều trị', duration: 4, type: 'interactive', level: 'advanced' },
                        { id: 'allergy-management', title: 'Quản lý dị ứng toàn diện', duration: 3, type: 'simulation', level: 'advanced' }
                    ]
                },
                {
                    id: 'guest-services-comprehensive',
                    title: 'Dịch vụ Khách hàng',
                    duration: 30,
                    description: 'Module tổng hợp về dịch vụ khách hàng, từ hỗ trợ cơ bản đến quản lý VIP',
                    lessons: [
                        // Cơ bản
                        { id: 'guest-greeting', title: 'Chào đón khách', duration: 2, type: 'video', level: 'basic' },
                        { id: 'information-service', title: 'Dịch vụ thông tin', duration: 3, type: 'interactive', level: 'basic' },
                        { id: 'concierge-basics', title: 'Concierge cơ bản', duration: 3, type: 'video', level: 'basic' },
                        { id: 'local-attractions', title: 'Điểm tham quan địa phương', duration: 2, type: 'interactive', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'transportation-services', title: 'Dịch vụ vận chuyển', duration: 3, type: 'video', level: 'intermediate' },
                        { id: 'tour-booking', title: 'Đặt tour du lịch', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'special-requests', title: 'Yêu cầu đặc biệt', duration: 3, type: 'scenario', level: 'intermediate' },
                        { id: 'business-services', title: 'Dịch vụ doanh nghiệp', duration: 2, type: 'video', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'vip-services', title: 'Dịch vụ VIP', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'luxury-concierge', title: 'Concierge cao cấp', duration: 4, type: 'interactive', level: 'advanced' },
                        { id: 'guest-relations', title: 'Quan hệ khách hàng', duration: 4, type: 'simulation', level: 'advanced' }
                    ]
                },
                {
                    id: 'restaurant-comprehensive',
                    title: 'Nghiệp vụ Nhà hàng',
                    duration: 31,
                    description: 'Module tổng hợp về phục vụ nhà hàng, từ phục vụ cơ bản đến kỹ năng sommelier chuyên nghiệp',
                    lessons: [
                        // Cơ bản
                        { id: 'table-service', title: 'Phục vụ bàn cơ bản', duration: 3, type: 'video', level: 'basic' },
                        { id: 'menu-knowledge', title: 'Kiến thức thực đơn', duration: 2, type: 'interactive', level: 'basic' },
                        { id: 'order-taking', title: 'Ghi nhận đơn hàng', duration: 2, type: 'scenario', level: 'basic' },
                        { id: 'food-safety-basics', title: 'An toàn thực phẩm cơ bản', duration: 2, type: 'video', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'wine-service', title: 'Phục vụ rượu vang', duration: 4, type: 'video', level: 'intermediate' },
                        { id: 'fine-dining-etiquette', title: 'Nghi thức fine dining', duration: 4, type: 'interactive', level: 'intermediate' },
                        { id: 'upselling-fnb', title: 'Upselling F&B', duration: 3, type: 'scenario', level: 'intermediate' },
                        { id: 'beverage-management', title: 'Quản lý đồ uống', duration: 3, type: 'interactive', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'sommelier-skills', title: 'Kỹ năng sommelier', duration: 5, type: 'vr-simulation', level: 'advanced' },
                        { id: 'menu-engineering', title: 'Thiết kế thực đơn', duration: 4, type: 'interactive', level: 'advanced' },
                        { id: 'service-recovery', title: 'Khôi phục dịch vụ', duration: 4, type: 'scenario', level: 'advanced' },
                        { id: 'restaurant-management', title: 'Quản lý nhà hàng', duration: 3, type: 'simulation', level: 'advanced' }
                    ]
                },
                {
                    id: 'food-safety-comprehensive',
                    title: 'An toàn Thực phẩm',
                    duration: 22,
                    description: 'Module tổng hợp về vệ sinh an toàn thực phẩm, từ nguyên tắc HACCP cơ bản đến triển khai hệ thống nâng cao',
                    lessons: [
                        // Cơ bản
                        { id: 'haccp-principles', title: 'Nguyên tắc HACCP', duration: 2, type: 'video', level: 'basic' },
                        { id: 'hygiene-practices', title: 'Thực hành vệ sinh', duration: 2, type: 'interactive', level: 'basic' },
                        { id: 'temperature-control', title: 'Kiểm soát nhiệt độ', duration: 1, type: 'simulation', level: 'basic' },
                        { id: 'personal-hygiene', title: 'Vệ sinh cá nhân', duration: 2, type: 'video', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'allergen-management', title: 'Quản lý dị ứng', duration: 3, type: 'video', level: 'intermediate' },
                        { id: 'cross-contamination', title: 'Ngăn ngừa nhiễm chéo', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'audit-preparation', title: 'Chuẩn bị kiểm tra', duration: 2, type: 'simulation', level: 'intermediate' },
                        { id: 'documentation', title: 'Tài liệu hóa quy trình', duration: 2, type: 'interactive', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'haccp-implementation', title: 'Triển khai HACCP', duration: 4, type: 'video', level: 'advanced' },
                        { id: 'crisis-management-fs', title: 'Quản lý khủng hoảng ATTP', duration: 3, type: 'interactive', level: 'advanced' },
                        { id: 'training-delivery', title: 'Đào tạo nhân viên', duration: 2, type: 'simulation', level: 'advanced' }
                    ]
                },
                {
                    id: 'management-comprehensive',
                    title: 'Quản lý Khách sạn',
                    duration: 28,
                    description: 'Module tổng hợp về quản lý khách sạn, từ kỹ năng lãnh đạo cơ bản đến chiến lược kinh doanh nâng cao',
                    lessons: [
                        // Cơ bản
                        { id: 'leadership-basics', title: 'Kỹ năng lãnh đạo cơ bản', duration: 3, type: 'video', level: 'basic' },
                        { id: 'team-management', title: 'Quản lý nhóm', duration: 3, type: 'interactive', level: 'basic' },
                        { id: 'customer-service', title: 'Dịch vụ khách hàng', duration: 2, type: 'scenario', level: 'basic' },
                        { id: 'communication-skills', title: 'Kỹ năng giao tiếp', duration: 2, type: 'video', level: 'basic' },
                        
                        // Trung cấp
                        { id: 'financial-management', title: 'Quản lý tài chính', duration: 4, type: 'interactive', level: 'intermediate' },
                        { id: 'marketing-strategies', title: 'Chiến lược marketing', duration: 3, type: 'video', level: 'intermediate' },
                        { id: 'quality-assurance', title: 'Đảm bảo chất lượng', duration: 3, type: 'interactive', level: 'intermediate' },
                        { id: 'staff-training', title: 'Đào tạo nhân viên', duration: 3, type: 'scenario', level: 'intermediate' },
                        
                        // Nâng cao
                        { id: 'strategic-planning', title: 'Lập kế hoạch chiến lược', duration: 4, type: 'interactive', level: 'advanced' },
                        { id: 'crisis-leadership', title: 'Lãnh đạo trong khủng hoảng', duration: 4, type: 'scenario', level: 'advanced' },
                        { id: 'innovation-management', title: 'Quản lý đổi mới', duration: 3, type: 'simulation', level: 'advanced' }
                    ]
                }
            ]
        };

        // Lesson Content Database
        this.lessonContent = {
            // MODULE 1: NGHIỆP VỤ LỄ TÂN
            'check-in-process': {
                objectives: [
                    'Thực hiện quy trình check-in chuẩn mực trong vòng 3 phút',
                    'Sử dụng thành thạo các câu giao tiếp tiếng Anh cơ bản',
                    'Xử lý các giấy tờ và thanh toán chính xác'
                ],
                content: {
                    introduction: 'Quy trình check-in là bước đầu tiên tạo ấn tượng với khách. Quy trình chuẩn gồm 7 bước: Chào đón → Xác nhận đặt phòng → Kiểm tra giấy tờ → Đăng ký → Thanh toán → Trao khóa → Hướng dẫn.',
                    keySteps: [
                        {
                            step: 1,
                            title: 'Chào đón (Welcome)',
                            description: 'Smile, eye contact, greeting',
                            phrases: [
                                'Good morning/afternoon/evening, welcome to [Hotel Name]',
                                'How may I assist you today?'
                            ]
                        },
                        {
                            step: 2,
                            title: 'Xác nhận đặt phòng (Confirm Reservation)',
                            description: 'Verify booking details',
                            phrases: [
                                'May I have your name and reservation number?',
                                'Let me pull up your reservation'
                            ]
                        },
                        {
                            step: 3,
                            title: 'Kiểm tra giấy tờ (ID Verification)',
                            description: 'Check passport/ID and visa if needed',
                            phrases: [
                                'May I see your passport/ID please?',
                                'I\'ll need to make a copy for our records'
                            ]
                        },
                        {
                            step: 4,
                            title: 'Đăng ký (Registration)',
                            description: 'Fill registration card, confirm details',
                            phrases: [
                                'Please fill out this registration form',
                                'Could you sign here please?'
                            ]
                        },
                        {
                            step: 5,
                            title: 'Thanh toán (Payment)',
                            description: 'Pre-authorization or payment',
                            phrases: [
                                'How would you like to settle the payment?',
                                'I\'ll need to pre-authorize your card for incidentals'
                            ]
                        },
                        {
                            step: 6,
                            title: 'Trao khóa (Key Delivery)',
                            description: 'Hand over room key and explain',
                            phrases: [
                                'Here are your room keys for room 305',
                                'Your room is on the 3rd floor'
                            ]
                        },
                        {
                            step: 7,
                            title: 'Hướng dẫn (Orientation)',
                            description: 'Brief about facilities and services',
                            phrases: [
                                'Breakfast is served from 6:30 to 10:00 AM',
                                'If you need anything, please dial 0 for the front desk'
                            ]
                        }
                    ],
                    commonIssues: [
                        {
                            issue: 'Overbooking',
                            solution: 'Apologize sincerely, offer upgrade or alternative hotel with compensation'
                        },
                        {
                            issue: 'Early arrival',
                            solution: 'Check availability, offer luggage storage and hotel facilities while waiting'
                        },
                        {
                            issue: 'Wrong room type',
                            solution: 'Apologize, offer correct room or upgrade if available'
                        }
                    ],
                    practiceScenario: {
                        situation: 'A guest arrives at 2 PM with a reservation. Their room is ready. Walk through the complete check-in process.',
                        keyPoints: [
                            'Greet warmly with eye contact',
                            'Verify reservation efficiently',
                            'Explain hotel facilities briefly',
                            'Ask if they have any questions',
                            'Wish them a pleasant stay'
                        ]
                    }
                },
                quiz: [
                    {
                        question: 'What is the first step in the check-in process?',
                        options: ['Check documents', 'Greet the guest', 'Take payment', 'Give room key'],
                        correct: 1
                    },
                    {
                        question: 'How long should a standard check-in take?',
                        options: ['1-2 minutes', '3-5 minutes', '10 minutes', '15 minutes'],
                        correct: 1
                    }
                ]
            },
            'reservation-handling': {
                objectives: [
                    'Xử lý đặt phòng qua điện thoại, email và hệ thống trực tuyến',
                    'Hiểu và giải thích các loại phòng và giá',
                    'Xác nhận và sửa đổi đặt phòng chính xác'
                ],
                content: {
                    introduction: 'Reservation handling là kỹ năng quan trọng giúp tối ưu hóa doanh thu và đảm bảo trải nghiệm khách hàng. Bao gồm: Nhận đặt phòng → Xác nhận → Cập nhật → Thay đổi/Hủy.',
                    keySteps: [
                        {
                            step: 1,
                            title: 'Nhận thông tin đặt phòng',
                            description: 'Collect guest information accurately',
                            phrases: [
                                'May I have your name, please? (First name and last name)',
                                'What are your check-in and check-out dates?',
                                'What type of room would you prefer?',
                                'How many guests will be staying?'
                            ],
                            requiredInfo: [
                                'Guest name (as per ID)',
                                'Contact details (phone, email)',
                                'Check-in/out dates',
                                'Room type preference',
                                'Number of guests',
                                'Special requests'
                            ]
                        },
                        {
                            step: 2,
                            title: 'Kiểm tra availability',
                            description: 'Check room availability in PMS',
                            phrases: [
                                'Let me check our availability for those dates',
                                'I have a [room type] available at [rate]',
                                'Would you like me to reserve that for you?'
                            ]
                        },
                        {
                            step: 3,
                            title: 'Giải thích room types & rates',
                            description: 'Describe rooms and pricing clearly',
                            roomTypes: [
                                {
                                    type: 'Standard Room',
                                    description: 'Basic room with essential amenities',
                                    features: 'Queen bed, city view, 25 sqm'
                                },
                                {
                                    type: 'Deluxe Room',
                                    description: 'Enhanced room with better view',
                                    features: 'King bed, partial sea view, 30 sqm, bathtub'
                                },
                                {
                                    type: 'Suite',
                                    description: 'Spacious with separate living area',
                                    features: 'Bedroom + living room, sea view, 50 sqm, premium amenities'
                                }
                            ],
                            rateTerms: [
                                'Room Only - No meals included',
                                'Bed & Breakfast - Breakfast included',
                                'Half Board - Breakfast + Dinner',
                                'Full Board - All meals included',
                                'All-Inclusive - All meals + drinks + activities'
                            ]
                        },
                        {
                            step: 4,
                            title: 'Xác nhận đặt phòng',
                            description: 'Confirm booking and provide confirmation',
                            phrases: [
                                'Let me confirm your reservation',
                                'Your booking reference number is [number]',
                                'I\'ll send a confirmation email to [email]',
                                'Your total comes to [amount] for [nights] nights'
                            ]
                        },
                        {
                            step: 5,
                            title: 'Giải thích policies',
                            description: 'Explain cancellation and payment policies',
                            policies: [
                                'Check-in time: 2:00 PM / Check-out time: 12:00 noon',
                                'Cancellation: Free up to 24 hours before arrival',
                                'Late cancellation fee: One night charge',
                                'No-show: Full stay charge',
                                'Payment: Credit card guarantee required'
                            ]
                        }
                    ],
                    modificationTypes: [
                        {
                            type: 'Date change',
                            process: 'Check new availability → Adjust rate if different → Update booking → Send new confirmation'
                        },
                        {
                            type: 'Room type change',
                            process: 'Check availability → Calculate rate difference → Update booking → Confirm changes'
                        },
                        {
                            type: 'Add services',
                            process: 'Note special requests → Update booking → Confirm additional charges if any'
                        },
                        {
                            type: 'Cancellation',
                            process: 'Check policy → Calculate fees → Process cancellation → Send cancellation confirmation'
                        }
                    ],
                    practiceScenario: {
                        situation: 'A guest calls to book a room for 3 nights starting next Friday. They want a sea view room and will arrive late at night.',
                        keyPoints: [
                            'Ask all required information',
                            'Check availability',
                            'Explain room options and rates',
                            'Note late arrival in system',
                            'Explain guarantee/payment policy',
                            'Provide confirmation number',
                            'Offer to send email confirmation'
                        ]
                    }
                },
                quiz: [
                    {
                        question: 'What information is essential when taking a reservation?',
                        options: [
                            'Only name and dates',
                            'Name, dates, room type, contact info',
                            'Just credit card details',
                            'Only special requests'
                        ],
                        correct: 1
                    },
                    {
                        question: 'What does "Room Only" rate mean?',
                        options: [
                            'Includes breakfast',
                            'Includes all meals',
                            'No meals included',
                            'Includes lunch only'
                        ],
                        correct: 2
                    }
                ]
            },
            'guest-communication': {
                objectives: [
                    'Giao tiếp hiệu quả với khách từ nhiều quốc gia',
                    'Xử lý yêu cầu và thắc mắc một cách chuyên nghiệp',
                    'Sử dụng ngôn ngữ cơ thể và giọng điệu phù hợp'
                ],
                content: {
                    introduction: 'Effective communication là nền tảng của dịch vụ khách sạn xuất sắc. Bao gồm verbal, non-verbal communication và active listening.',
                    keyPrinciples: [
                        {
                            principle: 'Active Listening',
                            description: 'Listen to understand, not just to respond',
                            tips: [
                                'Maintain eye contact',
                                'Nod to show understanding',
                                'Don\'t interrupt',
                                'Paraphrase to confirm: "So you need..."',
                                'Ask clarifying questions'
                            ]
                        },
                        {
                            principle: 'Clear Speaking',
                            description: 'Speak clearly and at appropriate pace',
                            tips: [
                                'Use simple English for non-native speakers',
                                'Avoid slang and idioms',
                                'Speak at moderate pace',
                                'Enunciate clearly',
                                'Adjust volume to environment'
                            ]
                        },
                        {
                            principle: 'Positive Language',
                            description: 'Frame responses positively',
                            examples: [
                                {
                                    negative: '"We don\'t have that"',
                                    positive: '"I can offer you this alternative..."'
                                },
                                {
                                    negative: '"You have to wait"',
                                    positive: '"Your room will be ready in 30 minutes"'
                                },
                                {
                                    negative: '"That\'s not my department"',
                                    positive: '"Let me connect you with the right person who can help"'
                                }
                            ]
                        },
                        {
                            principle: 'Professional Body Language',
                            description: 'Non-verbal communication matters',
                            dos: [
                                'Smile genuinely',
                                'Stand/sit with good posture',
                                'Use open gestures',
                                'Maintain appropriate eye contact',
                                'Face the guest when speaking'
                            ],
                            donts: [
                                'Cross arms',
                                'Look at phone/computer while guest speaking',
                                'Show impatience',
                                'Point fingers',
                                'Turn your back'
                            ]
                        }
                    ],
                    commonSituations: [
                        {
                            situation: 'Guest complains about room',
                            approach: 'LAST method',
                            steps: [
                                'Listen - Let guest express concern fully',
                                'Apologize - "I apologize for the inconvenience"',
                                'Solve - Offer solution: "I can move you to another room immediately"',
                                'Thank - "Thank you for bringing this to our attention"'
                            ]
                        },
                        {
                            situation: 'Guest requests information',
                            approach: 'Provide accurate, helpful information',
                            steps: [
                                'Listen to the question carefully',
                                'Provide clear, complete answer',
                                'Offer additional relevant information',
                                'Ask if they need anything else'
                            ]
                        },
                        {
                            situation: 'Language barrier',
                            approach: 'Adjust communication style',
                            steps: [
                                'Speak slowly and clearly',
                                'Use simple vocabulary',
                                'Use visual aids if helpful',
                                'Be patient and smile',
                                'Use translation app if needed'
                            ]
                        },
                        {
                            situation: 'Difficult guest',
                            approach: 'Stay calm and professional',
                            steps: [
                                'Remain calm and courteous',
                                'Listen without becoming defensive',
                                'Show empathy: "I understand your frustration"',
                                'Focus on solution',
                                'Escalate to supervisor if needed'
                            ]
                        }
                    ],
                    culturalConsiderations: [
                        {
                            culture: 'Asian guests',
                            tips: [
                                'Avoid overly direct communication',
                                'Show respect for hierarchy',
                                'Be mindful of personal space',
                                'Written communication may be preferred'
                            ]
                        },
                        {
                            culture: 'Western guests',
                            tips: [
                                'Direct communication is appreciated',
                                'Friendly, casual approach acceptable',
                                'Efficiency valued',
                                'Personal space expected'
                            ]
                        },
                        {
                            culture: 'Middle Eastern guests',
                            tips: [
                                'Same-gender interaction may be preferred',
                                'Show respect and formality',
                                'Hospitality highly valued',
                                'Family privacy important'
                            ]
                        }
                    ],
                    keyPhrases: [
                        {
                            category: 'Greeting',
                            phrases: [
                                'Good morning/afternoon/evening',
                                'Welcome to [Hotel Name]',
                                'How may I assist you today?',
                                'It\'s a pleasure to have you here'
                            ]
                        },
                        {
                            category: 'Understanding',
                            phrases: [
                                'I understand your concern',
                                'Let me make sure I understand correctly...',
                                'So you\'re saying that...',
                                'Could you please clarify...?'
                            ]
                        },
                        {
                            category: 'Assisting',
                            phrases: [
                                'I\'ll be happy to help you with that',
                                'Let me check that for you',
                                'I can certainly arrange that',
                                'Allow me to assist you'
                            ]
                        },
                        {
                            category: 'Apologizing',
                            phrases: [
                                'I sincerely apologize for the inconvenience',
                                'I\'m very sorry about that',
                                'Please accept my apologies',
                                'We apologize for any confusion'
                            ]
                        },
                        {
                            category: 'Closing',
                            phrases: [
                                'Is there anything else I can help you with?',
                                'Please don\'t hesitate to contact us if you need anything',
                                'Enjoy your stay',
                                'Thank you for choosing [Hotel Name]'
                            ]
                        }
                    ]
                },
                scenarios: [
                    {
                        title: 'Scenario 1: Confused Guest',
                        situation: 'A guest approaches the desk looking confused. They are holding a map and seem lost.',
                        yourResponse: [
                            'Approach with smile: "Good afternoon! How may I help you?"',
                            'Listen to their question',
                            'Provide clear directions with landmarks',
                            'Offer to mark on their map',
                            'Ask if they need any other information'
                        ]
                    },
                    {
                        title: 'Scenario 2: Angry Guest',
                        situation: 'A guest is visibly upset about noise in their room last night.',
                        yourResponse: [
                            'Let them speak without interrupting',
                            'Apologize sincerely: "I sincerely apologize for disturbing your rest"',
                            'Show empathy: "I understand how important a good night\'s sleep is"',
                            'Offer solution: "I\'d like to move you to a quieter room" or "I can offer a discount"',
                            'Follow up: "I\'ll personally ensure this doesn\'t happen again"'
                        ]
                    }
                ],
                quiz: [
                    {
                        question: 'What is the LAST method for handling complaints?',
                        options: [
                            'Look, Act, Speak, Thank',
                            'Listen, Apologize, Solve, Thank',
                            'Learn, Acknowledge, Solve, Talk',
                            'List, Analyze, Solve, Track'
                        ],
                        correct: 1
                    },
                    {
                        question: 'Which is an example of positive language?',
                        options: [
                            '"We don\'t have that available"',
                            '"You have to come back later"',
                            '"I can offer you this alternative"',
                            '"That\'s impossible"'
                        ],
                        correct: 2
                    }
                ]
            },
                'brand-standards': {
                objectives: ['Hiểu rõ tiêu chuẩn thương hiệu khách sạn', 'Áp dụng dress code và grooming standards', 'Duy trì service standards trong mọi tương tác'],
                content: {
                    introduction: 'Brand standards là nền tảng tạo nên danh tiếng và sự nhất quán trong dịch vụ khách sạn.',
                    keyAreas: [
                        { area: 'Appearance Standards', items: ['Uniform clean and pressed', 'Name tag visible', 'Neat grooming', 'Minimal jewelry', 'Closed-toe shoes'] },
                        { area: 'Service Standards', items: ['3-meter greeting rule', '10-5 rule (acknowledge at 10 feet, greet at 5 feet)', 'HEART service (Hear, Empathize, Apologize, Resolve, Thank)', 'Last impression: end with smile'] },
                        { area: 'Communication Standards', items: ['Always use guest name', 'Avoid saying "No"', 'Use positive language', 'Follow-up on requests'] }
                    ]
                },
                quiz: [{ question: 'What is the 10-5 rule?', options: ['Acknowledge at 10 feet, greet at 5 feet', 'Work 10 hours, break 5', '10 guests max, 5 min wait', 'None'], correct: 0 }]
            },
            'complaint-handling': {
                objectives: ['Xử lý khiếu nại hiệu quả theo phương pháp LAST', 'Biến tình huống tiêu cực thành cơ hội', 'Ngăn ngừa leo thang vấn đề'],
                content: {
                    introduction: 'Complaint handling là cơ hội để chuyển khách không hài lòng thành khách trung thành.',
                    framework: 'LAST: Listen - Apologize - Solve - Thank',
                    steps: [
                        { step: 'Listen', description: 'Let guest vent, don\'t interrupt, show empathy with body language' },
                        { step: 'Apologize', description: 'Sincere apology: "I sincerely apologize for..."' },
                        { step: 'Solve', description: 'Offer solution immediately, empower frontline to compensate up to reasonable limit' },
                        { step: 'Thank', description: 'Thank for feedback: "Thank you for bringing this to our attention"' }
                    ],
                    commonComplaints: [
                        { complaint: 'Room not clean', solution: 'Immediate re-clean or room change, offer amenity compensation' },
                        { complaint: 'Noise disturbance', solution: 'Move to quieter room, offer late checkout or discount' },
                        { complaint: 'Staff rudeness', solution: 'Sincere apology from manager, service recovery gesture' }
                    ],
                    phrases: ['I understand your frustration', 'Let me make this right for you', 'We value your feedback', 'How can I resolve this to your satisfaction?']
                },
                scenarios: [
                    { title: 'VR Scenario: Angry Guest', situation: 'Guest found hair in bathroom, very upset', yourMission: 'Use LAST method to resolve', successCriteria: ['Let guest speak fully', 'Sincere apology', 'Immediate solution offered', 'Follow-up promised'] }
                ]
            },
            'overbooking-recovery': {
                objectives: ['Xử lý overbooking chuyên nghiệp', 'Bồi thường hợp lý', 'Giữ chân khách sau sự cố'],
                content: {
                    introduction: 'Overbooking recovery đòi hỏi kỹ năng cao để biến crisis thành loyalty opportunity.',
                    protocol: [
                        { step: 1, action: 'Identify situation early', details: 'Check forecast daily, identify potential overbooking 24-48h in advance' },
                        { step: 2, action: 'Walk guests strategically', details: 'Walk walk-ins first, then lowest-value reservations, never VIPs or repeat guests' },
                        { step: 3, action: 'Compensate generously', details: 'Pay for alternative hotel (same/higher category), transportation, phone calls, meals' },
                        { step: 4, action: 'Recover relationship', details: 'Complimentary upgrade on return, bonus points, manager apology letter' }
                    ],
                    phrases: ['I sincerely apologize, we have an unexpected situation...', 'I\'ve arranged accommodation at [comparable hotel] at our expense', 'We would be honored to welcome you back with a complimentary upgrade', 'Your loyalty means everything to us']
                },
                scenarios: [{ title: 'Handle Overbooking Crisis', situation: 'All rooms full, guest with confirmed reservation arrives', steps: ['Apologize profusely', 'Arrange alternative (equal/better)', 'Cover all costs', 'Offer future incentive', 'Get manager approval'] }]
            },
            'upselling-techniques': {
                objectives: ['Tăng doanh thu thông qua upselling tự nhiên', 'Hiểu tâm lý khách và timing', 'Đạt conversion rate >15%'],
                content: {
                    introduction: 'Upselling là nghệ thuật mang lại giá trị tốt hơn cho khách đồng thời tăng revenue.',
                    goldRules: ['Upsell = Add Value, not just price', 'Ask questions to understand needs', 'Time it right (check-in, not check-out)', 'Use assumptive language'],
                    techniques: [
                        { technique: 'Assumptive Close', example: '"I have a beautiful ocean-view room available for just $40 more, shall I upgrade you?"' },
                        { technique: 'Benefit Focus', example: '"The suite includes a separate living area, perfect for your work meetings"' },
                        { technique: 'Limited Availability', example: '"We have only one suite left for tonight..."' },
                        { technique: 'Package Deal', example: '"With breakfast included, the Deluxe room is actually better value"' }
                    ],
                    upsellOpportunities: [
                        { what: 'Room type', when: 'Check-in', pitch: 'Highlight view, space, amenities', expectedConversion: '15-20%' },
                        { what: 'Late checkout', when: 'During stay', pitch: 'Relax in the morning, no rush', expectedConversion: '30-40%' },
                        { what: 'Spa/Dining', when: 'Check-in/concierge', pitch: 'Complete your experience', expectedConversion: '10-15%' }
                    ]
                },
                quiz: [{ question: 'Best time to upsell room upgrade?', options: ['Check-out', 'During stay', 'Check-in', 'Reservation'], correct: 2 }]
            },
            
            // MODULE 2: NGHIỆP VỤ BUỒNG PHÒNG
            'room-cleaning': {
                objectives: ['Thực hiện quy trình vệ sinh phòng chuẩn trong 30-45 phút', 'Đảm bảo vệ sinh an toàn và chất lượng', 'Sử dụng thiết bị và hóa chất đúng cách'],
                content: {
                    introduction: 'Room cleaning là kỹ năng cốt lõi của housekeeping. Một phòng sạch sẽ = Guest satisfaction + Review tốt.',
                    keySteps: [
                        { step: 1, title: 'Preparation', description: 'Knock and announce: "Housekeeping!", check room status, prepare cart' },
                        { step: 2, title: 'Strip Bed', description: 'Remove all linens, check for lost items, inspect mattress' },
                        { step: 3, title: 'Bathroom Cleaning', description: 'Top to bottom: mirror → sink → toilet → shower → floor' },
                        { step: 4, title: 'Dust & Wipe', description: 'High to low: lights → furniture → baseboards' },
                        { step: 5, title: 'Vacuum', description: 'Systematic pattern, under bed, corners, closet' },
                        { step: 6, title: 'Make Bed', description: 'Hospital corners, pillows fluffed, runner/scarf centered' },
                        { step: 7, title: 'Final Touch', description: 'Replenish amenities, adjust thermostat, final inspection' }
                    ],
                    timeStandards: [
                        { roomType: 'Checkout room (dirty)', time: '30-35 minutes', difficulty: 'High' },
                        { roomType: 'Stay-over room (tidy)', time: '15-20 minutes', difficulty: 'Medium' },
                        { roomType: 'Touch-up (quick refresh)', time: '5-10 minutes', difficulty: 'Low' }
                    ],
                    safetyTips: ['Always wear gloves', 'Ventilate bathroom when using chemicals', 'Never mix cleaning products', 'Report broken items immediately', 'Use caution signs for wet floors']
                },
                quiz: [
                    { question: 'What is the correct cleaning order?', options: ['Bedroom → Bathroom', 'Bathroom → Bedroom', 'Either is fine', 'Depends on room'], correct: 1 },
                    { question: 'Standard checkout room cleaning time?', options: ['15-20 min', '30-35 min', '45-50 min', '60 min'], correct: 1 }
                ]
            },
            'quality-inspection': {
                objectives: ['Thực hiện kiểm tra chất lượng theo 20-point checklist', 'Phát hiện và sửa lỗi trước khi khách nhận phòng', 'Duy trì chuẩn quality > 95%'],
                content: {
                    introduction: 'Quality inspection là bước cuối cùng đảm bảo phòng perfect trước khi guest check-in. "Inspect what you expect."',
                    checklist20Points: [
                        { category: 'Bathroom (5 pts)', items: ['Mirror spotless', 'Toilet clean inside/outside', 'Shower/tub no hair/stains', 'Floor dry and clean', 'Amenities replenished'] },
                        { category: 'Bedroom (6 pts)', items: ['Bed made perfectly', 'Carpet vacuumed', 'Furniture dust-free', 'TV remote clean', 'Curtains drawn properly', 'AC/Heating set correctly'] },
                        { category: 'Amenities (4 pts)', items: ['Towels folded', 'Coffee/tea set complete', 'Minibar stocked', 'Stationery ready'] },
                        { category: 'Safety (3 pts)', items: ['All lights working', 'Safe functional', 'Door lock working'] },
                        { category: 'Final Touch (2 pts)', items: ['No odors', 'Everything in place'] }
                    ],
                    commonDefects: [
                        { defect: 'Hair in bathroom', solution: 'Use flashlight to check corners and drains' },
                        { defect: 'Bed wrinkles', solution: 'Pull sheets tight, smooth with hand' },
                        { defect: 'Dust on surfaces', solution: 'Use damp cloth, check hidden areas' },
                        { defect: 'Stains on carpet', solution: 'Spot clean immediately, report if permanent' }
                    ]
                },
                quiz: [
                    { question: 'How many points in standard quality checklist?', options: ['10 points', '15 points', '20 points', '25 points'], correct: 2 },
                    { question: 'Acceptable quality score?', options: ['> 80%', '> 90%', '> 95%', '100% only'], correct: 2 }
                ]
            },
            
            // MODULE 3: NGHIỆP VỤ ẨM THỰC  
            'basic-service': {
                objectives: ['Phục vụ bàn theo trình tự chuẩn', 'Giao tiếp chuyên nghiệp với khách', 'Xử lý 4-6 bàn đồng thời'],
                content: {
                    introduction: 'F&B service là nghệ thuật kết hợp hospitality + efficiency. Great service = Technical skill + Warm personality.',
                    serviceSequence: [
                        { step: 'Greeting', timing: 'Within 1 minute', action: 'Smile, eye contact, "Good evening, welcome to..."' },
                        { step: 'Seating', timing: 'Immediately', action: 'Pull chair for ladies first, present menus' },
                        { step: 'Water service', timing: 'Within 2 minutes', action: 'Pour from right, glass 3/4 full' },
                        { step: 'Order taking', timing: '3-5 minutes', action: 'Ladies first, note special requests, repeat order' },
                        { step: 'Food service', timing: 'As ready', action: 'Serve from left, "Enjoy your meal"' },
                        { step: 'Check back', timing: '2 minutes after', action: '"Is everything to your satisfaction?"' },
                        { step: 'Clear plates', timing: 'When finished', action: 'Ask permission, clear from right' },
                        { step: 'Dessert/coffee', timing: 'After clearing', action: 'Offer dessert menu' },
                        { step: 'Bill', timing: 'When requested', action: 'Present in folder, thank guest' }
                    ],
                    carryingTechniques: [
                        { technique: 'Tray carrying', tip: 'Balance on shoulder, fingers spread, walk smoothly' },
                        { technique: 'Plate carrying', tip: 'Max 3 plates: thumb on rim, fingers under' },
                        { technique: 'Glass carrying', tip: 'Hold stem only, never touch rim' }
                    ],
                    keyPhrases: [
                        'May I take your order?',
                        'Would you like any appetizers?',
                        'How would you like your steak cooked?',
                        'I\'ll bring that right out for you',
                        'Is there anything else I can get for you?'
                    ]
                },
                quiz: [
                    { question: 'Serve food from which side?', options: ['Left', 'Right', 'Either', 'Depends'], correct: 0 },
                    { question: 'When to check back with guest?', options: ['Immediately', '2 min after serving', '5 min after', 'Never'], correct: 1 }
                ]
            },
            'wine-service': {
                objectives: ['Phục vụ rượu vang theo protocol chuẩn', 'Hiểu cơ bản về wine pairing', 'Present và pour wine chuyên nghiệp'],
                content: {
                    introduction: 'Wine service elevates dining experience. Knowledge + Technique + Confidence = Memorable service.',
                    serviceProtocol: [
                        { step: 1, action: 'Present bottle', description: 'Show label to host, state wine name and vintage' },
                        { step: 2, action: 'Open bottle', description: 'Cut foil, insert corkscrew, remove cork smoothly' },
                        { step: 3, action: 'Pour tasting', description: 'Pour 1oz for host to approve' },
                        { step: 4, action: 'Pour ladies first', description: 'Fill 1/3 glass, host last' },
                        { step: 5, action: 'Twist and lift', description: 'Prevent drips, wipe bottle neck' }
                    ],
                    basicPairing: [
                        { food: 'Red meat, lamb', wine: 'Cabernet, Merlot (full-bodied red)', why: 'Tannins cut through fat' },
                        { food: 'Chicken, pork', wine: 'Chardonnay, Pinot Noir (medium-bodied)', why: 'Balanced flavor' },
                        { food: 'Seafood', wine: 'Sauvignon Blanc, Riesling (crisp white)', why: 'Acidity complements' },
                        { food: 'Spicy food', wine: 'Riesling (off-dry white)', why: 'Sweetness balances heat' },
                        { food: 'Dessert', wine: 'Port, Ice Wine (sweet wine)', why: 'Sweet with sweet' }
                    ],
                    temperatures: [
                        { type: 'Sparkling wine', temp: '40-45°F (4-7°C)', serve: 'Ice bucket' },
                        { type: 'White wine', temp: '45-50°F (7-10°C)', serve: 'Chilled' },
                        { type: 'Red wine', temp: '60-65°F (15-18°C)', serve: 'Room temp' }
                    ]
                },
                quiz: [
                    { question: 'Fill wine glass how much?', options: ['1/2 full', '1/3 full', '3/4 full', 'Full'], correct: 1 },
                    { question: 'Best white wine for seafood?', options: ['Chardonnay', 'Sauvignon Blanc', 'Riesling', 'Any white'], correct: 1 }
                ]
            },
            
            // MODULE 4: KỸ NĂNG ĐẶT BÀN
            'basic-table-setting': {
                objectives: ['Set up formal table setting trong 5 phút', 'Hiểu rõ vị trí và công dụng từng món đồ', 'Maintain table presentation chuẩn'],
                content: {
                    introduction: 'Table setting là nền tảng của fine dining. "First impression starts with the table."',
                    basicCoverSetup: [
                        { item: 'Service plate (charger)', position: 'Center, 1 inch from table edge' },
                        { item: 'Dinner fork', position: 'Left of plate' },
                        { item: 'Salad fork', position: 'Left of dinner fork (outside)' },
                        { item: 'Dinner knife', position: 'Right of plate, blade facing in' },
                        { item: 'Soup spoon', position: 'Right of knife (outside)' },
                        { item: 'Bread plate', position: 'Upper left of forks' },
                        { item: 'Water glass', position: 'Above knife' },
                        { item: 'Wine glass', position: 'Right of water glass' },
                        { item: 'Napkin', position: 'On service plate or left of forks' }
                    ],
                    rememberTrick: 'BMW: Bread (left), Meal (center), Water (right) | Forks LEFT, Knives/Spoons RIGHT',
                    spacing: '24 inches between place settings',
                    qualityChecks: ['All items polished and spotless', 'Silverware aligned', 'Glassware sparkling', 'Napkin folded neatly', 'Table level and stable']
                },
                quiz: [
                    { question: 'Where does bread plate go?', options: ['Upper right', 'Upper left', 'Lower left', 'Center'], correct: 1 },
                    { question: 'Knife blade faces which direction?', options: ['Out', 'In toward plate', 'Either way', 'Depends'], correct: 1 }
                ]
            },
            
            // MODULE 5: DỊ ỨNG & CHẾ ĐỘ ĂN
            'allergy-awareness': {
                objectives: ['Nhận biết 14 allergens chính', 'Xử lý yêu cầu allergy an toàn', 'Phòng ngừa cross-contamination'],
                content: {
                    introduction: 'Allergy awareness = Guest safety = Legal compliance. Một sai lầm có thể gây nguy hiểm tính mạng.',
                    top14Allergens: [
                        { allergen: 'Peanuts', severity: 'High', symptoms: 'Anaphylaxis, hives, breathing difficulty' },
                        { allergen: 'Tree nuts (almonds, walnuts)', severity: 'High', symptoms: 'Similar to peanuts' },
                        { allergen: 'Shellfish', severity: 'High', symptoms: 'Swelling, nausea, anaphylaxis' },
                        { allergen: 'Fish', severity: 'Medium-High', symptoms: 'Hives, respiratory issues' },
                        { allergen: 'Milk', severity: 'Medium', symptoms: 'Digestive issues, hives' },
                        { allergen: 'Eggs', severity: 'Medium', symptoms: 'Skin reactions, digestive issues' },
                        { allergen: 'Wheat/Gluten', severity: 'Medium', symptoms: 'Celiac: severe digestive damage' },
                        { allergen: 'Soy', severity: 'Medium', symptoms: 'Hives, tingling' }
                    ],
                    preventCrossContamination: [
                        'Use separate cutting boards (color-coded)',
                        'Wash hands between preparations',
                        'Clean surfaces thoroughly',
                        'Use separate utensils',
                        'Store allergen-free items separately'
                    ],
                    emergencyResponse: [
                        { step: 1, action: 'Recognize symptoms', signs: 'Hives, swelling, difficulty breathing, dizziness' },
                        { step: 2, action: 'Call emergency', number: '911 or local emergency' },
                        { step: 3, action: 'Use EpiPen if available', how: 'Inject outer thigh, hold 10 seconds' },
                        { step: 4, action: 'Keep guest calm and lying down', position: 'Elevate legs if possible' },
                        { step: 5, action: 'Document incident', info: 'Time, food consumed, symptoms, actions taken' }
                    ]
                },
                quiz: [
                    { question: 'Most severe allergen reaction?', options: ['Hives', 'Anaphylaxis', 'Nausea', 'Headache'], correct: 1 },
                    { question: 'How many major allergens?', options: ['8', '10', '14', '20'], correct: 2 }
                ]
            },
            
            // MODULE 6: DỊCH VỤ KHÁCH HÀNG
            'guest-greeting': {
                objectives: ['Tạo first impression tích cực trong 7 giây đầu', 'Sử dụng body language chuyên nghiệp', 'Personalize greeting theo guest profile'],
                content: {
                    introduction: 'First 7 seconds = Lasting impression. "You never get a second chance to make a first impression."',
                    the7SecondRule: [
                        { second: '0-2', action: 'Eye contact + Smile', why: 'Shows warmth and attention' },
                        { second: '2-4', action: 'Verbal greeting', example: 'Good morning, welcome!' },
                        { second: '4-7', action: 'Personalize', example: 'Welcome back, Mr. Smith!' }
                    ],
                    greetingByTime: [
                        { time: '6AM - 12PM', greeting: 'Good morning', mood: 'Energetic, fresh' },
                        { time: '12PM - 6PM', greeting: 'Good afternoon', mood: 'Professional, courteous' },
                        { time: '6PM - 12AM', greeting: 'Good evening', mood: 'Warm, relaxing' }
                    ],
                    vipGreeting: [
                        'Research guest profile beforehand',
                        'Use name + title (Mr./Mrs./Dr.)',
                        'Reference previous stay if repeat guest',
                        'Offer personalized service immediately',
                        'Assign dedicated staff member'
                    ],
                    bodyLanguageChecklist: ['Maintain eye contact', 'Smile genuinely', 'Stand up straight', 'Open posture (no crossed arms)', 'Appropriate personal space (2-3 feet)', 'Nod to show understanding']
                },
                quiz: [
                    { question: 'First impression forms in how many seconds?', options: ['3 seconds', '7 seconds', '10 seconds', '30 seconds'], correct: 1 },
                    { question: 'Appropriate personal space?', options: ['0-1 feet', '2-3 feet', '5-6 feet', 'No limit'], correct: 1 }
                ]
            },
            
            // MODULE 7: NGHIỆP VỤ NHÀ HÀNG
            'table-service': {
                objectives: ['Thực hiện fine dining service standards', 'Phục vụ multi-course meal chính xác', 'Handle 4-6 tables hiệu quả'],
                content: {
                    introduction: 'Fine dining service là đỉnh cao của F&B. Precision + Grace + Timing = Excellence.',
                    serviceStyles: [
                        { style: 'French Service (à la Française)', description: 'Cart-side preparation, theatrical', complexity: 'Very High', setting: '5-star hotels' },
                        { style: 'Russian Service (à la Russe)', description: 'Plated in kitchen, served individually', complexity: 'High', setting: 'Fine dining' },
                        { style: 'English Service (Family Style)', description: 'Platters on table, guests serve themselves', complexity: 'Medium', setting: 'Casual upscale' },
                        { style: 'American Service (Plate Service)', description: 'Fully plated, served from left', complexity: 'Medium', setting: 'Most restaurants' }
                    ],
                    multiCourseSequence: [
                        { course: 1, name: 'Amuse-bouche', timing: 'Immediate', service: 'Small bite, compliments of chef' },
                        { course: 2, name: 'Appetizer', timing: '5-10 min', service: 'From left, ladies first' },
                        { course: 3, name: 'Soup', timing: '5 min after', service: 'From right, check seasoning' },
                        { course: 4, name: 'Salad', timing: '5 min after', service: 'Clean fork provided' },
                        { course: 5, name: 'Main course', timing: '10-15 min after', service: 'Ensure proper temperature' },
                        { course: 6, name: 'Cheese course (optional)', timing: 'After main', service: 'Pair with wine' },
                        { course: 7, name: 'Dessert', timing: '10 min after', service: 'Clear table completely first' },
                        { course: 8, name: 'Coffee/Tea', timing: 'With dessert', service: 'Offer digestif' }
                    ],
                    tableSideManner: ['Approach from left for food', 'Clear from right', 'Pour beverages from right', 'Never reach across guest', 'Use tray for carrying 3+ items', 'Always say "Excuse me" if interrupting']
                },
                quiz: [
                    { question: 'Most formal service style?', options: ['American', 'English', 'French', 'Russian'], correct: 2 },
                    { question: 'Serve food from which side?', options: ['Left', 'Right', 'Either', 'Behind'], correct: 0 }
                ]
            },
            
            // MODULE 8: AN TOÀN THỰC PHẨM
            'haccp-principles': {
                objectives: ['Hiểu và áp dụng 7 nguyên tắc HACCP', 'Xác định critical control points', 'Maintain food safety records'],
                content: {
                    introduction: 'HACCP = Hazard Analysis Critical Control Points. Hệ thống quản lý an toàn thực phẩm quốc tế.',
                    sevenPrinciples: [
                        { principle: 1, name: 'Conduct Hazard Analysis', action: 'Identify potential biological, chemical, physical hazards' },
                        { principle: 2, name: 'Determine CCPs', action: 'Critical Control Points where hazards can be controlled' },
                        { principle: 3, name: 'Establish Critical Limits', action: 'Max/min values (temp, time, pH) for safety' },
                        { principle: 4, name: 'Monitor CCPs', action: 'Regular checks and documentation' },
                        { principle: 5, name: 'Corrective Actions', action: 'Predetermined steps when limits exceeded' },
                        { principle: 6, name: 'Verification', action: 'Test that HACCP system works' },
                        { principle: 7, name: 'Record Keeping', action: 'Document all monitoring and actions' }
                    ],
                    criticalTemperatures: [
                        { zone: 'Danger Zone', temp: '40°F - 140°F (4°C - 60°C)', rule: 'Bacteria multiply rapidly' },
                        { zone: 'Cold Storage', temp: '< 40°F (< 4°C)', food: 'Refrigerated items' },
                        { zone: 'Freezer', temp: '0°F (-18°C)', food: 'Frozen items' },
                        { zone: 'Hot Holding', temp: '> 140°F (> 60°C)', food: 'Cooked food' },
                        { zone: 'Cooking - Poultry', temp: '165°F (74°C)', time: 'Internal temp' },
                        { zone: 'Cooking - Ground Meat', temp: '160°F (71°C)', time: 'Internal temp' },
                        { zone: 'Cooking - Whole Meat', temp: '145°F (63°C)', time: 'Internal temp + 3 min rest' }
                    ],
                    personalHygiene: ['Wash hands 20 seconds with soap', 'No jewelry except plain wedding band', 'Hair tied back and covered', 'Clean uniform daily', 'No nail polish', 'Report illness immediately']
                },
                quiz: [
                    { question: 'How many HACCP principles?', options: ['5', '7', '10', '12'], correct: 1 },
                    { question: 'Danger zone temperature?', options: ['0-40°F', '40-140°F', '140-180°F', '180-212°F'], correct: 1 }
                ]
            },
            
            // MODULE 9: QUẢN LÝ KHÁCH SẠN
            'leadership-basics': {
                objectives: ['Áp dụng 5 leadership styles phù hợp tình huống', 'Motivate team hiệu quả', 'Handle conflicts professionally'],
                content: {
                    introduction: 'Great leaders inspire greatness in others. "Leadership is influence, not authority."',
                    fiveLeadershipStyles: [
                        { style: 'Democratic', when: 'Team decisions, creative tasks', pros: 'High engagement', cons: 'Time-consuming' },
                        { style: 'Autocratic', when: 'Crisis, urgent decisions', pros: 'Fast decisions', cons: 'Low morale' },
                        { style: 'Coaching', when: 'Development, training', pros: 'Skills growth', cons: 'Needs time investment' },
                        { style: 'Delegating', when: 'Experienced team', pros: 'Empowerment', cons: 'Risk if team not ready' },
                        { style: 'Servant', when: 'Culture building', pros: 'High trust', cons: 'Can be seen as weak' }
                    ],
                    motivationTechniques: [
                        { technique: 'Recognition', example: 'Employee of the Month, public praise', impact: 'High' },
                        { technique: 'Growth opportunities', example: 'Training, promotion path', impact: 'Very High' },
                        { technique: 'Fair compensation', example: 'Competitive salary, bonuses', impact: 'High' },
                        { technique: 'Work-life balance', example: 'Flexible scheduling', impact: 'Medium-High' },
                        { technique: 'Team building', example: 'Staff events, activities', impact: 'Medium' }
                    ],
                    conflictResolution: [
                        { step: 1, action: 'Listen to both sides', tip: 'No interruptions, stay neutral' },
                        { step: 2, action: 'Understand root cause', tip: 'Ask "why" questions' },
                        { step: 3, action: 'Find common ground', tip: 'Focus on shared goals' },
                        { step: 4, action: 'Brainstorm solutions together', tip: 'Encourage collaboration' },
                        { step: 5, action: 'Agree on action plan', tip: 'Document and follow up' }
                    ],
                    delegationRules: ['Right task to right person', 'Clear instructions and deadlines', 'Provide necessary resources', 'Allow autonomy', 'Check in but don\'t micromanage', 'Give credit for success']
                },
                quiz: [
                    { question: 'Best leadership style for crisis?', options: ['Democratic', 'Autocratic', 'Coaching', 'Delegating'], correct: 1 },
                    { question: 'Most powerful motivator?', options: ['Money', 'Recognition', 'Growth opportunities', 'Work-life balance'], correct: 2 }
                ]
            },
            'financial-management': {
                objectives: ['Đọc và phân tích P&L statement', 'Tính toán key metrics (RevPAR, ADR, occupancy)', 'Control costs và maximize revenue'],
                content: {
                    introduction: 'Financial literacy = Better decisions. "Revenue is vanity, profit is sanity, cash is reality."',
                    keyMetrics: [
                        { metric: 'ADR (Average Daily Rate)', formula: 'Room Revenue ÷ Rooms Sold', benchmark: 'Compare to market competitors' },
                        { metric: 'Occupancy %', formula: '(Rooms Sold ÷ Available Rooms) × 100', benchmark: '65-75% for healthy hotel' },
                        { metric: 'RevPAR (Revenue Per Available Room)', formula: 'ADR × Occupancy %', benchmark: 'Primary performance indicator' },
                        { metric: 'GOP (Gross Operating Profit)', formula: 'Revenue - Operating Expenses', benchmark: '25-40% of revenue' },
                        { metric: 'Labor Cost %', formula: '(Labor Cost ÷ Revenue) × 100', benchmark: '25-35% depending on service level' }
                    ],
                    costControl: [
                        { area: 'Labor', strategies: ['Optimize scheduling', 'Cross-train staff', 'Use part-time wisely', 'Monitor overtime'] },
                        { area: 'Food Cost', strategies: ['Portion control', 'Reduce waste', 'Negotiate suppliers', 'Menu engineering'] },
                        { area: 'Utilities', strategies: ['Energy-efficient equipment', 'Train staff on conservation', 'Regular maintenance'] },
                        { area: 'Supplies', strategies: ['Bulk purchasing', 'Inventory management', 'Standardize products'] }
                    ],
                    revenueOptimization: ['Dynamic pricing', 'Upselling training', 'Package deals', 'Loyalty programs', 'Direct bookings vs OTAs', 'Ancillary revenue (spa, F&B, activities)']
                },
                quiz: [
                    { question: 'What is RevPAR?', options: ['Total revenue', 'ADR × Occupancy', 'Rooms sold', 'Daily rate'], correct: 1 },
                    { question: 'Ideal labor cost %?', options: ['15-20%', '25-35%', '40-50%', '50-60%'], correct: 1 }
                ]
            },
            
            // TEMPLATE cho các bài còn lại - sẽ render với default template
            getDefaultLessonContent(lessonId, lessonTitle, lessonType) {
                return {
                    objectives: ['Học và thực hành kỹ năng chuyên môn', 'Áp dụng kiến thức vào tình huống thực tế', 'Đạt chuẩn nghề nghiệp quốc tế'],
                    content: {
                        introduction: `Bài học "${lessonTitle}" cung cấp kiến thức và kỹ năng cần thiết cho nghiệp vụ khách sạn chuyên nghiệp.`,
                        keyPoints: [
                            'Hiểu rõ nguyên tắc và quy trình chuẩn',
                            'Thực hành với các tình huống mô phỏng',
                            'Áp dụng best practices từ ngành',
                            'Phát triển kỹ năng giao tiếp chuyên nghiệp'
                        ],
                        practiceActivities: [
                            { activity: 'Video demonstration', description: 'Xem video hướng dẫn từ chuyên gia' },
                            { activity: 'Interactive exercises', description: 'Thực hành với bài tập tương tác' },
                            { activity: 'Role-play scenarios', description: 'Đóng vai trong tình huống thực tế' },
                            { activity: 'Knowledge check', description: 'Kiểm tra kiến thức đã học' }
                        ]
                    },
                    quiz: [
                        { question: `Nguyên tắc quan trọng nhất trong ${lessonTitle} là gì?`, options: ['Tốc độ', 'Chất lượng', 'Cả hai', 'Tùy tình huống'], correct: 2 },
                        { question: 'Khi nào nên xin hỗ trợ từ supervisor?', options: ['Ngay lập tức', 'Sau khi thử tự giải quyết', 'Không bao giờ', 'Khi khách yêu cầu'], correct: 1 }
                    ]
                };
            }
        };

        // Hệ thống tình huống theo danh mục chuyên môn
        this.scenariosByCategory = {
            "Allergies & Diet": [
                {
                    title: "Khách dị ứng gluten",
                    situation: "Khách hàng hỏi về món ăn không chứa gluten và tỏ ra lo lắng về tình trạng dị ứng nghiêm trọng.",
                    options: [
                        "Đảm bảo với khách về quy trình an toàn và gợi ý món phù hợp",
                        "Chỉ gợi ý salad để an toàn nhất",
                        "Hỏi khách mang thuốc chống dị ứng chưa"
                    ],
                    correct: 0,
                    explanation: "Luôn đảm bảo an toàn tuyệt đối, giao tiếp rõ ràng về quy trình và lựa chọn thực phẩm.",
                    level: "basic",
                    keyPhrases: ["gluten-free", "allergy alert", "safe preparation", "cross-contamination"]
                },
                {
                    title: "Khách ăn chay nghiêm ngặt",
                    situation: "Khách hàng theo chế độ ăn chay vegan yêu cầu thực đơn phù hợp và hỏi về nguồn gốc nguyên liệu.",
                    options: [
                        "Giải thích chi tiết các món vegan và nguồn gốc nguyên liệu",
                        "Chỉ gợi ý salad và rau củ",
                        "Hỏi khách có chấp nhận trứng và sữa không"
                    ],
                    correct: 0,
                    explanation: "Hiểu rõ chế độ ăn vegan, cung cấp thông tin đầy đủ và minh bạch về nguyên liệu.",
                    level: "intermediate",
                    keyPhrases: ["vegan options", "plant-based", "animal products", "dairy-free"]
                }
            ],
            "Chuyên môn đồ uống": [
                {
                    title: "Tư vấn rượu vang cho cặp đôi",
                    situation: "Cặp đôi kỷ niệm ngày cưới muốn rượu vang phù hợp với món chính nhưng ngân sách hạn chế.",
                    options: [
                        "Gợi ý rượu vang phù hợp theo ngân sách và món ăn, kèm lời chúc mừng",
                        "Chỉ gợi ý house wine để tiết kiệm",
                        "Gợi ý rượu đắt nhất để tăng doanh thu"
                    ],
                    correct: 0,
                    explanation: "Tư vấn chuyên nghiệp tạo giá trị cho khách hàng, xây dựng mối quan hệ lâu dài.",
                    level: "intermediate",
                    keyPhrases: ["wine pairing", "special occasion", "budget-friendly", "complementary flavors"]
                },
                {
                    title: "Khách hỏi về cocktail signature",
                    situation: "Khách hàng quan tâm đến cocktail đặc trưng của khách sạn và muốn hiểu về thành phần, cách pha chế.",
                    options: [
                        "Giải thích chi tiết về cocktail, thành phần và cách pha chế",
                        "Chỉ đưa menu và để khách tự chọn",
                        "Gợi ý cocktail đắt nhất"
                    ],
                    correct: 0,
                    explanation: "Thể hiện chuyên môn và tạo trải nghiệm giáo dục thú vị cho khách hàng.",
                    level: "advanced",
                    keyPhrases: ["signature cocktail", "mixology", "premium ingredients", "craft technique"]
                }
            ],
            "Dịch vụ khách hàng": [
                {
                    title: "Khách phàn nàn về thời gian chờ",
                    situation: "Khách hàng phàn nàn đã chờ 30 phút mà món ăn chưa được phục vụ, tỏ ra bực bội.",
                    options: [
                        "Xin lỗi chân thành, giải thích lý do và đưa ra giải pháp bù đắp",
                        "Chỉ xin lỗi và hứa món sẽ đến sớm",
                        "Đổ lỗi cho bếp và không chịu trách nhiệm"
                    ],
                    correct: 0,
                    explanation: "Chịu trách nhiệm, giao tiếp tích cực và đưa ra giải pháp cụ thể để khôi phục lòng tin.",
                    level: "basic",
                    keyPhrases: ["sincere apology", "service recovery", "compensation", "customer satisfaction"]
                },
                {
                    title: "Khách yêu cầu thay đổi món",
                    situation: "Khách hàng đã gọi món nhưng muốn thay đổi sau khi nhìn thấy món của bàn bên cạnh.",
                    options: [
                        "Kiểm tra với bếp và thực hiện thay đổi nếu có thể",
                        "Từ chối vì món đã được chuẩn bị",
                        "Đồng ý nhưng tính phí thêm"
                    ],
                    correct: 0,
                    explanation: "Linh hoạt trong phục vụ, ưu tiên trải nghiệm khách hàng trong khả năng cho phép.",
                    level: "intermediate",
                    keyPhrases: ["order modification", "kitchen coordination", "guest preference", "flexibility"]
                }
            ],
            "Kỹ thuật chế biến": [
                {
                    title: "Khách hỏi về cách chế biến món ăn",
                    situation: "Khách hàng quan tâm đến kỹ thuật nấu nướng và muốn hiểu về quy trình chế biến món đặc biệt.",
                    options: [
                        "Giải thích kỹ thuật chế biến một cách hấp dẫn và dễ hiểu",
                        "Chỉ nói món rất ngon và để khách tự thưởng thức",
                        "Từ chối giải thích vì bí quyết của nhà bếp"
                    ],
                    correct: 0,
                    explanation: "Chia sẻ kiến thức tạo giá trị giáo dục và tăng sự hứng thú của khách hàng.",
                    level: "advanced",
                    keyPhrases: ["cooking technique", "preparation method", "culinary expertise", "food knowledge"]
                },
                {
                    title: "Tư vấn độ chín của thịt",
                    situation: "Khách hàng hỏi về các mức độ chín khác nhau của thịt bò và muốn được tư vấn phù hợp.",
                    options: [
                        "Giải thích các mức độ chín và tư vấn theo sở thích cá nhân",
                        "Chỉ gợi ý medium-rare vì phổ biến nhất",
                        "Để khách tự quyết định mà không tư vấn"
                    ],
                    correct: 0,
                    explanation: "Thể hiện chuyên môn về ẩm thực và giúp khách có trải nghiệm ăn uống tốt nhất.",
                    level: "intermediate",
                    keyPhrases: ["meat doneness", "cooking temperature", "personal preference", "culinary advice"]
                }
            ],
            "Marketing & Sales": [
                {
                    title: "Upselling món tráng miệng",
                    situation: "Khách hàng đã ăn xong món chính và có vẻ hài lòng, đây là cơ hội upselling.",
                    options: [
                        "Gợi ý món tráng miệng phù hợp với món vừa ăn và sở thích",
                        "Chỉ hỏi có muốn tráng miệng không",
                        "Gợi ý món đắt nhất để tăng doanh thu"
                    ],
                    correct: 0,
                    explanation: "Upselling hiệu quả dựa trên nhu cầu thực tế và tạo giá trị cho khách hàng.",
                    level: "intermediate",
                    keyPhrases: ["upselling", "dessert recommendation", "complementary flavors", "guest satisfaction"]
                },
                {
                    title: "Cross-selling dịch vụ spa",
                    situation: "Khách hàng là cặp đôi nghỉ dưỡng, đã sử dụng dịch vụ ăn uống và có thể quan tâm đến spa.",
                    options: [
                        "Gợi ý dịch vụ spa phù hợp với lịch trình nghỉ dưỡng của họ",
                        "Không đề cập đến dịch vụ khác",
                        "Chỉ đưa brochure và để khách tự tìm hiểu"
                    ],
                    correct: 0,
                    explanation: "Cross-selling thông minh dựa trên nhu cầu và tình huống cụ thể của khách hàng.",
                    level: "advanced",
                    keyPhrases: ["cross-selling", "spa services", "wellness experience", "romantic getaway"]
                }
            ],
            "Phân loại thực đơn": [
                {
                    title: "Giới thiệu món đặc sản địa phương",
                    situation: "Khách hàng du lịch muốn thử món đặc sản địa phương nhưng chưa biết chọn gì.",
                    options: [
                        "Giới thiệu món đặc sản với câu chuyện văn hóa và hương vị đặc trưng",
                        "Chỉ đưa menu và để khách tự chọn",
                        "Gợi ý món đắt nhất"
                    ],
                    correct: 0,
                    explanation: "Tạo trải nghiệm văn hóa và ẩm thực độc đáo cho khách du lịch.",
                    level: "intermediate",
                    keyPhrases: ["local specialties", "cultural experience", "authentic flavors", "regional cuisine"]
                },
                {
                    title: "Tư vấn thực đơn theo sở thích",
                    situation: "Khách hàng có sở thích ăn cay và muốn được gợi ý món phù hợp.",
                    options: [
                        "Gợi ý các món cay với mức độ khác nhau và phù hợp khẩu vị",
                        "Chỉ gợi ý món cay nhất",
                        "Không chú ý đến sở thích cá nhân"
                    ],
                    correct: 0,
                    explanation: "Cá nhân hóa dịch vụ dựa trên sở thích và tạo trải nghiệm ăn uống phù hợp.",
                    level: "basic",
                    keyPhrases: ["spicy preferences", "personalized service", "taste profile", "customized recommendations"]
                }
            ],
            "Phong cách phục vụ": [
                {
                    title: "Phục vụ khách VIP",
                    situation: "Khách VIP đến nhà hàng và cần được phục vụ theo tiêu chuẩn cao nhất.",
                    options: [
                        "Phục vụ với sự chú ý đặc biệt, gọi tên khách và đảm bảo mọi chi tiết hoàn hảo",
                        "Phục vụ bình thường như các khách khác",
                        "Phục vụ quá mức gây khó chịu"
                    ],
                    correct: 0,
                    explanation: "Cân bằng giữa dịch vụ cao cấp và sự thoải mái tự nhiên cho khách VIP.",
                    level: "advanced",
                    keyPhrases: ["VIP service", "personalized attention", "high standards", "discretion"]
                },
                {
                    title: "Xử lý tình huống khó xử",
                    situation: "Khách hàng yêu cầu phục vụ ngoài giờ và nhà hàng sắp đóng cửa.",
                    options: [
                        "Giải thích tình huống và đề xuất giải pháp thay thế phù hợp",
                        "Từ chối thẳng thừng",
                        "Đồng ý nhưng tỏ thái độ không hài lòng"
                    ],
                    correct: 0,
                    explanation: "Giao tiếp chuyên nghiệp và tìm giải pháp win-win cho cả khách hàng và nhà hàng.",
                    level: "intermediate",
                    keyPhrases: ["closing time", "alternative solutions", "professional communication", "guest relations"]
                }
            ],
            "Quản lý khách sạn": [
                {
                    title: "Xử lý khiếu nại về chất lượng phòng",
                    situation: "Khách hàng phàn nàn về vấn đề kỹ thuật trong phòng và yêu cầu giải quyết ngay lập tức.",
                    options: [
                        "Lắng nghe, ghi nhận và thực hiện giải pháp khắc phục ngay lập tức",
                        "Hứa sẽ xử lý sau và tiếp tục công việc khác",
                        "Giải thích đây là vấn đề bình thường và không cần thiết"
                    ],
                    correct: 0,
                    explanation: "Ưu tiên giải quyết vấn đề khách hàng với thái độ chuyên nghiệp và hiệu quả.",
                    level: "advanced",
                    keyPhrases: ["complaint resolution", "immediate action", "guest satisfaction", "service recovery"]
                },
                {
                    title: "Quản lý tình huống overbooking",
                    situation: "Khách sạn bị overbooking và có khách hàng với booking xác nhận không có phòng.",
                    options: [
                        "Xin lỗi chân thành và sắp xếp chỗ ở thay thế tốt hơn với chi phí khách sạn",
                        "Chỉ xin lỗi và đề nghị khách tìm chỗ khác",
                        "Đổ lỗi cho hệ thống đặt phòng"
                    ],
                    correct: 0,
                    explanation: "Xử lý khủng hoảng với trách nhiệm cao và đảm bảo trải nghiệm khách hàng không bị ảnh hưởng.",
                    level: "advanced",
                    keyPhrases: ["overbooking", "crisis management", "guest compensation", "reputation management"]
                }
            ],
            "Table Skills": [
                {
                    title: "Xử lý đặt bàn trùng lặp",
                    situation: "Hai khách hàng đều khẳng định đã đặt cùng một bàn vào cùng thời gian.",
                    options: [
                        "Kiểm tra hệ thống đặt bàn và tìm giải pháp thay thế phù hợp cho một trong hai",
                        "Để khách tự giải quyết với nhau",
                        "Ưu tiên khách nào đến trước"
                    ],
                    correct: 0,
                    explanation: "Xử lý lỗi hệ thống một cách chuyên nghiệp và đảm bảo cả hai khách đều hài lòng.",
                    level: "intermediate",
                    keyPhrases: ["double booking", "system error", "alternative seating", "guest satisfaction"]
                },
                {
                    title: "Thay đổi đặt bàn vào phút cuối",
                    situation: "Khách hàng gọi điện yêu cầu thay đổi từ bàn 2 người thành bàn 6 người trong 30 phút nữa.",
                    options: [
                        "Kiểm tra khả năng và sắp xếp lại nếu có thể, thông báo rõ ràng",
                        "Từ chối vì quá gấp gáp",
                        "Đồng ý nhưng cảnh báo có thể phải chờ"
                    ],
                    correct: 0,
                    explanation: "Linh hoạt trong việc đáp ứng nhu cầu khách hàng trong khả năng vận hành cho phép.",
                    level: "basic",
                    keyPhrases: ["last-minute changes", "table availability", "guest flexibility", "operational efficiency"]
                }
            ],
            "Vận hành bếp": [
                {
                    title: "Phối hợp giữa bếp và phục vụ",
                    situation: "Món ăn chậm ra và khách hàng bắt đầu tỏ ra bực bội, cần phối hợp với bếp.",
                    options: [
                        "Giao tiếp với bếp để nắm tình hình và thông báo cho khách",
                        "Chỉ hứa với khách món sẽ đến sớm",
                        "Đổ lỗi hoàn toàn cho bếp"
                    ],
                    correct: 0,
                    explanation: "Làm cầu nối hiệu quả giữa khách hàng và bếp để đảm bảo trải nghiệm tốt nhất.",
                    level: "intermediate",
                    keyPhrases: ["kitchen coordination", "service communication", "guest updates", "team collaboration"]
                },
                {
                    title: "Xử lý món ăn không đạt chất lượng",
                    situation: "Món ăn từ bếp không đạt tiêu chuẩn chất lượng, khách hàng có thể phàn nàn.",
                    options: [
                        "Phát hiện sớm và yêu cầu bếp làm lại trước khi phục vụ",
                        "Phục vụ bình thường và chờ phản hồi từ khách",
                        "Che giấu vấn đề và hy vọng khách không nhận ra"
                    ],
                    correct: 0,
                    explanation: "Đảm bảo chất lượng món ăn trước khi phục vụ, duy trì tiêu chuẩn nhà hàng.",
                    level: "advanced",
                    keyPhrases: ["quality control", "food standards", "preventive action", "reputation protection"]
                }
            ]
        };

        // Lấy tất cả scenarios để tương thích với code cũ
        this.scenarios = [];
        Object.values(this.scenariosByCategory).forEach(categoryScenarios => {
            this.scenarios.push(...categoryScenarios);
        });

        this.careerPath = {
            "reception": [
                {"position": "Nhân viên lễ tân", "level": "Mới vào", "requirements": "Tiếng Anh cơ bản, kỹ năng phục vụ khách hàng"},
                {"position": "Lễ tân cao cấp", "level": "Trung cấp", "requirements": "1-2 năm kinh nghiệm, tiếng Anh tốt"},
                {"position": "Giám sát lễ tân", "level": "Nâng cao", "requirements": "3+ năm, kỹ năng lãnh đạo, đa ngôn ngữ"},
                {"position": "Quản lý lễ tân", "level": "Quản lý", "requirements": "5+ năm, kinh nghiệm quản lý, bằng khách sạn ưu tiên"}
            ],
            "housekeeping": [
                {"position": "Nhân viên buồng phòng", "level": "Mới vào", "requirements": "Chứng chỉ vệ sinh, kỹ năng làm sạch cơ bản"},
                {"position": "Tổ trưởng buồng phòng", "level": "Trung cấp", "requirements": "2+ năm kinh nghiệm, kỹ năng kiểm tra chất lượng"},
                {"position": "Giám sát buồng phòng", "level": "Nâng cao", "requirements": "Kinh nghiệm lãnh đạo, kiến thức quản lý tồn kho"},
                {"position": "Quản lý buồng phòng", "level": "Quản lý", "requirements": "Bằng quản lý, kinh nghiệm vận hành housekeeping"}
            ],
            "restaurant": [
                {"position": "Phục vụ", "level": "Mới vào", "requirements": "Chứng chỉ an toàn thực phẩm, kỹ năng phục vụ cơ bản"},
                {"position": "Phục vụ trưởng", "level": "Trung cấp", "requirements": "2+ năm kinh nghiệm, kiến thức rượu vang"},
                {"position": "Giám sát nhà hàng", "level": "Nâng cao", "requirements": "Kinh nghiệm lãnh đạo, kiến thức F&B nâng cao"},
                {"position": "Quản lý nhà hàng", "level": "Quản lý", "requirements": "Bằng quản lý, kinh nghiệm vận hành F&B"}
            ],
            "foodSafety": [
                {"position": "Kiểm soát viên ATTP", "level": "Mới vào", "requirements": "Chứng chỉ HACCP, kiến thức vệ sinh cơ bản"},
                {"position": "Chuyên viên ATTP", "level": "Trung cấp", "requirements": "2+ năm kinh nghiệm, chứng chỉ kiểm tra thực phẩm"},
                {"position": "Giám sát ATTP", "level": "Nâng cao", "requirements": "Kinh nghiệm đào tạo, kiến thức quản lý rủi ro"},
                {"position": "Quản lý ATTP", "level": "Quản lý", "requirements": "Bằng chuyên ngành, kinh nghiệm triển khai hệ thống ATTP"}
            ]
        };

        this.culturalTips = [
            {
                "culture": "Khách doanh nhân Nhật Bản",
                "tips": ["Tôn trọng thứ bậc trong phục vụ", "Trao đổi danh thiếp bằng hai tay", "Phục vụ yên tĩnh được ưa chuộng", "Rất coi trọng đúng giờ"]
            },
            {
                "culture": "Khách Trung Đông", 
                "tips": ["Tùy chọn thức ăn Halal quan trọng", "Cân nhắc giờ cầu nguyện", "Tôn trọng quy tắc ăn mặc bảo thủ", "Ưu tiên chỗ ở gia đình"]
            }
        ];

        // App state
        this.currentLevel = 'basic';
        this.currentCardIndex = 0;
        this.isCardFlipped = false;
        this.learnedTerms = new Set();
        this.bookmarkedTerms = new Set();
        this.streakDays = Math.floor(Math.random() * 15) + 1;
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.quizQuestions = [];
        this.currentScenarioIndex = 0;

        // NEW: Vocabulary list pagination
        this.vocabularyListPage = 1;
        this.itemsPerPage = 20;
        this.filteredVocabulary = [];
        this.currentFilters = {
            category: 'all',
            level: 'all',
            search: '',
            sort: 'default'
        };

        this.init();
        
        // Initialize lesson preview modal
        this.initLessonPreviewModal();
    }

    async init() {
        await this.loadCSVData();
        this.debugDataLoading();
        this.setupEventListeners();
        this.loadUserProfile();
        this.updateDashboardStats();
        this.loadVocabularySection('basic');
        this.renderCareerPaths();
        this.renderCulturalTips();
        this.setupSearch();
        this.updateStreak();
        this.loadSpeechVoices();
        this.loadScenarios();
    }

    async loadCSVData() {
        try {
            // Load the main terminology file
            const response = await fetch('fb_professional_terminology_expanded_v2.csv');
            const csvText = await response.text();
            const lines = csvText.split('\n');
            
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = this.parseCSVLine(lines[i]);
                    if (values.length >= 7) {
                        const term = {
                            category: values[0],
                            level: values[1],
                            english: values[2],
                            vietnamese: values[3],
                            ipa: values[4],
                            definition: values[5],
                            example: values[6]
                        };
                        
                        this.csvData.push(term);
                        
                        // Categorize by level
                        const levelKey = this.mapLevelToKey(term.level);
                        if (this.vocabularyData[levelKey]) {
                            this.vocabularyData[levelKey].push(term);
                        }
                    }
                }
            }
            
            // Load the basic vocabulary file
            await this.loadBasicVocabulary();
            
            // Load the advanced vocabulary file
            await this.loadAdvancedVocabulary();
            
            // Load the new vocabulary files
            await this.loadAllergiesDietVocabulary();
            await this.loadTableSkillsVocabulary();
            
            // Organize vocabulary by topics
            this.organizeVocabularyByTopics();
            
        } catch (error) {
            console.error('Error loading CSV data:', error);
            this.loadFallbackData();
        }
    }

    organizeVocabularyByTopics() {
        // Organize all vocabulary by their category (topic)
        this.topicsData = {};
        
        this.csvData.forEach(term => {
            const topic = term.category || 'Khác';
            if (!this.topicsData[topic]) {
                this.topicsData[topic] = [];
            }
            this.topicsData[topic].push(term);
        });
        
        console.log('Topics organized:', Object.keys(this.topicsData));
        console.log('Topics count:', Object.keys(this.topicsData).length);
    }

    async loadBasicVocabulary() {
        try {
            const response = await fetch('hospitality_vocabulary_level_1_basic.csv');
            const csvText = await response.text();
            const lines = csvText.split('\n');
            
            let loadedCount = 0;
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = this.parseCSVLine(lines[i]);
                    if (values.length >= 7) {
                        const term = {
                            category: values[3],
                            level: values[6],
                            english: values[0],
                            vietnamese: values[1],
                            ipa: values[2],
                            definition: values[4],
                            example: values[5]
                        };
                        
                        this.csvData.push(term);
                        
                        // Add to basic vocabulary
                        this.vocabularyData.basic.push(term);
                        loadedCount++;
                    }
                }
            }
            console.log(`Loaded ${loadedCount} basic vocabulary terms`);
        } catch (error) {
            console.error('Error loading basic vocabulary:', error);
        }
    }

    async loadAdvancedVocabulary() {
        try {
            const response = await fetch('hospitality_vocabulary_level_3_advanced.csv');
            const csvText = await response.text();
            const lines = csvText.split('\n');
            
            let loadedCount = 0;
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = this.parseCSVLine(lines[i]);
                    if (values.length >= 7) {
                        const term = {
                            english: values[0],
                            vietnamese: values[1],
                            ipa: values[2],
                            category: values[3],
                            definition: values[4],
                            example: values[5],
                            level: values[6]
                        };
                        
                        this.csvData.push(term);
                        
                        // Add to advanced vocabulary
                        this.vocabularyData.advanced.push(term);
                        loadedCount++;
                    }
                }
            }
            console.log(`Loaded ${loadedCount} advanced vocabulary terms`);
        } catch (error) {
            console.error('Error loading advanced vocabulary:', error);
        }
    }

    async loadAllergiesDietVocabulary() {
        try {
            console.log('Loading allergies & diet vocabulary...');
            const response = await fetch('allergies_diet_vocabulary.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            const lines = csvText.split('\n');
            
            console.log('Allergies & diet CSV lines:', lines.length);
            
            let loadedCount = 0;
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = this.parseCSVLine(lines[i]);
                    if (values.length >= 7) {
                        const term = {
                            english: values[0],
                            vietnamese: values[1],
                            ipa: values[2],
                            category: values[3],
                            definition: values[4],
                            example: values[5],
                            level: values[6]
                        };
                        
                        console.log('Loading term:', term.english, 'Category:', term.category);
                        this.csvData.push(term);
                        
                        // Add to appropriate level
                        const levelKey = this.mapLevelToKey(term.level);
                        if (this.vocabularyData[levelKey]) {
                            this.vocabularyData[levelKey].push(term);
                        }
                        loadedCount++;
                    }
                }
            }
            console.log(`Loaded ${loadedCount} allergies & diet vocabulary terms`);
        } catch (error) {
            console.error('Error loading allergies & diet vocabulary:', error);
            // Add fallback data if file loading fails
            this.addFallbackAllergiesDietData();
        }
    }

    async loadTableSkillsVocabulary() {
        try {
            console.log('Loading table skills vocabulary...');
            const response = await fetch('table_skills_vocabulary.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            const lines = csvText.split('\n');
            
            console.log('Table skills CSV lines:', lines.length);
            
            let loadedCount = 0;
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = this.parseCSVLine(lines[i]);
                    if (values.length >= 7) {
                        const term = {
                            english: values[0],
                            vietnamese: values[1],
                            ipa: values[2],
                            category: values[3],
                            definition: values[4],
                            example: values[5],
                            level: values[6]
                        };
                        
                        console.log('Loading term:', term.english, 'Category:', term.category);
                        this.csvData.push(term);
                        
                        // Add to appropriate level
                        const levelKey = this.mapLevelToKey(term.level);
                        if (this.vocabularyData[levelKey]) {
                            this.vocabularyData[levelKey].push(term);
                        }
                        loadedCount++;
                    }
                }
            }
            console.log(`Loaded ${loadedCount} table skills vocabulary terms`);
        } catch (error) {
            console.error('Error loading table skills vocabulary:', error);
            // Add fallback data if file loading fails
            this.addFallbackTableSkillsData();
        }
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    mapLevelToKey(level) {
        const levelMap = {
            'Cơ bản': 'basic',
            'Trung cấp': 'intermediate', 
            'Cao cấp': 'advanced',
            'Basic': 'basic',
            'Intermediate': 'intermediate',
            'Advanced': 'advanced'
        };
        return levelMap[level] || 'basic';
    }

    loadFallbackData() {
        // Fallback data if CSV fails to load
        this.vocabularyData = {
            "basic": [
                {"english": "Check-in", "vietnamese": "Nhận phòng", "ipa": "[tʃek ɪn]", "category": "Front Office", "example": "Check-in time is 3:00 PM.", "definition": "Process of registering guest arrival and assigning room"},
                {"english": "Reservation", "vietnamese": "Đặt phòng", "ipa": "[ˌrezərˈveɪʃən]", "category": "Front Office", "example": "Your reservation is confirmed for tonight.", "definition": "Advance booking for accommodation"},
                {"english": "Concierge", "vietnamese": "Nhân viên hỗ trợ khách", "ipa": "[ˈkɒnsɪeəʒ]", "category": "Front Office", "example": "Our concierge can arrange restaurant reservations.", "definition": "Staff member providing guest assistance and local information"},
                {"english": "Housekeeping", "vietnamese": "Bộ phận phục vụ phòng", "ipa": "[ˈhaʊskiːpɪŋ]", "category": "Housekeeping", "example": "Housekeeping will clean your room daily.", "definition": "Department responsible for room cleanliness and maintenance"},
                {"english": "Room Service", "vietnamese": "Dịch vụ phòng", "ipa": "[ruːm ˈsɜːrvɪs]", "category": "Housekeeping", "example": "Room service is available 24/7.", "definition": "In-room dining and service delivery"},
                
                // Allergens & Dietary Restrictions - Basic
                {"english": "Nut allergy", "vietnamese": "Dị ứng hạt", "ipa": "[nʌt ˈælərdʒi]", "category": "Dị ứng & Chế độ ăn", "example": "Please inform us of any nut allergies.", "definition": "Allergic reaction to tree nuts or peanuts"},
                {"english": "Shellfish allergy", "vietnamese": "Dị ứng hải sản", "ipa": "[ˈʃelˌfɪʃ ˈælərdʒi]", "category": "Dị ứng & Chế độ ăn", "example": "We need to know about shellfish allergies.", "definition": "Allergic reaction to crustaceans and mollusks"},
                {"english": "Gluten-free", "vietnamese": "Không chứa gluten", "ipa": "[ˈɡluːtən friː]", "category": "Dị ứng & Chế độ ăn", "example": "We have gluten-free options available.", "definition": "Food that does not contain gluten protein"},
                {"english": "Dairy-free", "vietnamese": "Không chứa sữa", "ipa": "[ˈderi friː]", "category": "Dị ứng & Chế độ ăn", "example": "This dish is completely dairy-free.", "definition": "Food that does not contain milk or milk products"},
                {"english": "Vegan", "vietnamese": "Thuần chay", "ipa": "[ˈviːɡən]", "category": "Dị ứng & Chế độ ăn", "example": "Our vegan menu is very popular.", "definition": "Diet excluding all animal products"},
                {"english": "Vegetarian", "vietnamese": "Ăn chay", "ipa": "[ˌvedʒəˈteriən]", "category": "Dị ứng & Chế độ ăn", "example": "We have many vegetarian options.", "definition": "Diet excluding meat but may include dairy and eggs"},
                {"english": "Halal", "vietnamese": "Halal", "ipa": "[həˈlɑːl]", "category": "Dị ứng & Chế độ ăn", "example": "All our meat is halal certified.", "definition": "Food prepared according to Islamic dietary laws"},
                {"english": "Kosher", "vietnamese": "Kosher", "ipa": "[ˈkoʊʃər]", "category": "Dị ứng & Chế độ ăn", "example": "We offer kosher meals upon request.", "definition": "Food prepared according to Jewish dietary laws"},
                {"english": "Cross-contamination", "vietnamese": "Nhiễm chéo", "ipa": "[krɔːs kənˌtæmɪˈneɪʃən]", "category": "Dị ứng & Chế độ ăn", "example": "We prevent cross-contamination in our kitchen.", "definition": "Transfer of allergens from one food to another"},
                {"english": "Safe preparation", "vietnamese": "Chuẩn bị an toàn", "ipa": "[seɪf ˌprepəˈreɪʃən]", "category": "Dị ứng & Chế độ ăn", "example": "Safe preparation is our top priority.", "definition": "Food handling methods that prevent contamination"},
                
                // Phone Reservation Skills - Basic
                {"english": "Table reservation", "vietnamese": "Đặt bàn", "ipa": "[ˈteɪbəl ˌrezərˈveɪʃən]", "category": "Kỹ năng đặt bàn", "example": "I'd like to make a table reservation.", "definition": "Advance booking for restaurant seating"},
                {"english": "Party size", "vietnamese": "Số lượng khách", "ipa": "[ˈpɑːrti saɪz]", "category": "Kỹ năng đặt bàn", "example": "What is the party size for tonight?", "definition": "Number of people in a dining group"},
                {"english": "Preferred time", "vietnamese": "Giờ mong muốn", "ipa": "[prɪˈfɜːrd taɪm]", "category": "Kỹ năng đặt bàn", "example": "Do you have a preferred time?", "definition": "Desired dining time for reservation"},
                {"english": "Waiting list", "vietnamese": "Danh sách chờ", "ipa": "[ˈweɪtɪŋ lɪst]", "category": "Kỹ năng đặt bàn", "example": "We can add you to our waiting list.", "definition": "List of customers waiting for available tables"},
                {"english": "Confirmation number", "vietnamese": "Số xác nhận", "ipa": "[ˌkɑːnfərˈmeɪʃən ˈnʌmbər]", "category": "Kỹ năng đặt bàn", "example": "Your confirmation number is 12345.", "definition": "Unique identifier for a confirmed reservation"},
                {"english": "Special requests", "vietnamese": "Yêu cầu đặc biệt", "ipa": "[ˈspeʃəl rɪˈkests]", "category": "Kỹ năng đặt bàn", "example": "Do you have any special requests?", "definition": "Specific needs or preferences for the dining experience"}
            ],
            "intermediate": [
                {"english": "À la Carte", "vietnamese": "Gọi món theo thực đơn riêng", "ipa": "[ˌɑː lə ˈkɑːrt]", "category": "F&B", "example": "Our restaurant offers an à la carte menu.", "definition": "Menu where items are individually priced"},
                {"english": "Sommelier", "vietnamese": "Chuyên gia rượu vang", "ipa": "[sʌməˈlɪeɪ]", "category": "F&B", "example": "The sommelier recommends wine pairings.", "definition": "Wine expert responsible for wine service and pairing"},
                {"english": "Executive Suite", "vietnamese": "Suite hạng điều hành", "ipa": "[ɪgˈzekjətɪv swiːt]", "category": "Rooms", "example": "Executive suite includes club lounge access.", "definition": "Premium accommodation with business amenities"},
                {"english": "Yield Management", "vietnamese": "Quản lý lợi nhuận", "ipa": "[jiːld ˈmænɪdʒmənt]", "category": "Management", "example": "Yield management maximizes revenue potential.", "definition": "Revenue optimization through dynamic pricing"},
                {"english": "Turndown Service", "vietnamese": "Dịch vụ xếp giường tối", "ipa": "[ˈtɜːrndaʊn ˈsɜːrvɪs]", "category": "Housekeeping", "example": "Turndown service includes chocolates.", "definition": "Evening room preparation service"},
                
                // Allergens & Dietary Restrictions - Intermediate
                {"english": "Soy allergy", "vietnamese": "Dị ứng đậu nành", "ipa": "[sɔɪ ˈælərdʒi]", "category": "Dị ứng & Chế độ ăn", "example": "Please check for soy in the ingredients.", "definition": "Allergic reaction to soybeans and soy products"},
                {"english": "Lactose intolerance", "vietnamese": "Không dung nạp lactose", "ipa": "[ˈlæktoʊs ɪnˈtɑːlərəns]", "category": "Dị ứng & Chế độ ăn", "example": "We have lactose-free alternatives.", "definition": "Inability to digest lactose sugar in dairy products"},
                {"english": "Celiac disease", "vietnamese": "Bệnh celiac", "ipa": "[ˈsiːliæk dɪˈziːz]", "category": "Dị ứng & Chế độ ăn", "example": "We accommodate guests with celiac disease.", "definition": "Autoimmune disorder triggered by gluten consumption"},
                {"english": "Food intolerance", "vietnamese": "Không dung nạp thực phẩm", "ipa": "[fuːd ɪnˈtɑːlərəns]", "category": "Dị ứng & Chế độ ăn", "example": "Please inform us of any food intolerances.", "definition": "Difficulty digesting certain foods without immune response"},
                {"english": "Allergen labeling", "vietnamese": "Ghi nhãn chất gây dị ứng", "ipa": "[ˈælərdʒən ˈleɪbəlɪŋ]", "category": "Dị ứng & Chế độ ăn", "example": "Allergen labeling is clearly displayed.", "definition": "Clear identification of potential allergens in food"},
                {"english": "Dietary accommodation", "vietnamese": "Điều chỉnh chế độ ăn", "ipa": "[ˈdaɪəˌteri əˌkɑːməˈdeɪʃən]", "category": "Dị ứng & Chế độ ăn", "example": "We provide dietary accommodations upon request.", "definition": "Modification of menu items to meet dietary needs"},
                {"english": "Allergen-free kitchen", "vietnamese": "Bếp không chất gây dị ứng", "ipa": "[ˈælərdʒən friː ˈkɪtʃən]", "category": "Dị ứng & Chế độ ăn", "example": "Our allergen-free kitchen ensures safety.", "definition": "Kitchen area completely free of specific allergens"},
                {"english": "Food safety protocol", "vietnamese": "Quy trình an toàn thực phẩm", "ipa": "[fuːd ˈseɪfti ˈproʊtəkɔːl]", "category": "Dị ứng & Chế độ ăn", "example": "We follow strict food safety protocols.", "definition": "Standardized procedures to prevent food contamination"},
                
                // Phone Reservation Skills - Intermediate
                {"english": "Reservation system", "vietnamese": "Hệ thống đặt bàn", "ipa": "[ˌrezərˈveɪʃən ˈsɪstəm]", "category": "Kỹ năng đặt bàn", "example": "Our reservation system is fully automated.", "definition": "Computerized system for managing table bookings"},
                {"english": "Availability check", "vietnamese": "Kiểm tra chỗ trống", "ipa": "[əˌveɪləˈbɪləti tʃek]", "category": "Kỹ năng đặt bàn", "example": "Let me check availability for that time.", "definition": "Process of verifying table availability"},
                {"english": "Reservation modification", "vietnamese": "Thay đổi đặt bàn", "ipa": "[ˌrezərˈveɪʃən ˌmɑːdɪfɪˈkeɪʃən]", "category": "Kỹ năng đặt bàn", "example": "Would you like to modify your reservation?", "definition": "Changing details of an existing booking"},
                {"english": "Cancellation policy", "vietnamese": "Chính sách hủy bỏ", "ipa": "[ˌkænsəˈleɪʃən ˈpɑːləsi]", "category": "Kỹ năng đặt bàn", "example": "Our cancellation policy requires 24-hour notice.", "definition": "Rules regarding reservation cancellations"},
                {"english": "Walk-in availability", "vietnamese": "Chỗ cho khách vãng lai", "ipa": "[wɔːk ɪn əˌveɪləˈbɪləti]", "category": "Kỹ năng đặt bàn", "example": "We have walk-in availability at the bar.", "definition": "Tables available for customers without reservations"},
                {"english": "Reservation confirmation", "vietnamese": "Xác nhận đặt bàn", "ipa": "[ˌrezərˈveɪʃən ˌkɑːnfərˈmeɪʃən]", "category": "Kỹ năng đặt bàn", "example": "You'll receive a reservation confirmation email.", "definition": "Official verification of a table booking"},
                {"english": "Table assignment", "vietnamese": "Phân bàn", "ipa": "[ˈteɪbəl əˈsaɪnmənt]", "category": "Kỹ năng đặt bàn", "example": "Your table assignment will be ready at 7 PM.", "definition": "Process of assigning specific tables to reservations"},
                {"english": "Reservation hold", "vietnamese": "Giữ chỗ", "ipa": "[ˌrezərˈveɪʃən hoʊld]", "category": "Kỹ năng đặt bàn", "example": "We can hold your reservation for 15 minutes.", "definition": "Temporary reservation that may be released if not claimed"}
            ],
            "advanced": [
                {"english": "Molecular Gastronomy", "vietnamese": "Ẩm thực phân tử", "ipa": "[məˈlekjələr gæˈstrɒnəmi]", "category": "F&B", "example": "Molecular gastronomy creates unique textures.", "definition": "Scientific approach to cooking using chemistry and physics"},
                {"english": "Spherification", "vietnamese": "Kỹ thuật tạo cầu", "ipa": "[ˌsfɪərɪfɪˈkeɪʃən]", "category": "F&B", "example": "Spherification creates liquid-filled spheres.", "definition": "Culinary technique creating liquid-filled spheres using alginate"},
                {"english": "Butler Service", "vietnamese": "Dịch vụ quản gia", "ipa": "[ˈbʌtlər ˈsɜːrvɪs]", "category": "Luxury", "example": "Butler service provides personalized attention.", "definition": "Premium personal service including unpacking and concierge duties"},
                {"english": "White Glove Service", "vietnamese": "Dịch vụ cao cấp tuyệt đối", "ipa": "[waɪt glʌv ˈsɜːrvɪs]", "category": "Luxury", "example": "White glove service ensures flawless execution.", "definition": "Highest level of service with attention to every detail"},
                {"english": "Decanting", "vietnamese": "Rót rượu sang bình", "ipa": "[dɪˈkæntɪŋ]", "category": "F&B", "example": "Decanting separates sediment from aged wine.", "definition": "Process of transferring wine to remove sediment and aerate"},
                
                // Allergens & Dietary Restrictions - Advanced
                {"english": "Anaphylaxis management", "vietnamese": "Xử lý sốc phản vệ", "ipa": "[ˌænəfəˈlæksɪs ˈmænɪdʒmənt]", "category": "Dị ứng & Chế độ ăn", "example": "Our staff is trained in anaphylaxis management.", "definition": "Emergency response procedures for severe allergic reactions"},
                {"english": "Epinephrine administration", "vietnamese": "Tiêm epinephrine", "ipa": "[ˌepəˈnefrɪn ədˌmɪnɪˈstreɪʃən]", "category": "Dị ứng & Chế độ ăn", "example": "Epinephrine administration can save lives.", "definition": "Emergency injection of epinephrine for severe allergic reactions"},
                {"english": "Allergen cross-contact", "vietnamese": "Tiếp xúc chéo chất gây dị ứng", "ipa": "[ˈælərdʒən krɔːs ˈkɑːntækt]", "category": "Dị ứng & Chế độ ăn", "example": "We prevent allergen cross-contact through strict protocols.", "definition": "Unintentional transfer of allergens through shared equipment or surfaces"},
                {"english": "HACCP compliance", "vietnamese": "Tuân thủ HACCP", "ipa": "[ˈhæsæp kəmˈplaɪəns]", "category": "Dị ứng & Chế độ ăn", "example": "Our HACCP compliance ensures food safety.", "definition": "Adherence to Hazard Analysis Critical Control Points standards"},
                {"english": "Allergen testing protocol", "vietnamese": "Quy trình kiểm tra chất gây dị ứng", "ipa": "[ˈælərdʒən ˈtestɪŋ ˈproʊtəkɔːl]", "category": "Dị ứng & Chế độ ăn", "example": "Our allergen testing protocol is industry-leading.", "definition": "Systematic procedures for detecting allergens in food products"},
                {"english": "Dietary restriction documentation", "vietnamese": "Tài liệu hóa hạn chế ăn uống", "ipa": "[ˈdaɪəˌteri rɪˈstrɪkʃən ˌdɑːkjəmənˈteɪʃən]", "category": "Dị ứng & Chế độ ăn", "example": "Dietary restriction documentation is mandatory.", "definition": "Formal recording of guest dietary limitations and requirements"},
                {"english": "Allergen-free certification", "vietnamese": "Chứng nhận không chất gây dị ứng", "ipa": "[ˈælərdʒən friː ˌsɜːrtɪfɪˈkeɪʃən]", "category": "Dị ứng & Chế độ ăn", "example": "We have allergen-free certification for our kitchen.", "definition": "Official verification that food preparation meets allergen-free standards"},
                {"english": "Emergency response plan", "vietnamese": "Kế hoạch ứng phó khẩn cấp", "ipa": "[ɪˈmɜːrdʒənsi rɪˈspɑːns plæn]", "category": "Dị ứng & Chế độ ăn", "example": "Our emergency response plan covers allergic reactions.", "definition": "Predefined procedures for handling medical emergencies"},
                
                // Phone Reservation Skills - Advanced
                {"english": "Revenue optimization", "vietnamese": "Tối ưu hóa doanh thu", "ipa": "[ˈrevəˌnuː ˌɑːptɪməˈzeɪʃən]", "category": "Kỹ năng đặt bàn", "example": "Revenue optimization maximizes table utilization.", "definition": "Strategic management of reservations to maximize income"},
                {"english": "Dynamic pricing strategy", "vietnamese": "Chiến lược giá động", "ipa": "[daɪˈnæmɪk ˈpraɪsɪŋ ˈstrætədʒi]", "category": "Kỹ năng đặt bàn", "example": "Our dynamic pricing strategy adjusts based on demand.", "definition": "Flexible pricing that changes based on market conditions"},
                {"english": "Guest preference profiling", "vietnamese": "Lập hồ sơ sở thích khách", "ipa": "[ɡest ˈprefərəns ˈproʊfaɪlɪŋ]", "category": "Kỹ năng đặt bàn", "example": "Guest preference profiling enhances service quality.", "definition": "Systematic collection and analysis of customer preferences"},
                {"english": "Reservation analytics", "vietnamese": "Phân tích đặt bàn", "ipa": "[ˌrezərˈveɪʃən ˌænəˈlɪtɪks]", "category": "Kỹ năng đặt bàn", "example": "Reservation analytics help predict demand patterns.", "definition": "Data analysis of booking patterns and trends"},
                {"english": "No-show management", "vietnamese": "Quản lý khách không đến", "ipa": "[noʊ ʃoʊ ˈmænɪdʒmənt]", "category": "Kỹ năng đặt bàn", "example": "No-show management reduces revenue loss.", "definition": "Strategies for handling customers who don't arrive for reservations"},
                {"english": "Overbooking strategy", "vietnamese": "Chiến lược đặt quá chỗ", "ipa": "[ˈoʊvərˌbʊkɪŋ ˈstrætədʒi]", "category": "Kỹ năng đặt bàn", "example": "Our overbooking strategy accounts for no-shows.", "definition": "Intentional booking beyond capacity to compensate for cancellations"},
                {"english": "Guest communication protocol", "vietnamese": "Quy trình giao tiếp khách", "ipa": "[ɡest kəˌmjuːnəˈkeɪʃən ˈproʊtəkɔːl]", "category": "Kỹ năng đặt bàn", "example": "Our guest communication protocol ensures clarity.", "definition": "Standardized procedures for interacting with customers"},
                {"english": "Reservation recovery tactics", "vietnamese": "Chiến thuật phục hồi đặt bàn", "ipa": "[ˌrezərˈveɪʃən rɪˈkʌvəri ˈtæktɪks]", "category": "Kỹ năng đặt bàn", "example": "Reservation recovery tactics minimize lost revenue.", "definition": "Strategies for recovering from booking cancellations or no-shows"}
            ]
        };
    }

    setupEventListeners() {
        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems.length === 0) {
            console.warn('No navigation items found');
        } else {
            navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });
        }

        // Top Navbar navigation
        const navbarItems = document.querySelectorAll('.navbar-item');
        navbarItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavbarFlow(e));
        });

        // Navbar menu toggle for mobile
        const navbarMenuToggle = this.safeGetElement('navbarMenuToggle');
        if (navbarMenuToggle) {
            navbarMenuToggle.addEventListener('click', () => {
                const sidebar = this.safeGetElement('sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('open');
                }
            });
        }

        // Sidebar toggle
        const sidebarToggle = this.safeGetElement('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                const sidebar = this.safeGetElement('sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('open');
                }
            });
        }

        // Quick access buttons
        document.querySelectorAll('.quick-access-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleQuickAccess(e));
        });

        // Flashcard controls
        const flipCard = this.safeGetElement('flipCard');
        if (flipCard) flipCard.addEventListener('click', () => this.flipCard());
        
        const prevCard = this.safeGetElement('prevCard');
        if (prevCard) prevCard.addEventListener('click', () => this.previousCard());
        
        const nextCard = this.safeGetElement('nextCard');
        if (nextCard) nextCard.addEventListener('click', () => this.nextCard());
        
        const learnedBtn = this.safeGetElement('learnedBtn');
        if (learnedBtn) learnedBtn.addEventListener('click', () => this.markAsLearned());
        
        const bookmarkBtn = this.safeGetElement('bookmarkBtn');
        if (bookmarkBtn) bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        
        const reviewBtn = this.safeGetElement('reviewBtn');
        if (reviewBtn) reviewBtn.addEventListener('click', () => this.reviewTerm());
        
        const audioBtn = this.safeGetElement('audioBtn');
        if (audioBtn) audioBtn.addEventListener('click', () => this.playAudio());

        // Topic flashcard controls
        const backToTopics = this.safeGetElement('backToTopics');
        if (backToTopics) backToTopics.addEventListener('click', () => this.backToTopicsList());
        
        const topicFlipCard = this.safeGetElement('topicFlipCard');
        if (topicFlipCard) topicFlipCard.addEventListener('click', () => this.flipTopicCard());
        
        const topicPrevCard = this.safeGetElement('topicPrevCard');
        if (topicPrevCard) topicPrevCard.addEventListener('click', () => this.previousTopicCard());
        
        const topicNextCard = this.safeGetElement('topicNextCard');
        if (topicNextCard) topicNextCard.addEventListener('click', () => this.nextTopicCard());
        
        const topicLearnedBtn = this.safeGetElement('topicLearnedBtn');
        if (topicLearnedBtn) topicLearnedBtn.addEventListener('click', () => this.markTopicAsLearned());
        
        const topicBookmarkBtn = this.safeGetElement('topicBookmarkBtn');
        if (topicBookmarkBtn) topicBookmarkBtn.addEventListener('click', () => this.toggleTopicBookmark());
        
        const topicAudioBtn = this.safeGetElement('topicAudioBtn');
        if (topicAudioBtn) topicAudioBtn.addEventListener('click', () => this.playTopicAudio());

        // Quiz audio button
        const quizAudioBtn = this.safeGetElement('quizAudioBtn');
        if (quizAudioBtn) quizAudioBtn.addEventListener('click', () => this.playQuizAudio());

        // Quiz controls
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectQuizOption(e));
        });
        
        const submitAnswer = this.safeGetElement('submitAnswer');
        if (submitAnswer) submitAnswer.addEventListener('click', () => this.submitQuizAnswer());
        
        const skipQuestion = this.safeGetElement('skipQuestion');
        if (skipQuestion) skipQuestion.addEventListener('click', () => this.skipQuestion());
        
        const nextQuestion = this.safeGetElement('nextQuestion');
        if (nextQuestion) nextQuestion.addEventListener('click', () => this.nextQuizQuestion());
        
        const retakeQuiz = this.safeGetElement('retakeQuiz');
        if (retakeQuiz) retakeQuiz.addEventListener('click', () => this.startQuiz());
        
        const reviewMistakes = this.safeGetElement('reviewMistakes');
        if (reviewMistakes) reviewMistakes.addEventListener('click', () => this.reviewMistakes());

        // Scenario controls - event listeners are added dynamically in showCurrentScenario()
        // to avoid conflicts with cloned elements
        
        const nextScenario = this.safeGetElement('nextScenario');
        if (nextScenario) nextScenario.addEventListener('click', () => this.nextScenario());

        // Module Detail Navigation
        const backToModules = this.safeGetElement('backToModules');
        if (backToModules) backToModules.addEventListener('click', () => this.showSection('learning-path'));
        
        const startModule = this.safeGetElement('startModule');
        if (startModule) startModule.addEventListener('click', () => this.startCurrentModule());
        
        const bookmarkModule = this.safeGetElement('bookmarkModule');
        if (bookmarkModule) bookmarkModule.addEventListener('click', () => this.toggleModuleBookmark());

        // Lesson Viewer Navigation - Use event delegation as fallback
        const backToModule = this.safeGetElement('backToModule');
        if (backToModule) {
            console.log('backToModule button found, adding event listener');
            backToModule.addEventListener('click', (e) => {
                console.log('backToModule button clicked');
                e.preventDefault();
                e.stopPropagation();
                this.backToCurrentModule();
            });
        } else {
            console.warn('backToModule button not found during initialization');
        }
        
        // Also add event delegation for dynamic content
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'backToModule') {
                console.log('backToModule button clicked via event delegation');
                e.preventDefault();
                e.stopPropagation();
                this.backToCurrentModule();
            }
        });
        
        const completeLesson = this.safeGetElement('completeLesson');
        if (completeLesson) completeLesson.addEventListener('click', () => this.completeCurrentLesson());
        
        const bookmarkLesson = this.safeGetElement('bookmarkLesson');
        if (bookmarkLesson) bookmarkLesson.addEventListener('click', () => this.toggleLessonBookmark());

        // 🎭 Lesson Preview Modal Event Listeners
        this.initializeLessonPreviewModal();
    }

    initializeLessonPreviewModal() {
        // Close modal button
        const closeBtn = document.getElementById('lessonPreviewClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideLessonPreview());
        }

        // Modal overlay click to close
        const modal = document.getElementById('lessonPreviewModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideLessonPreview();
                }
            });
        }

        // Start lesson button
        const startBtn = document.getElementById('lessonPreviewStart');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                const modal = document.getElementById('lessonPreviewModal');
                const moduleId = modal.dataset.moduleId;
                const lessonId = modal.dataset.lessonId;
                const level = modal.dataset.level;
                
                this.hideLessonPreview();
                if (moduleId && lessonId && level) {
                    this.showLesson(moduleId, lessonId, level);
                }
            });
        }

        // Bookmark button in modal
        const bookmarkBtn = document.getElementById('lessonPreviewCancel');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => {
                const modal = document.getElementById('lessonPreviewModal');
                const moduleId = modal.dataset.moduleId;
                const lessonId = modal.dataset.lessonId;
                
                if (moduleId && lessonId) {
                    this.toggleBookmark(moduleId, lessonId);
                }
            });
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
                this.hideLessonPreview();
            }
        });
    }

    handleNavigation(e) {
        const section = e.target.dataset.section;
        const level = e.target.dataset.level;

        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        e.target.classList.add('active');

        // Show corresponding section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        if (section === 'dashboard') {
            const dashboard = this.safeGetElement('dashboard');
            if (dashboard) dashboard.classList.add('active');
        } else if (level) {
            this.loadVocabularySection(level);
            const vocabulary = this.safeGetElement('vocabulary');
            if (vocabulary) vocabulary.classList.add('active');
        } else if (section === 'quiz') {
            this.startQuiz();
            const quiz = this.safeGetElement('quiz');
            if (quiz) quiz.classList.add('active');
        } else if (section === 'scenarios') {
            this.loadScenarios();
            const scenarios = this.safeGetElement('scenarios');
            if (scenarios) scenarios.classList.add('active');
        } else if (section === 'career') {
            const career = this.safeGetElement('career');
            if (career) career.classList.add('active');
        } else if (section === 'vocabulary-list') {
            this.loadVocabularyList();
            const vocabularyList = this.safeGetElement('vocabulary-list');
            if (vocabularyList) vocabularyList.classList.add('active');
        } else if (section === 'microlearning') {
            this.loadMicrolearningSection();
            const microlearning = this.safeGetElement('microlearning');
            if (microlearning) microlearning.classList.add('active');
        } else if (section === 'topics') {
            this.loadTopicsSection();
            const topics = this.safeGetElement('topics');
            if (topics) topics.classList.add('active');
        } else if (section === 'culture') {
            const culture = this.safeGetElement('culture');
            if (culture) culture.classList.add('active');
        }

        // Close mobile sidebar
        if (window.innerWidth <= 768) {
            const sidebar = this.safeGetElement('sidebar');
            if (sidebar) sidebar.classList.remove('open');
        }
    }

    handleNavbarFlow(e) {
        const flow = e.currentTarget.dataset.flow;
        
        // Update active navbar item
        document.querySelectorAll('.navbar-item').forEach(item => {
            item.classList.remove('active');
        });
        e.currentTarget.classList.add('active');

        // Map flows to sections and sidebar navigation
        const flowMappings = {
            'dashboard': {
                section: 'dashboard',
                sidebarNav: 'dashboard'
            },
            'practice': {
                section: 'quiz',
                sidebarNav: 'quiz'
            },
            'microlearning': {
                section: 'microlearning',
                sidebarNav: 'microlearning'
            },
            'guide': {
                section: 'career',
                sidebarNav: 'career'
            }
        };

        const mapping = flowMappings[flow];
        if (!mapping) return;

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Update sidebar active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const sidebarNav = document.querySelector(`[data-section="${mapping.sidebarNav}"]`);
        if (sidebarNav) sidebarNav.classList.add('active');

        // Show corresponding section and load data
        if (mapping.section === 'dashboard') {
            const dashboard = this.safeGetElement('dashboard');
            if (dashboard) dashboard.classList.add('active');
            this.updateDashboardStats();
        } else if (mapping.section === 'quiz') {
            this.startQuiz();
            const quiz = this.safeGetElement('quiz');
            if (quiz) quiz.classList.add('active');
        } else if (mapping.section === 'microlearning') {
            this.loadMicrolearningSection();
            const microlearning = this.safeGetElement('microlearning');
            if (microlearning) microlearning.classList.add('active');
        } else if (mapping.section === 'career') {
            const career = this.safeGetElement('career');
            if (career) career.classList.add('active');
        }

        // Update progress badge in navbar
        this.updateNavbarProgress();
    }

    updateNavbarProgress() {
        const totalTerms = Object.values(this.vocabularyData).flat().length;
        const learnedCount = this.learnedTerms.size;
        const progress = totalTerms > 0 ? Math.round((learnedCount / totalTerms) * 100) : 0;
        
        const progressBadge = document.querySelector('.progress-badge');
        if (progressBadge) {
            progressBadge.textContent = `${progress}%`;
        }
    }

    handleQuickAccess(e) {
        const action = e.currentTarget.dataset.action;
        
        if (action === 'startBasic') {
            this.loadVocabularySection('basic');
            this.showSection('vocabulary');
        } else if (action === 'takeQuiz') {
            this.startQuiz();
            this.showSection('quiz');
        } else if (action === 'practiceScenario') {
            this.loadScenarios();
            this.showSection('scenarios');
        }
    }

    showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = this.safeGetElement(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const navItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (navItem) navItem.classList.add('active');
    }

    updateDashboardStats() {
        const totalTerms = Object.values(this.vocabularyData).flat().length;
        const learnedCount = this.learnedTerms.size;
        const progress = Math.round((learnedCount / totalTerms) * 100);

        const totalTermsEl = this.safeGetElement('totalTerms');
        if (totalTermsEl) totalTermsEl.textContent = totalTerms;
        
        const learnedTermsEl = this.safeGetElement('learnedTerms');
        if (learnedTermsEl) learnedTermsEl.textContent = learnedCount;
        
        const streakDaysEl = this.safeGetElement('streakDays');
        if (streakDaysEl) streakDaysEl.textContent = this.userProfile.streak;
        
        const progressEl = this.safeGetElement('progress');
        if (progressEl) progressEl.textContent = progress + '%';
        
        // Update personalized recommendations
        this.updatePersonalizedDashboard();
        
        // Update review reminders
        this.updateReviewReminders();
        
        // Update learning path stats if they exist
        const userPointsEl = this.safeGetElement('userPoints');
        if (userPointsEl) userPointsEl.textContent = this.userProfile.totalPoints;
    }
    
    updatePersonalizedDashboard() {
        const recommendations = this.userProfile.recommendedLessons || [];
        const recommendationsContainer = document.getElementById('personalizedRecommendations');
        
        if (recommendationsContainer && recommendations.length > 0) {
            recommendationsContainer.innerHTML = `
                <h3>🎯 Được đề xuất cho bạn</h3>
                <div class="recommendations-list">
                    ${recommendations.map(rec => `
                        <div class="recommendation-card">
                            <div class="recommendation-content">
                                <h4>${this.getLessonTitle(rec.lessonId)}</h4>
                                <p class="recommendation-reason">${rec.reason}</p>
                                <span class="recommendation-priority ${rec.priority}">${rec.priority === 'high' ? 'Ưu tiên cao' : 'Trung bình'}</span>
                            </div>
                            <button class="btn btn--primary btn--sm" onclick="app.startRecommendedLesson('${rec.lessonId}')">
                                Bắt đầu
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    
    updateReviewReminders() {
        const dueReviews = this.calculateSpacedRepetition();
        const reviewContainer = document.getElementById('reviewReminders');
        
        if (reviewContainer) {
            if (dueReviews.length > 0) {
                reviewContainer.innerHTML = `
                    <div class="review-reminder">
                        <h3>📚 Ôn tập cần thiết</h3>
                        <p>Có ${dueReviews.length} thuật ngữ cần ôn tập</p>
                        <button class="btn btn--primary btn--sm" onclick="app.startReviewSession()">
                            Bắt đầu ôn tập
                        </button>
                    </div>
                `;
            } else {
                reviewContainer.innerHTML = `
                    <div class="review-reminder">
                        <h3>✅ Ôn tập hoàn tất</h3>
                        <p>Tất cả thuật ngữ đã được ôn tập đúng lịch</p>
                    </div>
                `;
            }
        }
    }
    
    getLessonTitle(lessonId) {
        const lesson = this.findLessonById(lessonId);
        return lesson ? lesson.title : lessonId;
    }
    
    startRecommendedLesson(lessonId) {
        // Find the module containing this lesson
        for (const moduleId in this.microlearningModules.comprehensive) {
            const module = this.microlearningModules.comprehensive[moduleId];
            const lesson = module.lessons.find(l => l.id === lessonId);
            if (lesson) {
                this.currentLessonContext.moduleId = moduleId;
                this.currentLessonContext.level = lesson.level;
                this.showModuleDetail(moduleId);
                return;
            }
        }
    }
    
    startReviewSession() {
        const dueReviews = this.calculateSpacedRepetition();
        if (dueReviews.length > 0) {
            this.showNotification(`Bắt đầu ôn tập ${dueReviews.length} thuật ngữ`, 'info');
            // Switch to vocabulary section for review
            this.showSection('vocabulary');
        }
        
        const userStreakEl = this.safeGetElement('userStreak');
        if (userStreakEl) userStreakEl.textContent = this.userProfile.streak;
        
        const userBadgesEl = this.safeGetElement('userBadges');
        if (userBadgesEl) userBadgesEl.textContent = this.userProfile.badges.length;
        
        // Update navbar progress badge
        this.updateNavbarProgress();
    }

    loadVocabularySection(level) {
        this.currentLevel = level;
        this.currentCardIndex = 0;
        this.isCardFlipped = false;

        const levelNames = {
            'basic': 'Từ vựng cơ bản',
            'intermediate': 'Từ vựng trung cấp',
            'advanced': 'Từ vựng nâng cao'
        };

        document.getElementById('vocabularyTitle').textContent = levelNames[level];
        this.updateVocabularyProgress();
        this.updateFlashcard();
    }

    updateVocabularyProgress() {
        const terms = this.vocabularyData[this.currentLevel];
        const learnedInLevel = terms.filter(term => 
            this.learnedTerms.has(`${term.english}-${this.currentLevel}`)
        ).length;

        const progressPercent = (learnedInLevel / terms.length) * 100;
        document.getElementById('vocabularyProgress').style.width = progressPercent + '%';
        document.getElementById('progressText').textContent = `${learnedInLevel}/${terms.length}`;
    }

    updateFlashcard() {
        const terms = this.vocabularyData[this.currentLevel];
        if (terms.length === 0) return;

        const currentTerm = terms[this.currentCardIndex];
        
        // Reset card flip
        document.getElementById('flashcard').classList.remove('flipped');
        this.isCardFlipped = false;

        // Update front side
        document.getElementById('englishTerm').textContent = currentTerm.english;
        document.getElementById('categoryLabel').textContent = currentTerm.category;
        document.getElementById('exampleSentence').textContent = currentTerm.example;

        // Update back side
        document.getElementById('vietnameseTerm').textContent = currentTerm.vietnamese;
        document.getElementById('ipaPronunciation').textContent = currentTerm.ipa;
        document.getElementById('termDefinition').textContent = currentTerm.definition;

        // Update button states
        const termKey = `${currentTerm.english}-${this.currentLevel}`;
        const learnedBtn = document.getElementById('learnedBtn');
        const bookmarkBtn = document.getElementById('bookmarkBtn');

        if (this.learnedTerms.has(termKey)) {
            learnedBtn.textContent = '✅ Đã học';
            learnedBtn.classList.add('btn--primary');
        } else {
            learnedBtn.textContent = '✅ Đánh dấu đã học';
            learnedBtn.classList.remove('btn--primary');
        }

        if (this.bookmarkedTerms.has(termKey)) {
            bookmarkBtn.textContent = '🔖 Đã lưu';
        } else {
            bookmarkBtn.textContent = '🔖 Đánh dấu';
        }
    }

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.toggle('flipped');
        this.isCardFlipped = !this.isCardFlipped;
    }

    previousCard() {
        const terms = this.vocabularyData[this.currentLevel];
        this.currentCardIndex = (this.currentCardIndex - 1 + terms.length) % terms.length;
        this.updateFlashcard();
    }

    nextCard() {
        const terms = this.vocabularyData[this.currentLevel];
        this.currentCardIndex = (this.currentCardIndex + 1) % terms.length;
        this.updateFlashcard();
    }

    markAsLearned() {
        const terms = this.vocabularyData[this.currentLevel];
        const currentTerm = terms[this.currentCardIndex];
        const termKey = `${currentTerm.english}-${this.currentLevel}`;

        if (this.learnedTerms.has(termKey)) {
            this.learnedTerms.delete(termKey);
        } else {
            this.learnedTerms.add(termKey);
            // Add points for learning a new term
            this.addPoints(this.gamification.points.lessonComplete, 'Học từ vựng mới');
        }

        this.updateFlashcard();
        this.updateVocabularyProgress();
        this.updateDashboardStats();
    }

    toggleBookmark() {
        const terms = this.vocabularyData[this.currentLevel];
        const currentTerm = terms[this.currentCardIndex];
        const termKey = `${currentTerm.english}-${this.currentLevel}`;

        if (this.bookmarkedTerms.has(termKey)) {
            this.bookmarkedTerms.delete(termKey);
        } else {
            this.bookmarkedTerms.add(termKey);
        }

        this.updateFlashcard();
    }

    reviewTerm() {
        // Simulate review functionality
        this.flipCard();
        setTimeout(() => {
            this.nextCard();
        }, 2000);
    }

    playAudio() {
        const audioBtn = document.getElementById('audioBtn');

        // Determine current term from state instead of undefined getCurrentTerm()
        const terms = this.vocabularyData[this.currentLevel] || [];
        const current = terms[this.currentCardIndex];
        const termText = current && (current.english || current.term || '').trim();

        if (!termText) {
            this.showNotification('Không có từ vựng để phát âm', 'error');
            return;
        }

        // Check if speech synthesis is supported
        if (!('speechSynthesis' in window)) {
            this.showNotification('Trình duyệt không hỗ trợ phát âm', 'error');
            return;
        }

        console.log('Playing audio for term:', termText);

        // Stop any current speech
        speechSynthesis.cancel();

        // Wait a bit for cancel to take effect
        setTimeout(() => {
            this.speakText(termText, audioBtn);
        }, 100);
    }

    playTermAudio(term, buttonElement) {
        if (!term) {
            this.showNotification('Không có từ vựng để phát âm', 'error');
            return;
        }
        
        // Check if speech synthesis is supported
        if (!('speechSynthesis' in window)) {
            this.showFallbackOptions(term, buttonElement);
            return;
        }
        
        console.log('Playing term audio:', term);
        
        // Stop any current speech
        speechSynthesis.cancel();
        
        // Wait a bit for cancel to take effect
        setTimeout(() => {
            this.speakText(term, buttonElement);
        }, 100);
    }

    showFallbackOptions(term, buttonElement) {
        // Create a temporary modal for fallback options
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); display: flex; align-items: center; 
            justify-content: center; z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 24px; border-radius: 8px; max-width: 400px; width: 90%;">
                <h3 style="margin-top: 0; color: #333;">🔊 Phát âm từ: "${term}"</h3>
                <p style="color: #666; margin: 12px 0;">Trình duyệt không hỗ trợ phát âm tự động. Bạn có thể:</p>
                
                <div style="margin: 16px 0;">
                    <button class="btn btn--primary" onclick="app.copyTermAndOpenTranslate('${term}')" style="width: 100%; margin-bottom: 8px;">
                        🌐 Mở Google Translate
                    </button>
                    <button class="btn btn--outline" onclick="app.copyTermToClipboard('${term}')" style="width: 100%; margin-bottom: 8px;">
                        📋 Copy từ vựng
                    </button>
                    <button class="btn btn--secondary" onclick="this.parentElement.parentElement.parentElement.remove()" style="width: 100%;">
                        ❌ Đóng
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    copyTermAndOpenTranslate(term) {
        // Copy to clipboard
        this.copyTermToClipboard(term);
        
        // Open Google Translate
        const url = `https://translate.google.com/?sl=en&tl=vi&text=${encodeURIComponent(term)}`;
        window.open(url, '_blank');
        
        // Close modal
        const modal = document.querySelector('div[style*="position: fixed"]');
        if (modal) modal.remove();
    }

    copyTermToClipboard(term) {
        try {
            // Modern approach
            if (navigator.clipboard) {
                navigator.clipboard.writeText(term).then(() => {
                    this.showNotification(`✅ Đã copy "${term}" vào clipboard!`, 'success');
                }).catch(() => {
                    this.fallbackCopyToClipboard(term);
                });
            } else {
                this.fallbackCopyToClipboard(term);
            }
        } catch (error) {
            this.fallbackCopyToClipboard(term);
        }
        
        // Close modal
        const modal = document.querySelector('div[style*="position: fixed"]');
        if (modal) modal.remove();
    }

    fallbackCopyToClipboard(term) {
        // Fallback approach
        const textArea = document.createElement('textarea');
        textArea.value = term;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification(`✅ Đã copy "${term}" vào clipboard!`, 'success');
        } catch (err) {
            this.showNotification(`❌ Không thể copy. Từ vựng: "${term}"`, 'error');
        }
        
        document.body.removeChild(textArea);
    }

    playQuizAudio() {
        const quizAudioBtn = document.getElementById('quizAudioBtn');
        const questionTerm = document.getElementById('questionTerm');
        
        if (!questionTerm || !questionTerm.textContent) {
            this.showNotification('Không có từ vựng để phát âm', 'error');
            return;
        }
        
        const term = questionTerm.textContent;
        
        // Check if speech synthesis is supported
        if (!('speechSynthesis' in window)) {
            this.showNotification('Trình duyệt không hỗ trợ phát âm', 'error');
            return;
        }
        
        console.log('Playing quiz audio:', term);
        
        // Stop any current speech
        speechSynthesis.cancel();
        
        // Wait a bit for cancel to take effect
        setTimeout(() => {
            this.speakText(term, quizAudioBtn);
        }, 100);
    }

    loadSpeechVoices() {
        // Load speech synthesis voices
        if ('speechSynthesis' in window) {
            console.log('Speech synthesis is supported');
            
            // Some browsers need this to load voices
            speechSynthesis.getVoices();
            
            // Listen for voices loaded event
            speechSynthesis.addEventListener('voiceschanged', () => {
                const voices = speechSynthesis.getVoices();
                console.log('Voices loaded event - Available voices:', voices.length);
                
                // Log all voices for debugging
                voices.forEach((voice, index) => {
                    console.log(`Voice ${index}: ${voice.name} (${voice.lang}) - ${voice.localService ? 'Local' : 'Remote'}`);
                });
                
                // Log available American English voices
                const americanVoices = voices.filter(voice => voice.lang === 'en-US');
                console.log('American English voices:', americanVoices.map(v => v.name));
                
                // Store voices for later use
                this.availableVoices = voices;
                this.speechReady = true;
            });
            
            // Try to get voices immediately
            this.availableVoices = speechSynthesis.getVoices();
            
            // Force voices to load in some browsers
            setTimeout(() => {
                if (!this.availableVoices || this.availableVoices.length === 0) {
                    this.availableVoices = speechSynthesis.getVoices();
                    console.log('Delayed voice loading - Available voices:', this.availableVoices.length);
                }
            }, 1000);
        } else {
            console.error('Speech synthesis is not supported in this browser');
        }
    }

    checkSpeechSupport() {
        const support = {
            speechSynthesis: 'speechSynthesis' in window,
            speechSynthesisUtterance: 'SpeechSynthesisUtterance' in window,
            voicesAvailable: false,
            userInteractionRequired: false
        };

        if (support.speechSynthesis) {
            const voices = speechSynthesis.getVoices();
            support.voicesAvailable = voices.length > 0;
            
            // Check if user interaction is required
            const testUtterance = new SpeechSynthesisUtterance('test');
            testUtterance.volume = 0; // Silent test
            
            try {
                speechSynthesis.speak(testUtterance);
                speechSynthesis.cancel();
            } catch (error) {
                support.userInteractionRequired = true;
                console.log('User interaction required for speech synthesis');
            }
        }

        console.log('Speech support check:', support);
        return support;
    }

    speakText(text, buttonElement) {
        if (!text) {
            console.error('No text provided for speech');
            return;
        }
        
        console.log('Speaking text:', text);
        
        // Check speech support first
        const support = this.checkSpeechSupport();
        if (!support.speechSynthesis) {
            this.showNotification('Trình duyệt không hỗ trợ phát âm', 'error');
            return;
        }
        
        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure for American English accent
        utterance.lang = 'en-US';
        utterance.rate = 0.8; // Slightly slower for learning
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Add event listeners for debugging
        utterance.onstart = () => {
            console.log('Speech started');
        };
        
        utterance.onend = () => {
            console.log('Speech ended successfully');
            if (buttonElement) {
                buttonElement.textContent = buttonElement.textContent.replace('Đang phát...', 'Phát âm');
                buttonElement.disabled = false;
            }
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error, event);
            if (buttonElement) {
                buttonElement.textContent = buttonElement.textContent.replace('Đang phát...', 'Phát âm');
                buttonElement.disabled = false;
            }
            this.showNotification(`Lỗi phát âm: ${event.error}`, 'error');
        };
        
        // Try to get voices - with multiple fallbacks
        let voices = this.availableVoices || speechSynthesis.getVoices();
        
        // If no voices available, try multiple approaches
        if (!voices || voices.length === 0) {
            console.log('No voices available, trying multiple approaches...');
            
            // Approach 1: Force reload
            voices = speechSynthesis.getVoices();
            
            // Approach 2: Wait and retry
            if (!voices || voices.length === 0) {
                console.log('Waiting for voices to load...');
                setTimeout(() => {
                    voices = speechSynthesis.getVoices();
                    if (voices && voices.length > 0) {
                        this.selectAndSpeak(utterance, voices, buttonElement);
                    } else {
                        // Approach 3: Use without voice selection
                        console.log('Using default voice');
                        this.speakWithoutVoiceSelection(utterance, buttonElement);
                    }
                }, 1000);
                return;
            }
        }
        
        this.selectAndSpeak(utterance, voices, buttonElement);
    }

    selectAndSpeak(utterance, voices, buttonElement) {
        console.log('Available voices for selection:', voices.length);
        
        // Log all available voices for debugging
        voices.forEach(voice => {
            console.log(`Voice: ${voice.name} (${voice.lang})`);
        });
        
        const americanVoice = voices.find(voice => 
            voice.lang === 'en-US' && 
            (voice.name.includes('Google US English') || 
             voice.name.includes('Microsoft David') ||
             voice.name.includes('Alex') ||
             voice.name.includes('Samantha') ||
             voice.name.includes('US English') ||
             voice.name.includes('English (US)'))
        );
        
        if (americanVoice) {
            utterance.voice = americanVoice;
            console.log('Using American English voice:', americanVoice.name);
        } else {
            // Try any English voice as fallback
            const englishVoice = voices.find(voice => 
                voice.lang.startsWith('en')
            );
            
            if (englishVoice) {
                utterance.voice = englishVoice;
                console.log('Using English voice as fallback:', englishVoice.name);
            } else {
                console.log('No English voice found, using default');
            }
        }
        
        // Update button state
        if (buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = '🔊 Đang phát...';
            buttonElement.disabled = true;
            
            // Handle speech events
            utterance.onend = () => {
                buttonElement.textContent = originalText;
                buttonElement.disabled = false;
                console.log('Speech ended successfully');
            };
            
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event.error);
                buttonElement.textContent = originalText;
                buttonElement.disabled = false;
                this.showNotification('Lỗi phát âm: ' + event.error, 'error');
            };
        }
        
        // Speak the word
        console.log('Starting speech synthesis...');
        try {
            speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Error starting speech synthesis:', error);
            if (buttonElement) {
                buttonElement.textContent = buttonElement.textContent.replace('Đang phát...', 'Phát âm');
                buttonElement.disabled = false;
            }
            this.showNotification('Không thể phát âm. Vui lòng kiểm tra âm lượng.', 'error');
        }
    }

    speakWithoutVoiceSelection(utterance, buttonElement) {
        console.log('Speaking without voice selection (using browser default)');
        
        // Update button state
        if (buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = '🔊 Đang phát...';
            buttonElement.disabled = true;
        }
        
        try {
            speechSynthesis.speak(utterance);
            console.log('Speech synthesis started with default voice');
        } catch (error) {
            console.error('Error starting speech synthesis:', error);
            if (buttonElement) {
                buttonElement.textContent = buttonElement.textContent.replace('Đang phát...', 'Phát âm');
                buttonElement.disabled = false;
            }
            this.showNotification('Không thể phát âm. Hãy kiểm tra âm lượng và thử lại.', 'error');
        }
    }




    startQuiz() {
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.generateQuizQuestions();
        this.showQuizQuestion();
        
        document.getElementById('quizResults').classList.add('hidden');
        document.querySelector('.quiz-container').classList.remove('hidden');
    }

    generateQuizQuestions() {
        const allTerms = Object.values(this.vocabularyData).flat();
        this.quizQuestions = [];

        // Generate 10 random questions
        for (let i = 0; i < 10; i++) {
            const correctTerm = allTerms[Math.floor(Math.random() * allTerms.length)];
            const otherTerms = allTerms.filter(term => term !== correctTerm);
            const wrongOptions = [];

            // Get 3 random wrong answers
            while (wrongOptions.length < 3) {
                const wrongTerm = otherTerms[Math.floor(Math.random() * otherTerms.length)];
                if (!wrongOptions.includes(wrongTerm.vietnamese)) {
                    wrongOptions.push(wrongTerm.vietnamese);
                }
            }

            const options = [correctTerm.vietnamese, ...wrongOptions];
            // Shuffle options
            for (let j = options.length - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                [options[j], options[k]] = [options[k], options[j]];
            }

            this.quizQuestions.push({
                term: correctTerm.english,
                correct: correctTerm.vietnamese,
                options: options,
                correctIndex: options.indexOf(correctTerm.vietnamese)
            });
        }
    }

    showQuizQuestion() {
        if (this.currentQuizIndex >= this.quizQuestions.length) {
            this.showQuizResults();
            return;
        }

        const question = this.quizQuestions[this.currentQuizIndex];
        
        document.getElementById('currentQuestion').textContent = this.currentQuizIndex + 1;
        document.getElementById('totalQuestions').textContent = this.quizQuestions.length;
        document.getElementById('questionTerm').textContent = question.term;

        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.textContent = question.options[index];
            option.classList.remove('selected', 'correct', 'incorrect');
            option.disabled = false;
        });

        document.getElementById('submitAnswer').disabled = true;
        document.getElementById('quizFeedback').classList.add('hidden');
    }

    selectQuizOption(e) {
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });
        e.target.classList.add('selected');
        document.getElementById('submitAnswer').disabled = false;
    }

    submitQuizAnswer() {
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (!selectedOption) return;

        const question = this.quizQuestions[this.currentQuizIndex];
        const selectedIndex = parseInt(selectedOption.dataset.option);
        const isCorrect = selectedIndex === question.correctIndex;

        // Show correct/incorrect styling
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            option.disabled = true;
            if (index === question.correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Update score and track mistakes
        if (isCorrect) {
            this.quizScore++;
            // Add points for correct answer
            this.addPoints(this.gamification.points.quizCorrect, 'Trả lời đúng');
        } else {
            // Store mistake for review
            this.quizMistakes.push({
                question: question.term,
                correct: question.correct,
                selected: question.options[selectedIndex],
                explanation: `Đáp án đúng là: ${question.correct}`
            });
        }

        // Show feedback
        const feedback = document.getElementById('quizFeedback');
        const feedbackText = document.getElementById('feedbackText');
        
        if (isCorrect) {
            feedbackText.textContent = 'Chính xác! Bạn đã trả lời đúng.';
            feedback.classList.remove('incorrect');
        } else {
            feedbackText.textContent = `Sai rồi. Đáp án đúng là: ${question.correct}`;
            feedback.classList.add('incorrect');
        }

        feedback.classList.remove('hidden');
        document.getElementById('quizScore').textContent = this.quizScore;
    }

    nextQuizQuestion() {
        this.currentQuizIndex++;
        this.showQuizQuestion();
    }

    skipQuestion() {
        this.currentQuizIndex++;
        this.showQuizQuestion();
    }

    showQuizResults() {
        document.querySelector('.quiz-container').classList.add('hidden');
        const results = document.getElementById('quizResults');
        results.classList.remove('hidden');

        const accuracy = Math.round((this.quizScore / this.quizQuestions.length) * 100);
        
        document.getElementById('finalScore').textContent = `${this.quizScore}/${this.quizQuestions.length}`;
        document.getElementById('accuracy').textContent = accuracy + '%';
        
        // Add bonus points for quiz completion
        const bonusPoints = Math.round(this.quizScore * 2);
        this.addPoints(bonusPoints, 'Hoàn thành quiz');
        
        // Check for quiz master badge
        if (accuracy === 100 && !this.userProfile.badges.includes('quiz-master')) {
            this.userProfile.badges.push('quiz-master');
            this.addPoints(this.gamification.points.badgeEarned, 'Badge: Bậc thầy quiz');
            this.showBadgeNotification('quiz-master');
            this.saveUserProfile();
        }
    }

    reviewMistakes() {
        if (this.quizMistakes.length === 0) {
            this.showNotification('Bạn không có lỗi sai nào để xem lại!', 'success');
            return;
        }
        
        this.showMistakesModal();
    }

    showMistakesModal() {
        // Create modal if it doesn't exist
        let modal = document.getElementById('mistakesModal');
        if (!modal) {
            modal = this.createMistakesModal();
            document.body.appendChild(modal);
        }
        
        // Populate mistakes
        const mistakesList = modal.querySelector('#mistakesList');
        mistakesList.innerHTML = this.quizMistakes.map((mistake, index) => `
            <div class="mistake-item">
                <div class="mistake-question">
                    <h4>Câu ${index + 1}: ${mistake.question}</h4>
                </div>
                <div class="mistake-answers">
                    <div class="mistake-answer wrong">
                        <span class="answer-label">Bạn chọn:</span>
                        <span class="answer-text">${mistake.selected}</span>
                    </div>
                    <div class="mistake-answer correct">
                        <span class="answer-label">Đáp án đúng:</span>
                        <span class="answer-text">${mistake.correct}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        modal.style.display = 'flex';
    }

    createMistakesModal() {
        const modal = document.createElement('div');
        modal.id = 'mistakesModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Xem lại lỗi sai (${this.quizMistakes.length} lỗi)</h3>
                    <button class="btn btn--sm btn--outline" id="closeMistakesModal">✕</button>
                </div>
                <div class="modal-body">
                    <div id="mistakesList"></div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn--primary" id="retakeQuizFromMistakes">Làm lại bài kiểm tra</button>
                    <button class="btn btn--outline" id="closeMistakesModalBtn">Đóng</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.querySelector('#closeMistakesModal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        modal.querySelector('#closeMistakesModalBtn').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        modal.querySelector('#retakeQuizFromMistakes').addEventListener('click', () => {
            modal.style.display = 'none';
            this.startQuiz();
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        return modal;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">✕</button>
            </div>
        `;
        
        // Add to page
        if (!document.getElementById('notificationContainer')) {
            const container = document.createElement('div');
            container.id = 'notificationContainer';
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        document.getElementById('notificationContainer').appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }

    safeGetElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with id '${id}' not found`);
        }
        return element;
    }

    // Enhanced Scenario System
    loadScenarios() {
        console.log('🎭 loadScenarios() called');
        this.currentScenarioIndex = 0;
        this.currentCategory = null;
        this.filteredScenarios = [];
        this.completedScenarios = JSON.parse(localStorage.getItem('completedScenarios') || '[]');
        
        // Check if scenariosByCategory exists
        if (!this.scenariosByCategory) {
            console.error('❌ scenariosByCategory not initialized!');
            return;
        }
        console.log('✓ scenariosByCategory exists with', Object.keys(this.scenariosByCategory).length, 'categories');
        
        // Check if DOM elements exist
        const container = document.getElementById('scenarioCategoriesGrid');
        if (!container) {
            console.error('❌ scenarioCategoriesGrid element not found in DOM');
            return;
        }
        console.log('✓ scenarioCategoriesGrid element found');
        
        this.renderScenarioCategories();
        this.updateScenarioStats();
        this.setupScenarioEventListeners();
        console.log('🎭 loadScenarios() completed');
    }

    renderScenarioCategories() {
        console.log('📝 renderScenarioCategories() called');
        const container = document.getElementById('scenarioCategoriesGrid');
        if (!container) {
            console.error('❌ scenarioCategoriesGrid container not found');
            return;
        }
        
        container.innerHTML = '';
        console.log('🎨 Rendering', Object.keys(this.scenariosByCategory).length, 'categories');

        Object.entries(this.scenariosByCategory).forEach(([category, scenarios], index) => {
            const completedCount = this.completedScenarios.filter(id => 
                scenarios.some(scenario => this.getScenarioId(category, scenario) === id)
            ).length;
            
            const progress = scenarios.length > 0 ? Math.round((completedCount / scenarios.length) * 100) : 0;
            
            const categoryCard = document.createElement('div');
            categoryCard.className = 'scenario-category-card';
            categoryCard.style.animationDelay = `${index * 0.1}s`;
            categoryCard.innerHTML = `
                <h3>${this.getCategoryIcon(category)} ${category}</h3>
                <p>Luyện tập ${scenarios.length} tình huống thực tế trong lĩnh vực ${category.toLowerCase()}</p>
                <div class="scenario-category-stats">
                    <span class="scenario-count">${scenarios.length} tình huống</span>
                    <span class="progress">${progress}% hoàn thành</span>
                </div>
                <div class="scenario-category-progress-bar">
                    <div class="scenario-category-progress-fill" style="width: ${progress}%"></div>
                </div>
            `;
            
            categoryCard.addEventListener('click', () => {
                this.startCategoryScenarios(category);
            });
            
            // Add keyboard navigation
            categoryCard.setAttribute('tabindex', '0');
            categoryCard.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.startCategoryScenarios(category);
                }
            });
            
            container.appendChild(categoryCard);
        });
    }

    getCategoryIcon(category) {
        const icons = {
            'Allergies & Diet': '🚫',
            'Chuyên môn đồ uống': '🍷',
            'Dịch vụ khách hàng': '🤝',
            'Kỹ thuật chế biến': '👨‍🍳',
            'Marketing & Sales': '📈',
            'Phân loại thực đơn': '📋',
            'Phong cách phục vụ': '🍽️',
            'Quản lý khách sạn': '🏨',
            'Table Skills': '📞',
            'Vận hành bếp': '⚙️'
        };
        return icons[category] || '📚';
    }

    updateScenarioStats() {
        const totalScenarios = Object.values(this.scenariosByCategory).flat().length;
        const completedCount = this.completedScenarios.length;
        const filteredCount = this.currentCategory ? this.filteredScenarios.length : totalScenarios;
        
        const totalElement = document.getElementById('totalScenarioCount');
        const filteredElement = document.getElementById('filteredScenarioCount');
        const completedElement = document.getElementById('completedScenarioCount');
        
        // Animate numbers
        if (totalElement) this.animateNumber(totalElement, 0, totalScenarios, 800);
        if (filteredElement) this.animateNumber(filteredElement, 0, filteredCount, 800);
        if (completedElement) this.animateNumber(completedElement, 0, completedCount, 800);
    }
    
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const difference = end - start;
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuad = progress * (2 - progress);
            const current = Math.floor(start + difference * easeOutQuad);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        
        requestAnimationFrame(step);
    }

    setupScenarioEventListeners() {
        // Back button handler
        const backBtn = document.getElementById('scenarioBackBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.returnToCategoryList();
            });
        }
        
        // Navigation buttons
        const prevBtn = document.getElementById('prevScenario');
        const nextBtn = document.getElementById('nextScenario');
        const backToCategoriesBtn = document.getElementById('backToCategories');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentScenarioIndex > 0) {
                    this.currentScenarioIndex--;
                    this.showCurrentScenario();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextScenario();
            });
        }
        
        if (backToCategoriesBtn) {
            backToCategoriesBtn.addEventListener('click', () => {
                this.returnToCategoryList();
            });
        }
    }
    
    returnToCategoryList() {
        // Cleanup keyboard handler
        if (this.scenarioKeyHandler) {
            document.removeEventListener('keydown', this.scenarioKeyHandler);
            this.scenarioKeyHandler = null;
        }
        
        // Clear any auto-redirect countdown
        if (this.completionCountdownInterval) {
            clearInterval(this.completionCountdownInterval);
            this.completionCountdownInterval = null;
        }
        
        // Hide scenario container, show categories
        document.getElementById('currentScenarioContainer').style.display = 'none';
        document.getElementById('scenarioCategoriesGrid').style.display = 'grid';
        
        // Reset state
        this.currentCategory = null;
        this.currentScenarioIndex = 0;
        this.filteredScenarios = [];
        
        // Refresh categories and stats
        this.renderScenarioCategories();
        this.updateScenarioStats();
    }

    startCategoryScenarios(category) {
        this.currentCategory = category;
        this.filteredScenarios = [...this.scenariosByCategory[category]];
        this.currentScenarioIndex = 0;
        
        document.getElementById('scenarioCategoriesGrid').style.display = 'none';
        document.getElementById('currentScenarioContainer').style.display = 'block';
        
        this.showCurrentScenario();
    }

    showCurrentScenario() {
        if (this.currentScenarioIndex >= this.filteredScenarios.length) {
            this.showScenarioCompletion();
            return;
        }

        const scenario = this.filteredScenarios[this.currentScenarioIndex];
        
        // Update scenario header
        document.getElementById('currentScenarioCategory').textContent = this.currentCategory;
        document.getElementById('currentScenarioLevel').textContent = this.getLevelLabel(scenario.level);
        document.getElementById('scenarioProgress').textContent = `${this.currentScenarioIndex + 1}/${this.filteredScenarios.length}`;
        
        // Update scenario content
        document.getElementById('scenarioTitle').textContent = scenario.title;
        document.getElementById('scenarioSituation').textContent = scenario.situation;

        const letters = ['A', 'B', 'C', 'D'];
        
        // Update each choice - get fresh NodeList each time to avoid stale references after cloning
        for (let index = 0; index < 4; index++) {
            const choices = document.querySelectorAll('.scenario-choice');
            const choice = choices[index];
            
            if (scenario.options[index]) {
                // Remove old listeners by cloning first
                const newChoice = choice.cloneNode(true);
                choice.parentNode.replaceChild(newChoice, choice);
                
                // Set content and attributes on the new cloned element
                newChoice.innerHTML = `<span class="choice-letter">${letters[index]}</span>${scenario.options[index]}`;
                newChoice.setAttribute('data-number', letters[index]);
                newChoice.classList.remove('selected', 'correct', 'incorrect');
                newChoice.disabled = false;
                newChoice.style.display = 'block';
                newChoice.setAttribute('tabindex', '0');
                
                // Add click handler
                newChoice.addEventListener('click', (e) => this.selectScenarioChoice(e));
                
                // Add keyboard handler
                newChoice.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.selectScenarioChoice(e);
                    }
                });
            } else {
                choice.style.display = 'none';
            }
        }

        document.getElementById('scenarioFeedback').classList.add('hidden');
        
        // Update navigation buttons
        document.getElementById('prevScenario').disabled = this.currentScenarioIndex === 0;
        document.getElementById('nextScenario').textContent = 
            this.currentScenarioIndex === this.filteredScenarios.length - 1 ? 'Hoàn thành' : 'Tiếp theo →';
            
        // Add keyboard navigation for 1,2,3,4 keys
        this.setupScenarioKeyboardNavigation();
    }

    getLevelLabel(level) {
        const labels = {
            'basic': '🟢 Cơ bản',
            'intermediate': '🟡 Trung cấp',
            'advanced': '🔴 Nâng cao'
        };
        return labels[level] || '🟢 Cơ bản';
    }

    selectScenarioChoice(e) {
        const selectedChoice = e.target.closest('.scenario-choice');
        if (!selectedChoice || selectedChoice.disabled) return;
        
        const choices = document.querySelectorAll('.scenario-choice');
        const selectedIndex = Array.from(choices).indexOf(selectedChoice);
        const scenario = this.filteredScenarios[this.currentScenarioIndex];
        
        // Mark as selected
        choices.forEach(choice => {
            choice.classList.remove('selected');
        });
        selectedChoice.classList.add('selected');

        // Disable all choices
        choices.forEach(choice => {
            choice.disabled = true;
        });

        // Check if correct after animation
        setTimeout(() => {
            const isCorrect = selectedIndex === scenario.correct;
            
            // Show correct/incorrect visual feedback
            if (isCorrect) {
                selectedChoice.classList.add('correct');
                // Update choice letter to show checkmark
                const choiceLetter = selectedChoice.querySelector('.choice-letter');
                if (choiceLetter) choiceLetter.textContent = '✓';
                this.showNotification('Chính xác! 🎉', 'success');
            } else {
                selectedChoice.classList.add('incorrect');
                // Update choice letter to show X
                const choiceLetter = selectedChoice.querySelector('.choice-letter');
                if (choiceLetter) choiceLetter.textContent = '✗';
                // Also highlight correct answer
                choices[scenario.correct].classList.add('correct');
                const correctChoiceLetter = choices[scenario.correct].querySelector('.choice-letter');
                if (correctChoiceLetter) correctChoiceLetter.textContent = '✓';
                this.showNotification('Không chính xác. Xem đáp án đúng.', 'error');
            }

            // Show explanation
            setTimeout(() => {
                const feedback = document.getElementById('scenarioFeedback');
                const explanation = document.getElementById('scenarioExplanation');
                const phrasesList = document.getElementById('phrasesList');
                
                // Generate detailed feedback using template structure
                const detailedFeedback = this.generateDetailedFeedback(scenario, isCorrect);
                explanation.innerHTML = detailedFeedback;

                // Add key phrases if available
                if (scenario.keyPhrases && phrasesList) {
                    phrasesList.innerHTML = scenario.keyPhrases.map(phrase => {
                        // Handle both string and object formats
                        if (typeof phrase === 'string') {
                            return `<span class="key-phrase">
                                <span class="term-english">${phrase}</span>
                                <span class="term-vietnamese">${this.getVietnameseTranslation(phrase)}</span>
                            </span>`;
                        } else if (phrase && phrase.english && phrase.vietnamese) {
                            return `<span class="key-phrase">
                                <span class="term-english">${phrase.english}</span>
                                <span class="term-vietnamese">${phrase.vietnamese}</span>
                            </span>`;
                        } else {
                            return `<span class="key-phrase">
                                <span class="term-english">${phrase || 'N/A'}</span>
                                <span class="term-vietnamese">N/A</span>
                            </span>`;
                        }
                    }).join('');
                }

                feedback.classList.remove('hidden');
            }, 600);
        }, 300);
    }

    generateDetailedFeedback(scenario, isCorrect) {
        const correctAnswer = scenario.options[scenario.correct];
        const situationKeywords = this.extractKeywords(scenario.situation);
        
        return `
            <div class="detailed-feedback">
                <p class="feedback-intro">Dưới đây là phân tích và hướng dẫn trả lời cho tình huống <strong>${scenario.title}</strong> — ${situationKeywords}. Đây là tình huống dịch vụ F&B, yêu cầu phản hồi đúng quy trình an toàn thực phẩm và chăm sóc khách hàng.</p>
                
                <hr class="feedback-divider">
                
                <h4 class="feedback-section-title">🧩 Mục tiêu của câu hỏi</h4>
                <p class="feedback-objective"><strong>Kiểm tra cách xử lý tình huống với ${scenario.title.toLowerCase()}</strong> — bạn cần phản hồi:</p>
                <ul class="feedback-requirements">
                    <li><strong>Chuyên nghiệp</strong></li>
                    <li><strong>Đảm bảo an toàn tuyệt đối</strong></li>
                    <li><strong>Tư vấn món phù hợp / xác nhận quy trình bếp</strong></li>
                </ul>
                
                <hr class="feedback-divider">
                
                <h4 class="feedback-section-title">❗ Nội dung câu hỏi</h4>
                <blockquote class="feedback-question">${scenario.situation}</blockquote>
                
                <hr class="feedback-divider">
                
                <h4 class="feedback-section-title">✅ Lựa chọn đúng nhất</h4>
                <p class="correct-answer"><strong>👉 "${correctAnswer}"</strong></p>
                
                <hr class="feedback-divider">
                
                <h4 class="feedback-section-title">❌ Vì sao các lựa chọn khác sai?</h4>
                <div class="incorrect-analysis">
                    ${scenario.options.map((option, index) => {
                        if (index === scenario.correct) return '';
                        return `
                            <div class="incorrect-option">
                                <strong>${option}</strong>
                                <p class="incorrect-reason">${this.getIncorrectReason(scenario.title, option)}</p>
                            </div>
                        `;
                    }).filter(Boolean).join('')}
                </div>
                
                <hr class="feedback-divider">
                
                <h4 class="feedback-section-title">🎯 Cách trả lời chuẩn (First Principles – Dịch vụ F&B)</h4>
                <div class="standard-approach">
                    <div class="approach-principles">
                        <div class="principle">
                            <strong>An toàn thực phẩm</strong>
                            <p>Kiểm tra quy trình bếp, xác nhận không nhiễm chéo</p>
                        </div>
                        <div class="principle">
                            <strong>Đồng cảm & trấn an</strong>
                            <p>Giải thích cẩn trọng: "Chúng tôi hiểu lo lắng của bạn…"</p>
                        </div>
                        <div class="principle">
                            <strong>Gợi ý có trách nhiệm</strong>
                            <p>Chỉ đề xuất món khi chắc chắn (theo menu an toàn)</p>
                        </div>
                        <div class="principle">
                            <strong>Minh bạch</strong>
                            <p>Nếu không chắc, hỏi lại bếp hoặc chef</p>
                        </div>
                    </div>
                </div>
                
                <div class="example-response">
                    <h5>🗣 Ví dụ câu nói nên dùng:</h5>
                    <blockquote class="example-quote">${this.getExampleResponse(scenario.title)}</blockquote>
                </div>
                
                <hr class="feedback-divider">
                
                <div class="conclusion">
                    <h4 class="feedback-section-title">🧭 Kết luận MECE</h4>
                    <div class="mece-table">
                        <div class="mece-item">
                            <strong>An toàn</strong>
                            <p>Xác nhận quy trình và tránh nhiễm chéo</p>
                        </div>
                        <div class="mece-item">
                            <strong>Giao tiếp</strong>
                            <p>Trấn an + tham khảo bếp trước khi tư vấn</p>
                        </div>
                        <div class="mece-item">
                            <strong>Tư vấn</strong>
                            <p>Gợi ý món phù hợp, minh bạch thông tin</p>
                        </div>
                        <div class="mece-item">
                            <strong>Tránh sai lầm</strong>
                            <p>Không đoán bừa, không hỏi thuốc cá nhân</p>
                        </div>
                    </div>
                </div>
                
                ${isCorrect ? '<div class="success-message">🎉 <strong>Tuyệt vời!</strong> Bạn đã xử lý tình huống một cách chuyên nghiệp!</div>' : '<div class="improvement-message">💡 <strong>Học hỏi:</strong> Đây là cơ hội để cải thiện kỹ năng xử lý tình huống!</div>'}
            </div>
        `;
    }

    extractKeywords(situation) {
        // Extract key terms from situation for better context
        const keywords = [];
        if (situation.includes('gluten')) keywords.push('**không chứa gluten**');
        if (situation.includes('dị ứng')) keywords.push('**dị ứng nghiêm trọng**');
        if (situation.includes('allergy')) keywords.push('**allergy concerns**');
        return keywords.length > 0 ? keywords.join(' và ') : 'tình huống dịch vụ khách hàng';
    }

    getIncorrectReason(scenarioTitle, option) {
        // Provide specific reasons why other options are incorrect
        const reasons = {
            'Chỉ gợi ý salad để an toàn nhất': 'Đơn giản hóa vấn đề - Salad chưa chắc an toàn (nguy cơ nhiễm chéo)',
            'Hỏi khách mang thuốc chống dị ứng chưa': 'Thiếu chuyên nghiệp - Lệch trọng tâm, gây lo lắng, không phải trách nhiệm chính của nhà hàng',
            'Gợi ý rượu vang phù hợp theo ngân sách và món ăn, kèm lời chúc mừng': 'Không phù hợp - Tập trung vào bán hàng thay vì an toàn khách hàng',
            'Gợi ý rượu đắt nhất để tăng doanh thu': 'Không phù hợp - Ưu tiên lợi nhuận thay vì nhu cầu khách hàng'
        };
        return reasons[option] || 'Không phù hợp với tình huống và nguyên tắc dịch vụ khách hàng chuyên nghiệp';
    }

    getExampleResponse(scenarioTitle) {
        // Provide example responses based on scenario type
        const examples = {
            'Khách dị ứng gluten': '"Cảm ơn anh/chị đã chia sẻ. Chúng tôi có các món không chứa gluten và bếp của chúng tôi tuân thủ quy trình nghiêm ngặt để tránh nhiễm chéo. Tôi xin kiểm tra lại với bếp và sẽ giới thiệu món an toàn nhất cho anh/chị."',
            'Gợi ý rượu vang': '"Cảm ơn anh/chị đã tin tưởng. Dựa trên món ăn anh/chị chọn và ngân sách phù hợp, tôi xin gợi ý [tên rượu] - đây là lựa chọn hoàn hảo để kỷ niệm ngày đặc biệt này. Chúc anh/chị một bữa tối tuyệt vời!"'
        };
        return examples[scenarioTitle] || '"Cảm ơn anh/chị đã tin tưởng dịch vụ của chúng tôi. Tôi sẽ hỗ trợ anh/chị một cách tốt nhất có thể."';
    }
    
    setupScenarioKeyboardNavigation() {
        // Remove old keyboard listener if exists
        if (this.scenarioKeyHandler) {
            document.removeEventListener('keydown', this.scenarioKeyHandler);
        }
        
        this.scenarioKeyHandler = (e) => {
            // ESC key to go back
            if (e.key === 'Escape') {
                e.preventDefault();
                this.returnToCategoryList();
                return;
            }
            
            const choices = document.querySelectorAll('.scenario-choice:not([style*="display: none"])');
            const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'A': 0, 'b': 1, 'B': 1, 'c': 2, 'C': 2, 'd': 3, 'D': 3 };
            
            if (keyMap.hasOwnProperty(e.key)) {
                const index = keyMap[e.key];
                if (choices[index] && !choices[index].disabled) {
                    e.preventDefault();
                    choices[index].click();
                }
            }
        };
        
        document.addEventListener('keydown', this.scenarioKeyHandler);
    }

    nextScenario() {
        this.currentScenarioIndex++;
        this.showCurrentScenario();
    }
    
    showScenarioCompletion() {
        const container = document.getElementById('currentScenarioContainer');
        const scenarioCard = container.querySelector('.scenario-card');
        
        const categoryScenarios = this.filteredScenarios.length;
        const completedIds = this.filteredScenarios.map((scenario, index) => 
            this.getScenarioId(this.currentCategory, scenario)
        );
        
        // Mark all as completed
        completedIds.forEach(id => {
            if (!this.completedScenarios.includes(id)) {
                this.completedScenarios.push(id);
            }
        });
        localStorage.setItem('completedScenarios', JSON.stringify(this.completedScenarios));
        
        // Show completion screen with countdown
        scenarioCard.innerHTML = `
            <div style="text-align: center; padding: var(--space-48) var(--space-24);">
                <div style="font-size: 80px; margin-bottom: var(--space-24); animation: bounceIn 0.6s ease;">
                    🎉
                </div>
                <h2 style="color: var(--color-success); margin-bottom: var(--space-16); font-size: var(--font-size-3xl);">
                    Xuất sắc!
                </h2>
                <p style="font-size: var(--font-size-lg); color: var(--color-text); margin-bottom: var(--space-16);">
                    Bạn đã hoàn thành ${categoryScenarios} tình huống trong chuyên mục<br>
                    <strong>${this.currentCategory}</strong>
                </p>
                <div class="completion-countdown" style="margin-bottom: var(--space-32);">
                    <div class="countdown-circle" id="countdownCircle">
                        <svg width="80" height="80" style="transform: rotate(-90deg);">
                            <circle cx="40" cy="40" r="35" stroke="#e5e7eb" stroke-width="6" fill="none"></circle>
                            <circle id="countdownProgress" cx="40" cy="40" r="35" stroke="var(--color-primary)" 
                                    stroke-width="6" fill="none" stroke-dasharray="220" stroke-dashoffset="0"
                                    style="transition: stroke-dashoffset 1s linear;"></circle>
                        </svg>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-primary);">
                            <span id="countdownNumber">5</span>
                        </div>
                    </div>
                    <p style="font-size: var(--font-size-base); color: var(--color-text-secondary); margin-top: var(--space-12);">
                        Tự động quay lại trong <strong id="countdownText">5</strong> giây...
                    </p>
                </div>
                <div style="display: flex; gap: var(--space-16); justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn--primary btn--lg" id="backToCategoriesBtn">
                        Quay lại ngay
                    </button>
                    <button class="btn btn--outline btn--lg" id="retryCategory">
                        Luyện tập lại
                    </button>
                </div>
            </div>
        `;
        
        // Auto-redirect countdown with circular progress
        let countdown = 5;
        const progressCircle = document.getElementById('countdownProgress');
        const circumference = 2 * Math.PI * 35; // r = 35
        
        const countdownInterval = setInterval(() => {
            countdown--;
            const countdownElement = document.getElementById('countdownNumber');
            const countdownTextElement = document.getElementById('countdownText');
            
            if (countdownElement) {
                countdownElement.textContent = countdown;
            }
            if (countdownTextElement) {
                countdownTextElement.textContent = countdown;
            }
            
            // Update circular progress
            if (progressCircle) {
                const progress = (countdown / 5) * circumference;
                progressCircle.style.strokeDashoffset = circumference - progress;
            }
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                this.returnToCategoryList();
            }
        }, 1000);
        
        // Store interval ID for cleanup
        this.completionCountdownInterval = countdownInterval;
        
        // Add event listeners
        document.getElementById('backToCategoriesBtn').addEventListener('click', () => {
            clearInterval(countdownInterval);
            this.returnToCategoryList();
        });
        
        document.getElementById('retryCategory').addEventListener('click', () => {
            clearInterval(countdownInterval);
            this.currentScenarioIndex = 0;
            this.showCurrentScenario();
        });
        
        // Update stats
        this.updateScenarioStats();
        
        // Check for badge
        const totalCompleted = this.completedScenarios.length;
        if (totalCompleted >= 10 && !this.userProfile.badges.includes('scenario-solver')) {
            this.userProfile.badges.push('scenario-solver');
            this.addPoints(this.gamification.points.badgeEarned, 'Badge: Giải quyết tình huống');
            this.showBadgeNotification('scenario-solver');
            this.saveUserProfile();
        }
    }
    
    getScenarioId(category, scenario) {
        return `${category}-${scenario.title}`.replace(/\s+/g, '-').toLowerCase();
    }

    renderCareerPaths() {
        const frontOfficeContainer = document.getElementById('frontOfficeCareer');
        const foodBeverageContainer = document.getElementById('foodBeverageCareer');

        this.careerPath.frontOffice.forEach(position => {
            const div = this.createCareerElement(position);
            frontOfficeContainer.appendChild(div);
        });

        this.careerPath.foodBeverage.forEach(position => {
            const div = this.createCareerElement(position);
            foodBeverageContainer.appendChild(div);
        });
    }

    createCareerElement(position) {
        const div = document.createElement('div');
        div.className = 'career-level';
        div.innerHTML = `
            <h4>${position.position}</h4>
            <span class="level-badge">${position.level}</span>
            <p>${position.requirements}</p>
        `;
        return div;
    }

    renderCulturalTips() {
        const container = document.getElementById('cultureTips');
        
        this.culturalTips.forEach(tip => {
            const div = document.createElement('div');
            div.className = 'culture-tip';
            
            const ul = document.createElement('ul');
            tip.tips.forEach(tipText => {
                const li = document.createElement('li');
                li.textContent = tipText;
                ul.appendChild(li);
            });

            div.innerHTML = `<h3>${tip.culture}</h3>`;
            div.appendChild(ul);
            container.appendChild(div);
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const closeSearch = document.getElementById('closeSearch');
        
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        closeSearch.addEventListener('click', () => {
            this.hideSearchResults();
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchResults();
            }
        });
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        const allTerms = Object.entries(this.vocabularyData).flatMap(([level, terms]) => 
            terms.map(term => ({...term, level}))
        );

        this.searchResults = allTerms.filter(term => 
            term.english.toLowerCase().includes(query.toLowerCase()) ||
            term.vietnamese.toLowerCase().includes(query.toLowerCase()) ||
            term.category.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults();
    }

    displaySearchResults() {
        const searchResults = document.getElementById('searchResults');
        const searchResultsList = document.getElementById('searchResultsList');
        
        if (this.searchResults.length === 0) {
            searchResultsList.innerHTML = '<p class="no-results">Không tìm thấy kết quả nào</p>';
        } else {
            searchResultsList.innerHTML = this.searchResults.map(term => `
                <div class="search-result-item" data-term="${term.english}" data-level="${term.level}">
                    <div class="search-result-main">
                        <h5>${term.english}</h5>
                        <p class="search-result-vietnamese">${term.vietnamese}</p>
                    </div>
                    <div class="search-result-meta">
                        <span class="search-result-category">${term.category}</span>
                        <span class="search-result-level">${this.getLevelDisplayName(term.level)}</span>
                    </div>
                </div>
            `).join('');
            
            // Add click handlers to search results
            searchResultsList.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const term = item.dataset.term;
                    const level = item.dataset.level;
                    this.navigateToTerm(term, level);
                    this.hideSearchResults();
                });
            });
        }
        
        searchResults.style.display = 'block';
    }

    hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        searchResults.style.display = 'none';
    }

    getLevelDisplayName(level) {
        const levelNames = {
            'basic': 'Cơ bản',
            'intermediate': 'Trung cấp',
            'advanced': 'Nâng cao'
        };
        return levelNames[level] || level;
    }

    navigateToTerm(term, level) {
        // Navigate to vocabulary section with specific term
        this.loadVocabularySection(level);
        this.showSection('vocabulary');
        
        // Find and display the specific term
        const terms = this.vocabularyData[level];
        const termIndex = terms.findIndex(t => t.english === term);
        if (termIndex !== -1) {
            this.currentCardIndex = termIndex;
            this.updateFlashcard();
        }
    }

    // Enhanced Learning System Methods
    loadUserProfile() {
        const savedProfile = localStorage.getItem('hospitalityUserProfile');
        if (savedProfile) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(savedProfile) };
        }
        this.saveUserProfile();
    }

    saveUserProfile() {
        localStorage.setItem('hospitalityUserProfile', JSON.stringify(this.userProfile));
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastActive = new Date(this.userProfile.lastActiveDate);
        const todayDate = new Date(today);
        const diffTime = todayDate - lastActive;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            this.userProfile.streak++;
            this.userProfile.lastActiveDate = today;
            this.saveUserProfile();
        } else if (diffDays > 1) {
            this.userProfile.streak = 1;
            this.userProfile.lastActiveDate = today;
            this.saveUserProfile();
        }
    }

    addPoints(points, reason, applyStreakMultiplier = true) {
        let finalPoints = points;
        
        // Apply streak multiplier if enabled
        if (applyStreakMultiplier) {
            const multiplier = this.getStreakMultiplier();
            if (multiplier > 1) {
                finalPoints = Math.round(points * multiplier);
                this.showNotification(`🔥 Chuỗi ${this.userProfile.streak} ngày! +${finalPoints} điểm (x${multiplier})! ${reason}`, 'success');
            } else {
                this.showNotification(`+${finalPoints} điểm! ${reason}`, 'success');
            }
        } else {
            this.showNotification(`+${finalPoints} điểm! ${reason}`, 'success');
        }
        
        this.userProfile.totalPoints += finalPoints;
        this.userProfile.experience += finalPoints;
        this.saveUserProfile();
        this.checkBadges();
        
        return finalPoints;
    }
    
    getStreakMultiplier() {
        const streak = this.userProfile.streak;
        if (streak >= 60) return 2.0; // 60+ days: 2x multiplier
        if (streak >= 30) return 1.8; // 30+ days: 1.8x multiplier
        if (streak >= 14) return 1.5; // 14+ days: 1.5x multiplier
        if (streak >= 7) return 1.2;  // 7+ days: 1.2x multiplier
        return 1.0; // No multiplier
    }
    
    // Enhanced point system with new XP sources
    awardScenarioPerfectScore() {
        const points = 15;
        return this.addPoints(points, 'Điểm hoàn hảo trong tình huống', true);
    }
    
    awardPeerHelp() {
        const points = 3;
        return this.addPoints(points, 'Giúp đỡ đồng nghiệp', false);
    }
    
    awardDailyReviewCompletion() {
        const points = 5;
        return this.addPoints(points, 'Hoàn thành ôn tập hàng ngày', true);
    }
    
    awardModuleCompletionStreak() {
        const points = 10;
        return this.addPoints(points, 'Hoàn thành module liên tục', true);
    }
    
    awardPerfectWeek() {
        const points = 50;
        return this.addPoints(points, 'Tuần hoàn hảo - 7 ngày học liên tục', true);
    }
    
    awardSpeedBonus(timeSpent, maxTime) {
        const timeRatio = timeSpent / maxTime;
        let bonus = 0;
        
        if (timeRatio <= 0.3) bonus = 10; // Very fast
        else if (timeRatio <= 0.5) bonus = 5; // Fast
        else if (timeRatio <= 0.7) bonus = 2; // Normal
        
        if (bonus > 0) {
            return this.addPoints(bonus, 'Thưởng tốc độ', false);
        }
        return 0;
    }
    
    awardAccuracyBonus(accuracy) {
        let bonus = 0;
        
        if (accuracy === 100) bonus = 20; // Perfect score
        else if (accuracy >= 95) bonus = 10; // Excellent
        else if (accuracy >= 90) bonus = 5; // Good
        
        if (bonus > 0) {
            return this.addPoints(bonus, 'Thưởng độ chính xác', true);
        }
        return 0;
    }
    
    awardMilestoneBonus(milestone) {
        const milestones = {
            10: 25,   // 10 lessons
            25: 50,   // 25 lessons
            50: 100,  // 50 lessons
            100: 200, // 100 lessons
            250: 500, // 250 lessons
            500: 1000 // 500 lessons
        };
        
        const bonus = milestones[milestone];
        if (bonus) {
            return this.addPoints(bonus, `Cột mốc ${milestone} bài học`, false);
        }
        return 0;
    }

    checkBadges() {
        const newBadges = [];
        const completedModules = this.userProfile.completedModules.length;
        const totalPoints = this.userProfile.totalPoints;
        const streak = this.userProfile.streak;
        
        // Check for new badges
        if (this.userProfile.totalPoints >= 10 && !this.userProfile.badges.includes('first-lesson')) {
            newBadges.push('first-lesson');
        }
        
        // Milestone badges
        if (completedModules >= 50 && !this.userProfile.badges.includes('milestone-50')) {
            newBadges.push('milestone-50');
        }
        
        if (totalPoints >= 1000 && !this.userProfile.badges.includes('milestone-1000')) {
            newBadges.push('milestone-1000');
        }
        
        // Streak badges
        if (this.userProfile.streak >= 7 && !this.userProfile.badges.includes('streak-7')) {
            newBadges.push('streak-7');
        }
        
        if (this.userProfile.streak >= 14 && !this.userProfile.badges.includes('streak-14')) {
            newBadges.push('streak-14');
        }
        
        if (this.userProfile.streak >= 30 && !this.userProfile.badges.includes('streak-30')) {
            newBadges.push('streak-30');
        }
        
        if (this.userProfile.streak >= 60 && !this.userProfile.badges.includes('streak-60')) {
            newBadges.push('streak-60');
        }
        
        if (this.learnedTerms.size >= 100 && !this.userProfile.badges.includes('vocabulary-expert')) {
            newBadges.push('vocabulary-expert');
        }

        // Add new badges
        newBadges.forEach(badgeId => {
            this.userProfile.badges.push(badgeId);
            this.addPoints(this.gamification.points.badgeEarned, `Badge: ${this.gamification.badges[badgeId].name}`);
            this.showBadgeNotification(badgeId);
        });

        if (newBadges.length > 0) {
            this.saveUserProfile();
        }
    }

    showBadgeNotification(badgeId) {
        const badge = this.gamification.badges[badgeId];
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.innerHTML = `
            <div class="badge-content">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-info">
                    <h4>Badge mới!</h4>
                    <p>${badge.name}</p>
                    <small>${badge.description}</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    renderLearningPath() {
        // Removed - Learning Path section has been removed
        // this.renderEnhancedLearningPath();
    }

    initializeRoadmap() {
        // Define the 9 hospitality modules with enhanced metadata
        this.roadmapModules = [
            { 
                id: 1, 
                title: "Nghiệp vụ Lễ tân", 
                key: "reception", 
                icon: "bell", 
                gradient: "from-sky-300 to-sky-500", 
                stage: 1,
                difficulty: "basic",
                estimatedTime: "2-3 giờ",
                lessons: 8,
                skills: ["Check-in/Check-out", "Reservation Management", "Guest Services"],
                prerequisites: []
            },
            { 
                id: 2, 
                title: "Nghiệp vụ Buồng phòng", 
                key: "housekeeping", 
                icon: "broom", 
                gradient: "from-emerald-300 to-emerald-500", 
                stage: 1,
                difficulty: "basic",
                estimatedTime: "2-4 giờ",
                lessons: 6,
                skills: ["Room Cleaning", "Maintenance", "Guest Requests"],
                prerequisites: []
            },
            { 
                id: 3, 
                title: "Nghiệp vụ Ẩm thực", 
                key: "fnb", 
                icon: "utensils", 
                gradient: "from-rose-300 to-rose-500", 
                stage: 1,
                difficulty: "intermediate",
                estimatedTime: "3-5 giờ",
                lessons: 10,
                skills: ["Menu Knowledge", "Service Standards", "Wine Pairing"],
                prerequisites: []
            },
            { 
                id: 4, 
                title: "Kỹ năng Đặt bàn", 
                key: "reservation", 
                icon: "phone", 
                gradient: "from-violet-300 to-violet-500", 
                stage: 2,
                difficulty: "basic",
                estimatedTime: "1-2 giờ",
                lessons: 4,
                skills: ["Phone Etiquette", "Booking Systems", "Customer Service"],
                prerequisites: ["reception"]
            },
            { 
                id: 5, 
                title: "Dị ứng & Chế độ ăn", 
                key: "allergy", 
                icon: "heart-pulse", 
                gradient: "from-cyan-300 to-blue-500", 
                stage: 2,
                difficulty: "intermediate",
                estimatedTime: "2-3 giờ",
                lessons: 6,
                skills: ["Allergy Awareness", "Dietary Requirements", "Safety Protocols"],
                prerequisites: ["fnb"]
            },
            { 
                id: 6, 
                title: "Dịch vụ Khách hàng", 
                key: "customer-service", 
                icon: "headphones", 
                gradient: "from-amber-300 to-amber-500", 
                stage: 2,
                difficulty: "intermediate",
                estimatedTime: "3-4 giờ",
                lessons: 8,
                skills: ["Conflict Resolution", "Communication", "Problem Solving"],
                prerequisites: ["reception"]
            },
            { 
                id: 7, 
                title: "Nghiệp vụ Nhà hàng", 
                key: "restaurant", 
                icon: "wine", 
                gradient: "from-red-300 to-red-500", 
                stage: 3,
                difficulty: "advanced",
                estimatedTime: "4-6 giờ",
                lessons: 12,
                skills: ["Fine Dining", "Wine Service", "Table Management"],
                prerequisites: ["fnb", "customer-service"]
            },
            { 
                id: 8, 
                title: "An toàn Thực phẩm", 
                key: "food-safety", 
                icon: "shield-check", 
                gradient: "from-blue-300 to-blue-500", 
                stage: 3,
                difficulty: "intermediate",
                estimatedTime: "2-3 giờ",
                lessons: 5,
                skills: ["HACCP", "Food Handling", "Safety Standards"],
                prerequisites: ["fnb", "allergy"]
            },
            { 
                id: 9, 
                title: "Quản lý Khách sạn", 
                key: "hotel-management", 
                icon: "building-2", 
                gradient: "from-indigo-300 to-indigo-500", 
                stage: 3,
                difficulty: "advanced",
                estimatedTime: "6-8 giờ",
                lessons: 15,
                skills: ["Leadership", "Operations", "Strategic Planning"],
                prerequisites: ["reception", "fnb", "customer-service"]
            },
        ];

        // Initialize achievement system
        this.achievements = this.loadAchievements();

        // Initialize module status from localStorage
        this.roadmapStatus = this.loadRoadmapStatus();
        
        // Check unlock rule: module 9 unlocked when 8 modules are done
        const doneCount = Object.values(this.roadmapStatus).filter(status => status === "done").length;
        const unlocked = doneCount >= 8;
        
        if (unlocked && this.roadmapStatus["hotel-management"] === "locked") {
            this.roadmapStatus["hotel-management"] = "todo";
            this.saveRoadmapStatus();
        } else if (!unlocked) {
            this.roadmapStatus["hotel-management"] = "locked";
        }
    }

    loadRoadmapStatus() {
        try {
            const stored = localStorage.getItem("roadmap-status-v1");
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn("Could not load roadmap status from localStorage");
        }
        
        // Default status: first module doing, last module locked, others todo
        const defaultStatus = {};
        this.roadmapModules.forEach(module => {
            if (module.id === 1) {
                defaultStatus[module.key] = "doing";
            } else if (module.id === 9) {
                defaultStatus[module.key] = "locked";
            } else {
                defaultStatus[module.key] = "todo";
            }
        });
        
        return defaultStatus;
    }

    saveRoadmapStatus() {
        try {
            localStorage.setItem("roadmap-status-v1", JSON.stringify(this.roadmapStatus));
        } catch (e) {
            console.warn("Could not save roadmap status to localStorage");
        }
    }

    loadAchievements() {
        try {
            const stored = localStorage.getItem("roadmap-achievements-v1");
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn("Could not load achievements from localStorage");
        }
        
        return {
            firstModule: false,
            stage1Complete: false,
            stage2Complete: false,
            stage3Complete: false,
            allModules: false,
            streak7: false,
            streak30: false,
            speedLearner: false,
            perfectionist: false
        };
    }

    saveAchievements() {
        try {
            localStorage.setItem("roadmap-achievements-v1", JSON.stringify(this.achievements));
        } catch (e) {
            console.warn("Could not save achievements to localStorage");
        }
    }

    checkAchievements() {
        const doneCount = Object.values(this.roadmapStatus).filter(status => status === "done").length;
        const totalCount = this.roadmapModules.length;
        
        // First module completed
        if (doneCount >= 1 && !this.achievements.firstModule) {
            this.achievements.firstModule = true;
            this.showAchievement("🎉 Chúc mừng!", "Bạn đã hoàn thành module đầu tiên!");
        }
        
        // Stage 1 complete (modules 1-3)
        const stage1Done = [1, 2, 3].every(id => {
            const module = this.roadmapModules.find(m => m.id === id);
            return module && this.roadmapStatus[module.key] === "done";
        });
        if (stage1Done && !this.achievements.stage1Complete) {
            this.achievements.stage1Complete = true;
            this.showAchievement("🏆 Chặng 1 Hoàn thành!", "Bạn đã hoàn thành tất cả module cơ bản!");
        }
        
        // Stage 2 complete (modules 4-6)
        const stage2Done = [4, 5, 6].every(id => {
            const module = this.roadmapModules.find(m => m.id === id);
            return module && this.roadmapStatus[module.key] === "done";
        });
        if (stage2Done && !this.achievements.stage2Complete) {
            this.achievements.stage2Complete = true;
            this.showAchievement("🌟 Chặng 2 Hoàn thành!", "Bạn đã hoàn thành tất cả module trung cấp!");
        }
        
        // Stage 3 complete (modules 7-9)
        const stage3Done = [7, 8, 9].every(id => {
            const module = this.roadmapModules.find(m => m.id === id);
            return module && this.roadmapStatus[module.key] === "done";
        });
        if (stage3Done && !this.achievements.stage3Complete) {
            this.achievements.stage3Complete = true;
            this.showAchievement("👑 Chặng 3 Hoàn thành!", "Bạn đã hoàn thành tất cả module nâng cao!");
        }
        
        // All modules complete
        if (doneCount === totalCount && !this.achievements.allModules) {
            this.achievements.allModules = true;
            this.showAchievement("🎊 Hoàn thành toàn bộ!", "Chúc mừng! Bạn đã hoàn thành tất cả module!");
        }
        
        this.saveAchievements();
    }

    showAchievement(title, message) {
        // Create achievement notification
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${title}</div>
                <div class="achievement-text">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }

    renderRoadmapStages() {
        const stagesContainer = document.getElementById('roadmapStages');
        if (!stagesContainer) return;

        // Group modules by stage
        const grouped = [1, 2, 3].map(stage => 
            this.roadmapModules.filter(m => m.stage === stage)
        );

        stagesContainer.innerHTML = grouped.map((modules, stageIndex) => `
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <div class="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                    <div class="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <svg class="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                        <span>Chặng ${stageIndex + 1}</span>
                    </div>
                    <div class="flex-1 h-px bg-gradient-to-l from-slate-200 to-transparent"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${modules.map(module => this.renderModuleCard(module)).join('')}
                </div>
            </div>
        `).join('');
    }

    renderModuleCard(module) {
        const status = this.roadmapStatus[module.key];
        const isLocked = status === "locked";
        const canUnlock = this.canUnlockModule(module);
        
        return `
            <div class="group relative">
                <button
                    class="w-full text-left rounded-2xl p-4 bg-gradient-to-br ${module.gradient} text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}"
                    data-module-key="${module.key}"
                    ${isLocked ? 'disabled' : ''}
                    aria-label="${module.title} – ${this.getStatusLabel(status)}"
                    title="${isLocked ? (canUnlock ? 'Module đã sẵn sàng mở khóa!' : 'Hoàn thành các module tiên quyết để mở khóa') : 'Nhấp để đổi trạng thái: Chưa học → Đang học → Hoàn thành'}"
                >
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                                ${this.getModuleIcon(module.icon)}
                            </span>
                            <div>
                                <div class="font-semibold text-lg drop-shadow-sm">${module.title}</div>
                                ${this.renderStatusPill(status)}
                            </div>
                        </div>
                        ${this.getModuleStatusIcon(status)}
                    </div>

                    <!-- Module metadata -->
                    <div class="space-y-2 text-sm text-white/90">
                        <div class="flex items-center gap-4">
                            <span class="flex items-center gap-1">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                ${module.estimatedTime}
                            </span>
                            <span class="flex items-center gap-1">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                ${module.lessons} bài học
                            </span>
                            <span class="flex items-center gap-1">
                                ${this.getDifficultyIcon(module.difficulty)}
                                ${this.getDifficultyLabel(module.difficulty)}
                            </span>
                        </div>
                        
                        ${module.prerequisites.length > 0 ? `
                            <div class="text-xs text-white/70">
                                <span class="font-medium">Tiên quyết:</span> ${module.prerequisites.map(p => this.getModuleTitleByKey(p)).join(', ')}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Skills preview -->
                    <div class="mt-3 flex flex-wrap gap-1">
                        ${module.skills.slice(0, 3).map(skill => `
                            <span class="px-2 py-1 bg-white/20 rounded-full text-xs">${skill}</span>
                        `).join('')}
                        ${module.skills.length > 3 ? `<span class="px-2 py-1 bg-white/20 rounded-full text-xs">+${module.skills.length - 3}</span>` : ''}
                    </div>

                    <!-- progress connector line for larger screens -->
                    <div class="absolute -bottom-3 left-6 right-6 hidden lg:block">
                        <div class="h-1 rounded-full bg-white/30">
                            <div class="h-1 rounded-full ${this.getProgressBarClass(status)}" style="width: ${this.getProgressBarWidth(status)}"></div>
                        </div>
                    </div>
                </button>
                
                <!-- Unlock indicator -->
                ${isLocked && canUnlock ? `
                    <div class="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 animate-pulse">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                ` : ''}
            </div>
        `;
    }

    getModuleIcon(iconName) {
        const icons = {
            "bell": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 4.828a4 4 0 015.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            "broom": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`,
            "utensils": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path></svg>`,
            "phone": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>`,
            "heart-pulse": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
            "headphones": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>`,
            "wine": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
            "shield-check": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
            "building-2": `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
        };
        return icons[iconName] || `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>`;
    }

    renderStatusPill(status) {
        const statusMap = {
            "done": { label: "Hoàn thành", cls: "bg-emerald-100 text-emerald-700" },
            "doing": { label: "Đang học", cls: "bg-sky-100 text-sky-700" },
            "todo": { label: "Chưa học", cls: "bg-slate-100 text-slate-600" },
            "locked": { label: "Khóa", cls: "bg-slate-100 text-slate-400" }
        };
        
        const { label, cls } = statusMap[status] || statusMap.todo;
        
        return `
            <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${cls}">
                ${this.getStatusIcon(status)}
                ${label}
            </span>
        `;
    }

    getStatusIcon(status) {
        const icons = {
            "done": `<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
            "doing": `<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            "todo": `<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>`,
            "locked": `<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`
        };
        return icons[status] || icons.todo;
    }

    getModuleStatusIcon(status) {
        if (status === "locked") {
            return `<svg class="h-5 w-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`;
        } else if (status === "done") {
            return `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
        } else {
            return `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
        }
    }

    getStatusLabel(status) {
        const labels = {
            "done": "Hoàn thành",
            "doing": "Đang học", 
            "todo": "Chưa học",
            "locked": "Khóa"
        };
        return labels[status] || "Chưa học";
    }

    getProgressBarClass(status) {
        if (status === "done") return "bg-white";
        if (status === "doing") return "bg-white/80";
        return "bg-white/40";
    }

    getProgressBarWidth(status) {
        if (status === "done") return "100%";
        if (status === "doing") return "55%";
        return "25%";
    }

    updateRoadmapProgress() {
        const stats = this.getLearningStats();
        
        // Update progress elements
        const progressPercentage = document.getElementById('progressPercentage');
        const doneCountEl = document.getElementById('doneCount');
        const doingCountEl = document.getElementById('doingCount');
        const streakCountEl = document.getElementById('streakCount');
        const totalTimeCountEl = document.getElementById('totalTimeCount');
        
        if (progressPercentage) progressPercentage.textContent = `${stats.progress}%`;
        if (doneCountEl) doneCountEl.textContent = stats.doneCount;
        if (doingCountEl) doingCountEl.textContent = stats.doingCount;
        if (streakCountEl) streakCountEl.textContent = stats.streak;
        if (totalTimeCountEl) totalTimeCountEl.textContent = `${stats.totalTime}h`;
        
        // Update progress ring
        this.updateProgressRing(stats.progress);
        
        // Update next action CTA
        this.updateNextActionCTA();
    }

    updateProgressRing(progress) {
        const circle = document.querySelector('#learning-path svg circle:last-child');
        if (circle) {
            const circumference = 2 * Math.PI * 28; // radius = 28
            const offset = circumference - (progress / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
    }

    updateNextActionCTA() {
        const nextModule = this.roadmapModules.find(m => 
            this.roadmapStatus[m.key] === "doing"
        ) || this.roadmapModules.find(m => 
            this.roadmapStatus[m.key] === "todo"
        );
        
        const cta = document.getElementById('nextActionCTA');
        const nextModuleTitle = document.getElementById('nextModuleTitle');
        const continueBtn = document.getElementById('continueLearningBtn');
        
        if (nextModule && cta && nextModuleTitle && continueBtn) {
            nextModuleTitle.textContent = nextModule.title;
            continueBtn.setAttribute('data-module-key', nextModule.key);
            cta.style.display = 'flex';
        } else if (cta) {
            cta.style.display = 'none';
        }
    }

    setupRoadmapEventListeners() {
        // Module click handlers
        document.querySelectorAll('[data-module-key]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const moduleKey = e.currentTarget.dataset.moduleKey;
                this.handleModuleClick(moduleKey);
            });
        });
        
        // Continue learning button
        const continueBtn = document.getElementById('continueLearningBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                const moduleKey = e.currentTarget.dataset.moduleKey;
                if (moduleKey) {
                    this.startModule(moduleKey);
                }
            });
        }
    }

    handleModuleClick(moduleKey) {
        const currentStatus = this.roadmapStatus[moduleKey];
        
        if (currentStatus === "locked") {
            // Check if module can be unlocked
            const module = this.roadmapModules.find(m => m.key === moduleKey);
            if (module && this.canUnlockModule(module)) {
                this.roadmapStatus[moduleKey] = "todo";
                this.saveRoadmapStatus();
                this.showNotification(`Module "${module.title}" đã được mở khóa!`, 'success');
            } else {
                this.showNotification("Hoàn thành các module tiên quyết để mở khóa module này", 'warning');
            }
            return;
        }
        
        // Cycle through statuses: todo -> doing -> done -> todo
        const nextStatus = this.getNextStatus(currentStatus);
        this.roadmapStatus[moduleKey] = nextStatus;
        this.saveRoadmapStatus();
        
        // Update learning streak
        this.updateLearningStreak();
        
        // Check achievements
        this.checkAchievements();
        
        // Re-render the roadmap
        this.renderRoadmapStages();
        this.updateRoadmapProgress();
        this.setupRoadmapEventListeners();
        
        // Show notification
        const module = this.roadmapModules.find(m => m.key === moduleKey);
        if (module) {
            this.showNotification(`Đã cập nhật trạng thái "${module.title}" thành "${this.getStatusLabel(nextStatus)}"`, 'success');
        }
    }

    getNextStatus(currentStatus) {
        const statusCycle = {
            "todo": "doing",
            "doing": "done", 
            "done": "todo"
        };
        return statusCycle[currentStatus] || "todo";
    }

    startModule(moduleKey) {
        // Find the module and start it
        const module = this.roadmapModules.find(m => m.key === moduleKey);
        if (module) {
            // Set status to doing if it's not already
            if (this.roadmapStatus[moduleKey] !== "doing") {
                this.roadmapStatus[moduleKey] = "doing";
                this.saveRoadmapStatus();
            }
            
            // Show notification and redirect to appropriate section
            this.showNotification(`Bắt đầu học "${module.title}"`, 'info');
            
            // You can add logic here to navigate to the specific module content
            // For now, just show a message
            console.log(`Starting module: ${module.title}`);
        }
    }

    canUnlockModule(module) {
        if (!module.prerequisites || module.prerequisites.length === 0) {
            return true;
        }
        
        return module.prerequisites.every(prereq => 
            this.roadmapStatus[prereq] === "done"
        );
    }

    getModuleTitleByKey(key) {
        const module = this.roadmapModules.find(m => m.key === key);
        return module ? module.title : key;
    }

    getDifficultyIcon(difficulty) {
        const icons = {
            "basic": `<svg class="h-4 w-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            "intermediate": `<svg class="h-4 w-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            "advanced": `<svg class="h-4 w-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`
        };
        return icons[difficulty] || icons.basic;
    }

    getDifficultyLabel(difficulty) {
        const labels = {
            "basic": "Cơ bản",
            "intermediate": "Trung cấp", 
            "advanced": "Nâng cao"
        };
        return labels[difficulty] || "Cơ bản";
    }

    updateLearningStreak() {
        const today = new Date().toDateString();
        const lastLearningDate = localStorage.getItem('lastLearningDate');
        
        if (lastLearningDate !== today) {
            // New day - update streak
            const currentStreak = parseInt(localStorage.getItem('learningStreak') || '0');
            const newStreak = lastLearningDate ? currentStreak + 1 : 1;
            localStorage.setItem('learningStreak', newStreak.toString());
            localStorage.setItem('lastLearningDate', today);
            
            // Check streak achievements
            if (newStreak === 7 && !this.achievements.streak7) {
                this.achievements.streak7 = true;
                this.showAchievement("🔥 7 ngày liên tiếp!", "Bạn đã học liên tục 7 ngày!");
            }
            
            if (newStreak === 30 && !this.achievements.streak30) {
                this.achievements.streak30 = true;
                this.showAchievement("🏆 30 ngày liên tiếp!", "Bạn là một học viên kiên trì!");
            }
        }
    }

    getLearningStats() {
        const doneCount = Object.values(this.roadmapStatus).filter(status => status === "done").length;
        const doingCount = Object.values(this.roadmapStatus).filter(status => status === "doing").length;
        const totalCount = this.roadmapModules.length;
        const streak = parseInt(localStorage.getItem('learningStreak') || '0');
        const totalTime = this.roadmapModules.reduce((total, module) => {
            if (this.roadmapStatus[module.key] === "done") {
                const timeRange = module.estimatedTime.split('-');
                const avgTime = (parseInt(timeRange[0]) + parseInt(timeRange[1])) / 2;
                return total + avgTime;
            }
            return total;
        }, 0);
        
        return {
            doneCount,
            doingCount,
            totalCount,
            streak,
            totalTime: Math.round(totalTime),
            progress: Math.round((doneCount / totalCount) * 100)
        };
    }

    toggleModuleLessons(moduleId) {
        const lessonsContainer = document.getElementById(`lessons-${moduleId}`);
        const moduleCard = document.querySelector(`[data-module-id="${moduleId}"]`);
        const toggleBtn = moduleCard.querySelector('button[data-module-id]');
        
        if (lessonsContainer.classList.contains('hidden')) {
            lessonsContainer.classList.remove('hidden');
            toggleBtn.textContent = '📋 Ẩn chi tiết';
            lessonsContainer.style.maxHeight = lessonsContainer.scrollHeight + 'px';
        } else {
            lessonsContainer.classList.add('hidden');
            toggleBtn.textContent = '📋 Xem chi tiết';
            lessonsContainer.style.maxHeight = '0px';
        }
    }

    getLessonIcon(type) {
        const icons = {
            'video': '🎥',
            'interactive': '🎮',
            'scenario': '🎭',
            'simulation': '🔄',
            'vr-simulation': '🥽'
        };
        return icons[type] || '📚';
    }

    startLesson(lessonId) {
        // Simulate lesson start
        this.showNotification('Bắt đầu bài học...', 'info');
        
        // Simulate lesson completion after 3 seconds
        setTimeout(() => {
            this.completeLesson(lessonId);
        }, 3000);
    }

    completeLesson(lessonId) {
        this.addPoints(this.gamification.points.lessonComplete, 'Hoàn thành bài học');
        this.updateDashboardStats();
        this.showNotification('Chúc mừng! Bạn đã hoàn thành bài học!', 'success');
    }

    // AI Personalization Methods
    getPersonalizedRecommendations() {
        const level = this.userProfile.currentLevel;
        const learningPath = this.userProfile.learningPath;
        const completedModules = this.userProfile.completedModules;
        
        // Simple AI logic for recommendations
        const recommendations = [];
        
        if (this.userProfile.streak < 3) {
            recommendations.push({
                type: 'motivation',
                message: 'Hãy duy trì chuỗi học tập để nhận thêm điểm thưởng!',
                action: 'start-lesson'
            });
        }
        
        if (this.learnedTerms.size < 50) {
            recommendations.push({
                type: 'progress',
                message: 'Tiếp tục học từ vựng để mở khóa nội dung nâng cao!',
                action: 'vocabulary'
            });
        }
        
        return recommendations;
    }

    // Enhanced Dashboard with 2025 Trends
    renderTrendingContent() {
        const trendingTopics = [
            {
                title: 'Tech-driven Service',
                description: 'Mobile check-in, digital keys, AI concierge',
                icon: '📱',
                moduleId: 'trends-2025',
                category: 'Tech-driven Service'
            },
            {
                title: 'Wellness & Bleisure',
                description: 'Sleep kit SOP, quiet zones, workation packages',
                icon: '🧘',
                moduleId: 'trends-2025',
                category: 'Wellness & Bleisure'
            },
            {
                title: 'Sustainability',
                description: 'Zero waste, local sourcing, green certifications',
                icon: '🌱',
                moduleId: 'trends-2025',
                category: 'Sustainability'
            }
        ];
        
        return trendingTopics.map(topic => `
            <div class="trending-card" data-module-id="${topic.moduleId}" data-category="${topic.category}">
                <div class="trending-icon">${topic.icon}</div>
                <div class="trending-content">
                    <h4>${topic.title}</h4>
                    <p>${topic.description}</p>
                </div>
            </div>
        `).join('');
    }

    loadMicrolearningSection() {
        const trendingContent = document.getElementById('trendingContent');
        const microlearningModules = document.getElementById('microlearningModules');
        
        if (trendingContent) {
            trendingContent.innerHTML = this.renderTrendingContent();
            
            // Add click handlers for trending cards
            trendingContent.querySelectorAll('.trending-card').forEach(card => {
                card.addEventListener('click', () => {
                    const moduleId = card.dataset.moduleId;
                    const category = card.dataset.category;
                    
                    // Navigate to trends-2025 module detail
                    // The module is in the comprehensive level (mixed)
                    this.showModuleDetail(moduleId, 'mixed');
                    
                    // Optionally show notification about the selected trend
                    this.showNotification(`Đang xem: ${category}`, 'info');
                });
            });
        }
        
        if (microlearningModules) {
            const allModules = this.microlearningModules.comprehensive.map(module => ({ ...module, level: 'mixed' }));
            
            microlearningModules.innerHTML = allModules.map((module, index) => {
                const courseType = this.getCourseType(module.id);
                const courseIcon = this.getCourseIcon(courseType);
                const courseIllustration = this.getCourseIllustration(courseType);
                
                return `
                    <div class="course-card course-card--${courseType}" data-module-id="${module.id}" data-level="${module.level}">
                        <div class="course-card-header">
                            <span class="course-card-icon">${courseIcon}</span>
                            <h3 class="course-card-title">${module.title}</h3>
                            <p class="course-card-subtitle">${module.lessons.length} Bài học</p>
                        </div>
                        <div class="course-card-content">
                            <p>${module.description}</p>
                        </div>
                        <div class="course-illustration">
                            ${courseIllustration}
                        </div>
                    </div>
                `;
            }).join('');
            
            // Add event listeners for course cards
            microlearningModules.querySelectorAll('.course-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const moduleId = card.dataset.moduleId;
                    const level = card.dataset.level;
                    
                    console.log('Course card clicked:', moduleId, level);
                    
                    // Show module detail when course card is clicked
                    this.showModuleDetail(moduleId, level);
                });
            });
        }
    }

    // NEW: Vocabulary List Methods
    loadVocabularyList() {
        console.log('Loading vocabulary list...');
        console.log('CSV data length:', this.csvData.length);
        
        // Force show all data without filters initially
        this.filteredVocabulary = [...this.csvData];
        this.vocabularyListPage = 1;
        this.currentFilters = {
            category: 'all',
            level: 'all',
            search: '',
            sort: 'default'
        };
        
        console.log('Filtered vocabulary length:', this.filteredVocabulary.length);
        console.log('First 3 items:', this.filteredVocabulary.slice(0, 3));
        
        this.renderVocabularyList();
        this.updateVocabularyStats();
        this.setupVocabularyListFilters();
    }

    setupVocabularyListFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const levelFilter = document.getElementById('levelFilter');
        const vocabularySearch = document.getElementById('vocabularySearch');
        const applyFilters = document.getElementById('applyFilters');
        const resetFilters = document.getElementById('resetFilters');

        if (applyFilters) {
            applyFilters.addEventListener('click', () => this.applyVocabularyFilters());
        }

        if (resetFilters) {
            resetFilters.addEventListener('click', () => this.resetVocabularyFilters());
        }

        if (vocabularySearch) {
            vocabularySearch.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.applyVocabularyFilters();
            });
            
            // Add keyboard navigation support
            vocabularySearch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.applyVocabularyFilters();
                } else if (e.key === 'Escape') {
                    e.target.value = '';
                    this.currentFilters.search = '';
                    this.applyVocabularyFilters();
                }
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyVocabularyFilters();
            });
        }

        if (levelFilter) {
            levelFilter.addEventListener('change', (e) => {
                this.currentFilters.level = e.target.value;
                this.applyVocabularyFilters();
            });
        }

        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.applyVocabularyFilters();
            });
        }
    }

    applyVocabularyFilters() {
        // Show loading state
        const applyBtn = document.getElementById('applyFilters');
        if (applyBtn) {
            applyBtn.classList.add('loading');
        }

        // Simulate processing time for better UX
        setTimeout(() => {
            this.filteredVocabulary = this.csvData.filter(term => {
                const matchesCategory = this.currentFilters.category === 'all' || 
                                      term.category === this.currentFilters.category;
                
                const levelKey = this.mapLevelToKey(term.level);
                const matchesLevel = this.currentFilters.level === 'all' || 
                                   levelKey === this.currentFilters.level;
                
                const searchTerm = this.currentFilters.search.toLowerCase().trim();
                const matchesSearch = searchTerm === '' ||
                                    this.fuzzySearch(term.english, searchTerm) ||
                                    this.fuzzySearch(term.vietnamese, searchTerm) ||
                                    this.fuzzySearch(term.definition, searchTerm);
                
                return matchesCategory && matchesLevel && matchesSearch;
            });

            // Apply sorting
            this.sortVocabularyList();

            this.vocabularyListPage = 1;
            this.renderVocabularyList();
            this.updateVocabularyStats();
            this.showFilterFeedback();

            // Remove loading state
            if (applyBtn) {
                applyBtn.classList.remove('loading');
            }
        }, 300);
    }

    sortVocabularyList() {
        if (this.currentFilters.sort === 'default') {
            return; // No sorting needed
        }

        this.filteredVocabulary.sort((a, b) => {
            switch (this.currentFilters.sort) {
                case 'english-az':
                    return a.english.localeCompare(b.english, 'en', { sensitivity: 'base' });
                case 'english-za':
                    return b.english.localeCompare(a.english, 'en', { sensitivity: 'base' });
                case 'vietnamese-az':
                    return a.vietnamese.localeCompare(b.vietnamese, 'vi', { sensitivity: 'base' });
                case 'vietnamese-za':
                    return b.vietnamese.localeCompare(a.vietnamese, 'vi', { sensitivity: 'base' });
                case 'category':
                    return a.category.localeCompare(b.category, 'vi', { sensitivity: 'base' });
                case 'level':
                    const levelOrder = { 'Basic': 1, 'Intermediate': 2, 'Advanced': 3 };
                    const aLevel = levelOrder[a.level] || 0;
                    const bLevel = levelOrder[b.level] || 0;
                    return aLevel - bLevel;
                default:
                    return 0;
            }
        });
    }

    // Enhanced fuzzy search for better matching
    fuzzySearch(text, searchTerm) {
        if (!searchTerm) return true;
        
        const normalizedText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedSearch = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        // Exact match
        if (normalizedText.includes(normalizedSearch)) return true;
        
        // Fuzzy match - check if all characters in search term exist in text
        let searchIndex = 0;
        for (let i = 0; i < normalizedText.length && searchIndex < normalizedSearch.length; i++) {
            if (normalizedText[i] === normalizedSearch[searchIndex]) {
                searchIndex++;
            }
        }
        
        return searchIndex === normalizedSearch.length;
    }

    // Show feedback for filter results
    showFilterFeedback() {
        const category = this.currentFilters.category === 'all' ? 'tất cả chuyên mục' : this.currentFilters.category;
        const level = this.currentFilters.level === 'all' ? 'tất cả cấp độ' : 
                     this.currentFilters.level === 'basic' ? 'Cơ bản' :
                     this.currentFilters.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao';
        const searchTerm = this.currentFilters.search ? ` cho "${this.currentFilters.search}"` : '';
        
        const message = `🔎 Tìm thấy ${this.filteredVocabulary.length} từ vựng trong chuyên mục ${category} – cấp độ ${level}${searchTerm}`;
        
        // Create or update feedback element
        let feedbackEl = document.getElementById('filterFeedback');
        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.id = 'filterFeedback';
            feedbackEl.className = 'filter-feedback';
            document.querySelector('.vocabulary-filters').appendChild(feedbackEl);
        }
        
        feedbackEl.innerHTML = message;
        feedbackEl.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (feedbackEl) {
                feedbackEl.style.display = 'none';
            }
        }, 3000);
    }

    resetVocabularyFilters() {
        this.currentFilters = {
            category: 'all',
            level: 'all',
            search: '',
            sort: 'default'
        };

        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('levelFilter').value = 'all';
        document.getElementById('vocabularySearch').value = '';
        document.getElementById('sortFilter').value = 'default';

        this.filteredVocabulary = [...this.csvData];
        this.vocabularyListPage = 1;
        this.renderVocabularyList();
        this.updateVocabularyStats();
    }

    renderVocabularyList() {
        const vocabularyList = document.getElementById('vocabularyList');
        if (!vocabularyList) {
            console.error('vocabularyList element not found!');
            return;
        }

        console.log('Rendering vocabulary list...');
        console.log('Filtered vocabulary length:', this.filteredVocabulary.length);
        console.log('Items per page:', this.itemsPerPage);
        console.log('Current page:', this.vocabularyListPage);

        const startIndex = (this.vocabularyListPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentPageItems = this.filteredVocabulary.slice(startIndex, endIndex);

        console.log('Start index:', startIndex, 'End index:', endIndex);
        console.log('Current page items length:', currentPageItems.length);

        if (currentPageItems.length === 0) {
            console.log('No items to display, showing no results message');
            const searchTerm = this.currentFilters.search ? ` cho "${this.currentFilters.search}"` : '';
            vocabularyList.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>Không tìm thấy từ vựng phù hợp</h3>
                    <p>Hãy thử từ gần nghĩa hoặc kiểm tra ngôn ngữ nhập${searchTerm}</p>
                    <div style="margin-top: 20px;">
                        <button class="btn btn--outline" onclick="app.resetVocabularyFilters()">
                            <span class="btn-icon">↺</span>
                            <span class="btn-text">Đặt lại bộ lọc</span>
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        vocabularyList.innerHTML = currentPageItems.map((term, index) => {
            const termKey = `${term.english}-${term.category}-${this.mapLevelToKey(term.level)}`;
            const isLearned = this.learnedTerms.has(termKey);
            const isBookmarked = this.bookmarkedTerms.has(termKey);
            
            // Highlight search terms
            const highlightText = (text, searchTerm) => {
                if (!searchTerm) return text;
                const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                return text.replace(regex, '<mark>$1</mark>');
            };
            
            const highlightedEnglish = highlightText(term.english, this.currentFilters.search);
            const highlightedVietnamese = highlightText(term.vietnamese, this.currentFilters.search);
            const highlightedDefinition = highlightText(term.definition, this.currentFilters.search);

            return `
                <div class="vocabulary-item ${isLearned ? 'learned' : ''}" data-index="${startIndex + index}">
                    <div class="vocabulary-item-header">
                        <div class="vocabulary-main">
                            <h3 class="vocabulary-english">${highlightedEnglish}</h3>
                            <p class="vocabulary-vietnamese">${highlightedVietnamese}</p>
                        </div>
                        <div class="vocabulary-meta">
                            <span class="vocabulary-category">${this.getCategoryIcon(term.category)} ${term.category}</span>
                            <span class="vocabulary-level level-${this.mapLevelToKey(term.level)}">${this.getLevelDisplayName(this.mapLevelToKey(term.level))}</span>
                        </div>
                    </div>
                    
                    <div class="vocabulary-details">
                        <div class="vocabulary-pronunciation">
                            <strong>Phát âm:</strong> ${term.ipa}
                        </div>
                        <div class="vocabulary-definition">
                            <strong>Định nghĩa:</strong> ${highlightedDefinition}
                        </div>
                        <div class="vocabulary-example">
                            <strong>Ví dụ:</strong> ${term.example}
                        </div>
                    </div>
                    
                    <div class="vocabulary-actions">
                        <button class="btn btn--sm btn--outline play-audio" data-term="${term.english}" title="Phát âm">
                            🔊 Phát âm
                        </button>
                        <button class="btn btn--sm btn--outline toggle-learned" data-term-key="${termKey}">
                            ${isLearned ? '✅ Đã học' : '📚 Đánh dấu đã học'}
                        </button>
                        <button class="btn btn--sm btn--outline toggle-bookmark" data-term-key="${termKey}">
                            ${isBookmarked ? '🔖 Đã lưu' : '🔖 Lưu'}
                        </button>
                        <button class="btn btn--sm btn--primary practice-term" data-term="${term.english}" data-level="${this.mapLevelToKey(term.level)}">
                            🎯 Luyện tập
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners
        this.setupVocabularyItemListeners();
        this.renderPagination();
    }

    setupVocabularyItemListeners() {
        // Play audio for vocabulary terms
        document.querySelectorAll('.play-audio').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const term = e.target.dataset.term;
                this.playTermAudio(term, e.target);
            });
        });

        // Toggle learned status
        document.querySelectorAll('.toggle-learned').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const termKey = e.target.dataset.termKey;
                this.toggleLearnedStatus(termKey);
                this.renderVocabularyList();
                this.updateVocabularyStats();
            });
        });

        // Toggle bookmark status
        document.querySelectorAll('.toggle-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const termKey = e.target.dataset.termKey;
                this.toggleBookmarkStatus(termKey);
                this.renderVocabularyList();
            });
        });

        // Practice term
        document.querySelectorAll('.practice-term').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const term = e.target.dataset.term;
                const level = e.target.dataset.level;
                this.practiceSpecificTerm(term, level);
            });
        });
    }

    toggleLearnedStatus(termKey) {
        if (this.learnedTerms.has(termKey)) {
            this.learnedTerms.delete(termKey);
        } else {
            this.learnedTerms.add(termKey);
            this.addPoints(this.gamification.points.lessonComplete, 'Đánh dấu từ vựng đã học');
        }
    }

    toggleBookmarkStatus(termKey) {
        if (this.bookmarkedTerms.has(termKey)) {
            this.bookmarkedTerms.delete(termKey);
        } else {
            this.bookmarkedTerms.add(termKey);
        }
    }

    practiceSpecificTerm(term, level) {
        this.loadVocabularySection(level);
        this.showSection('vocabulary');
        
        // Find and display the specific term
        const terms = this.vocabularyData[level];
        const termIndex = terms.findIndex(t => t.english === term);
        if (termIndex !== -1) {
            this.currentCardIndex = termIndex;
            this.updateFlashcard();
        }
    }

    updateVocabularyStats() {
        const totalCount = this.csvData.length;
        const filteredCount = this.filteredVocabulary.length;
        const learnedCount = this.learnedTerms.size;

        console.log('Updating vocabulary stats:');
        console.log('Total count:', totalCount);
        console.log('Filtered count:', filteredCount);
        console.log('Learned count:', learnedCount);

        const totalCountEl = document.getElementById('totalVocabularyCount');
        const filteredCountEl = document.getElementById('filteredCount');
        const learnedCountEl = document.getElementById('learnedCount');

        console.log('Found elements:', {
            totalCountEl: !!totalCountEl,
            filteredCountEl: !!filteredCountEl,
            learnedCountEl: !!learnedCountEl
        });

        if (totalCountEl) totalCountEl.textContent = totalCount;
        if (filteredCountEl) filteredCountEl.textContent = filteredCount;
        if (learnedCountEl) learnedCountEl.textContent = learnedCount;
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredVocabulary.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination-controls">';
        
        // Previous button
        if (this.vocabularyListPage > 1) {
            paginationHTML += `<button class="btn btn--outline pagination-btn" data-page="${this.vocabularyListPage - 1}">← Trước</button>`;
        }
        
        // Page numbers
        const startPage = Math.max(1, this.vocabularyListPage - 2);
        const endPage = Math.min(totalPages, this.vocabularyListPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="btn pagination-btn ${i === this.vocabularyListPage ? 'btn--primary' : 'btn--outline'}" data-page="${i}">${i}</button>`;
        }
        
        // Next button
        if (this.vocabularyListPage < totalPages) {
            paginationHTML += `<button class="btn btn--outline pagination-btn" data-page="${this.vocabularyListPage + 1}">Sau →</button>`;
        }
        
        paginationHTML += '</div>';
        pagination.innerHTML = paginationHTML;

        // Add event listeners
        pagination.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                this.vocabularyListPage = page;
                this.renderVocabularyList();
            });
        });
    }

    addFallbackAllergiesDietData() {
        const fallbackData = [
            {"english": "Allergy", "vietnamese": "Dị ứng", "ipa": "[ˈælərdʒi]", "category": "Allergies & Diet", "example": "Do you have any allergies?", "definition": "Adverse reaction to food", "level": "Basic"},
            {"english": "Food Allergy", "vietnamese": "Dị ứng thực phẩm", "ipa": "[fuːd ˈælərdʒi]", "category": "Allergies & Diet", "example": "Peanut allergy is common.", "definition": "Immune response to food", "level": "Basic"},
            {"english": "Vegetarian", "vietnamese": "Ăn chay", "ipa": "[ˌvedʒəˈteriən]", "category": "Allergies & Diet", "example": "We have many vegetarian options.", "definition": "Diet excluding meat but may include dairy and eggs", "level": "Basic"},
            {"english": "Vegan", "vietnamese": "Ăn thuần chay", "ipa": "[ˈviːgən]", "category": "Allergies & Diet", "example": "Our vegan menu is very popular.", "definition": "Diet excluding all animal products", "level": "Basic"},
            {"english": "Gluten-free", "vietnamese": "Không chứa gluten", "ipa": "[ˈgluːtən friː]", "category": "Allergies & Diet", "example": "We have gluten-free options available.", "definition": "Food that does not contain gluten protein", "level": "Basic"}
        ];
        
        fallbackData.forEach(term => {
            this.csvData.push(term);
            const levelKey = this.mapLevelToKey(term.level);
            if (this.vocabularyData[levelKey]) {
                this.vocabularyData[levelKey].push(term);
            }
        });
        console.log(`Added ${fallbackData.length} fallback allergies & diet terms`);
    }

    addFallbackTableSkillsData() {
        const fallbackData = [
            {"english": "Table Setting", "vietnamese": "Kỹ năng đặt bàn", "ipa": "[ˈteɪbəl ˈsetɪŋ]", "category": "Table Skills", "example": "Proper table setting is important.", "definition": "Arranging dining table", "level": "Basic"},
            {"english": "Reservation", "vietnamese": "Đặt bàn", "ipa": "[ˌrezərˈveɪʃən]", "category": "Table Skills", "example": "Do you have a reservation?", "definition": "Booking a table", "level": "Basic"},
            {"english": "Table Booking", "vietnamese": "Đặt bàn", "ipa": "[ˈteɪbəl ˈbʊkɪŋ]", "category": "Table Skills", "example": "Table booking for tonight.", "definition": "Reserving dining space", "level": "Basic"},
            {"english": "Party Size", "vietnamese": "Số lượng khách", "ipa": "[ˈpɑːrti saɪz]", "category": "Table Skills", "example": "What is the party size for tonight?", "definition": "Number of people in a dining group", "level": "Basic"},
            {"english": "Confirmation Number", "vietnamese": "Số xác nhận", "ipa": "[ˌkɑːnfərˈmeɪʃən ˈnʌmbər]", "category": "Table Skills", "example": "Your confirmation number is 12345.", "definition": "Unique identifier for a confirmed reservation", "level": "Basic"}
        ];
        
        fallbackData.forEach(term => {
            this.csvData.push(term);
            const levelKey = this.mapLevelToKey(term.level);
            if (this.vocabularyData[levelKey]) {
                this.vocabularyData[levelKey].push(term);
            }
        });
        console.log(`Added ${fallbackData.length} fallback table skills terms`);
    }

    getCategoryIcon(category) {
        const icons = {
            'Kỹ thuật chế biến': '👨‍🍳',
            'Phong cách phục vụ': '🍽️',
            'Chuyên môn đồ uống': '🍷',
            'Phân loại thực đơn': '📋',
            'Vận hành bếp': '⚙️',
            'Quản lý khách sạn': '🏨',
            'Marketing & Sales': '📈',
            'Dịch vụ khách hàng': '🤝',
            'Dị ứng & Chế độ ăn': '🚫',
            'Kỹ năng đặt bàn': '📞',
            'Allergies & Diet': '🚫',
            'Table Skills': '📞'
        };
        return icons[category] || '📚';
    }

    debugDataLoading() {
        console.log('=== DEBUG DATA LOADING ===');
        console.log('Total CSV data:', this.csvData.length);
        console.log('Basic vocabulary:', this.vocabularyData.basic.length);
        console.log('Intermediate vocabulary:', this.vocabularyData.intermediate.length);
        console.log('Advanced vocabulary:', this.vocabularyData.advanced.length);
        
        // Check for specific categories
        const allergiesDiet = this.csvData.filter(term => term.category === 'Allergies & Diet');
        const tableSkills = this.csvData.filter(term => term.category === 'Table Skills');
        
        console.log('Allergies & Diet terms:', allergiesDiet.length);
        console.log('Table Skills terms:', tableSkills.length);
        
        // Also check Vietnamese category names
        const allergiesDietVN = this.csvData.filter(term => term.category === 'Dị ứng & Chế độ ăn');
        const tableSkillsVN = this.csvData.filter(term => term.category === 'Kỹ năng đặt bàn');
        
        console.log('Dị ứng & Chế độ ăn terms:', allergiesDietVN.length);
        console.log('Kỹ năng đặt bàn terms:', tableSkillsVN.length);
        
        if (allergiesDiet.length > 0) {
            console.log('Sample Allergies & Diet term:', allergiesDiet[0]);
        }
        if (tableSkills.length > 0) {
            console.log('Sample Table Skills term:', tableSkills[0]);
        }
        
        // Check all unique categories
        const categories = [...new Set(this.csvData.map(term => term.category))];
        console.log('All categories:', categories);
        console.log('=== END DEBUG ===');
    }

    // NEW: Module Detail and Lesson Viewer Methods
    showModuleDetail(moduleId, level) {
        let module;
        
        // Handle mixed level (comprehensive modules)
        if (level === 'mixed' || level === 'comprehensive') {
            module = this.microlearningModules.comprehensive.find(m => m.id === moduleId);
        } else {
            module = this.microlearningModules[level]?.find(m => m.id === moduleId);
        }
        
        if (!module) {
            console.error('Module not found:', moduleId, 'level:', level);
            console.log('Available modules:', Object.keys(this.microlearningModules));
            return;
        }

        // Update breadcrumb
        document.getElementById('moduleBreadcrumb').textContent = module.title;
        
        // Update module details
        document.getElementById('moduleDetailTitle').textContent = module.title;
        document.getElementById('moduleDuration').textContent = `${module.duration} phút`;
        document.getElementById('moduleLevel').textContent = this.getLevelDisplayName(level);
        
        // Calculate progress
        const progress = this.calculateModuleProgress(moduleId, level);
        document.getElementById('moduleProgress').textContent = `${progress}% hoàn thành`;
        
        // Update description
        document.getElementById('moduleDescription').textContent = this.getModuleDescription(moduleId, level);
        
        // Render lessons
        this.renderModuleLessons(module, level);
        
        // Show module detail section
        console.log('Showing module detail section');
        this.showSection('module-detail');
    }

    getLevelDisplayName(level) {
        const levelNames = {
            'basic': 'Cơ bản',
            'intermediate': 'Trung cấp',
            'advanced': 'Nâng cao',
            'mixed': 'Đa cấp độ'
        };
        return levelNames[level] || 'Đa cấp độ';
    }

    getCourseType(moduleId) {
        const courseTypes = {
            'reception-comprehensive': 'reception',
            'housekeeping-comprehensive': 'housekeeping',
            'food-beverage-comprehensive': 'food-beverage',
            'table-skills-comprehensive': 'table-skills',
            'guest-services-comprehensive': 'guest-services',
            'restaurant-comprehensive': 'restaurant',
            'allergies-diet-comprehensive': 'allergies-diet',
            'food-safety-comprehensive': 'food-safety',
            'management-comprehensive': 'management'
        };
        return courseTypes[moduleId] || 'reception';
    }

    getCourseIcon(courseType) {
        const icons = {
            'reception': '🛎️', // Bell service - biểu tượng chuẩn cho lễ tân
            'housekeeping': '🧹', // Broom - gợi ý vệ sinh phòng, housekeeping
            'food-beverage': '🍽️', // Plate & cutlery - biểu trưng ẩm thực và phục vụ bàn
            'table-skills': '☎️', // Phone - biểu tượng "call & book" gợi nghiệp vụ đặt bàn
            'guest-services': '🤝', // Handshake - biểu tượng dịch vụ & giao tiếp
            'restaurant': '🍷', // Wine glass - gợi phong cách fine dining & F&B
            'allergies-diet': '⚕️', // Medical cross + leaf - thể hiện khía cạnh dinh dưỡng & sức khỏe
            'food-safety': '🧪', // Lab flask + shield - biểu tượng an toàn, kiểm định chất lượng
            'management': '🏨' // Hotel building - đại diện cho quản lý tổng thể khách sạn
        };
        return icons[courseType] || '📚';
    }

    getCourseIllustration(courseType) {
        const illustrations = {
            'reception': `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Hotel building icon -->
                    <rect x="25" y="30" width="50" height="40" rx="3" fill="rgba(255,255,255,0.4)"/>
                    <rect x="35" y="20" width="30" height="15" rx="2" fill="rgba(255,255,255,0.5)"/>
                    <circle cx="50" cy="27" r="2" fill="rgba(255,255,255,0.7)"/>
                    <rect x="40" y="45" width="20" height="15" rx="1" fill="rgba(255,255,255,0.3)"/>
                    <rect x="42" y="47" width="3" height="3" fill="rgba(255,255,255,0.6)"/>
                    <rect x="47" y="47" width="3" height="3" fill="rgba(255,255,255,0.6)"/>
                    <rect x="52" y="47" width="3" height="3" fill="rgba(255,255,255,0.6)"/>
                </svg>
            `,
            'housekeeping': `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Bed and cleaning tools icon -->
                    <rect x="30" y="45" width="40" height="20" rx="3" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="45" cy="35" r="6" fill="rgba(255,255,255,0.5)"/>
                    <rect x="40" y="65" width="20" height="3" fill="rgba(255,255,255,0.4)"/>
                    <rect x="35" y="70" width="30" height="3" fill="rgba(255,255,255,0.3)"/>
                    <rect x="25" y="50" width="8" height="2" fill="rgba(255,255,255,0.5)"/>
                    <circle cx="29" cy="51" r="1" fill="rgba(255,255,255,0.7)"/>
                </svg>
            `,
            'food-beverage': `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Food and drink icon -->
                    <circle cx="50" cy="35" r="8" fill="rgba(255,255,255,0.4)"/>
                    <rect x="42" y="43" width="16" height="20" rx="2" fill="rgba(255,255,255,0.5)"/>
                    <rect x="47" y="63" width="6" height="8" fill="rgba(255,255,255,0.4)"/>
                    <rect x="52" y="63" width="6" height="8" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="50" cy="40" r="2" fill="rgba(255,255,255,0.7)"/>
                    <rect x="40" y="71" width="20" height="3" fill="rgba(255,255,255,0.3)"/>
                </svg>
            `,
            'table-skills': `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Phone and reservation book icon -->
                    <rect x="40" y="25" width="20" height="30" rx="3" fill="rgba(255,255,255,0.4)"/>
                    <rect x="42" y="27" width="16" height="26" rx="2" fill="rgba(255,255,255,0.5)"/>
                    <circle cx="50" cy="40" r="2" fill="rgba(255,255,255,0.7)"/>
                    <rect x="30" y="45" width="40" height="25" rx="2" fill="rgba(255,255,255,0.3)"/>
                    <rect x="35" y="50" width="30" height="2" fill="rgba(255,255,255,0.5)"/>
                    <rect x="35" y="55" width="25" height="2" fill="rgba(255,255,255,0.5)"/>
                    <rect x="35" y="60" width="20" height="2" fill="rgba(255,255,255,0.5)"/>
                </svg>
            `,
            'guest-services': `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Handshake and service icon -->
                    <circle cx="50" cy="30" r="10" fill="rgba(255,255,255,0.4)"/>
                    <rect x="35" y="40" width="30" height="20" rx="3" fill="rgba(255,255,255,0.5)"/>
                    <rect x="45" y="60" width="10" height="15" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="50" cy="35" r="2" fill="rgba(255,255,255,0.7)"/>
                    <rect x="25" y="45" width="15" height="3" rx="1" fill="rgba(255,255,255,0.4)"/>
                    <rect x="60" y="45" width="15" height="3" rx="1" fill="rgba(255,255,255,0.4)"/>
                    <rect x="40" y="75" width="20" height="3" fill="rgba(255,255,255,0.3)"/>
                </svg>
            `,
            'restaurant': `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Wine glass and fine dining icon -->
                    <rect x="40" y="35" width="20" height="25" rx="2" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="50" cy="25" r="6" fill="rgba(255,255,255,0.5)"/>
                    <rect x="47" y="60" width="6" height="15" fill="rgba(255,255,255,0.4)"/>
                    <rect x="45" y="75" width="10" height="3" fill="rgba(255,255,255,0.3)"/>
                    <circle cx="50" cy="30" r="2" fill="rgba(255,255,255,0.7)"/>
                    <rect x="30" y="50" width="40" height="3" fill="rgba(255,255,255,0.3)"/>
                    <rect x="32" y="55" width="36" height="2" fill="rgba(255,255,255,0.4)"/>
                </svg>
            `
        };
        return illustrations[courseType] || illustrations['reception'];
    }

    getModuleDescription(moduleId, level) {
        let module;
        if (level === 'mixed' || level === 'comprehensive') {
            module = this.microlearningModules.comprehensive.find(m => m.id === moduleId);
        } else {
            module = this.microlearningModules[level]?.find(m => m.id === moduleId);
        }
        return module?.description || 'Module học tập chuyên sâu về nghiệp vụ khách sạn.';
    }

    calculateModuleProgress(moduleId, level) {
        let module;
        if (level === 'mixed' || level === 'comprehensive') {
            module = this.microlearningModules.comprehensive.find(m => m.id === moduleId);
        } else {
            module = this.microlearningModules[level]?.find(m => m.id === moduleId);
        }
        if (!module) return 0;
        
        const completedLessons = this.userProfile.completedModules
            .filter(completed => completed.moduleId === moduleId)
            .length;
        
        return Math.round((completedLessons / module.lessons.length) * 100);
    }

    renderModuleLessons(module, level) {
        const lessonsList = document.getElementById('moduleLessonsList');
        lessonsList.innerHTML = '';

        module.lessons.forEach((lesson, index) => {
            const lessonElement = document.createElement('div');
            lessonElement.className = 'lesson-item';
            
            const isCompleted = this.isLessonCompleted(module.id, lesson.id);
            const isCurrent = this.isCurrentLesson(module.id, lesson.id);
            const isLocked = !isCompleted && !isCurrent && index > 0;
            
            if (isCompleted) lessonElement.classList.add('completed');
            if (isCurrent) lessonElement.classList.add('current');
            if (isLocked) lessonElement.classList.add('locked');

            // Calculate progress percentage for current lesson
            const progressPercentage = isCompleted ? 100 : (isCurrent ? 25 : 0);

            lessonElement.innerHTML = `
                <div class="lesson-icon ${isCompleted ? 'completed' : isCurrent ? 'current' : ''}">
                    ${this.getLessonTypeIcon(lesson.type)}
                </div>
                <div class="lesson-thumbnail ${isCurrent ? 'play-icon' : ''}">
                    ${this.getLessonTypeIcon(lesson.type)}
                </div>
                <div class="lesson-info">
                    <h4>${lesson.title}</h4>
                    <div class="lesson-meta">
                        <div class="lesson-duration">
                            <span class="meta-icon">⏱️</span>
                            <span>${lesson.duration} phút</span>
                        </div>
                        <div class="lesson-level">
                            <span class="level-badge level-${lesson.level || 'basic'}">${this.getLevelDisplayName(lesson.level || 'basic')}</span>
                        </div>
                        <div class="lesson-progress-ring" style="background: conic-gradient(var(--color-primary) ${progressPercentage * 3.6}deg, #e2e8f0 0deg);">
                            <span class="progress-text">${progressPercentage}%</span>
                        </div>
                    </div>
                    <div class="lesson-status ${isCompleted ? 'completed' : isCurrent ? 'current' : 'locked'}">
                        ${isCompleted ? 'Hoàn thành' : isCurrent ? 'Đang học' : 'Chưa mở khóa'}
                    </div>
                    <div class="lesson-actions">
                        <button class="lesson-action-btn lesson-preview-btn" 
                                data-module-id="${module.id}" 
                                data-lesson-id="${lesson.id}" 
                                data-level="${level}">
                            👁️ Xem trước
                        </button>
                        <button class="lesson-action-btn ${isCurrent ? 'primary' : ''}" 
                                ${isLocked ? 'disabled' : ''}>
                            ${isCompleted ? '🔁 Ôn tập' : isCurrent ? '▶️ Tiếp tục' : '🔒 Khóa'}
                        </button>
                        <button class="lesson-action-btn">
                            🔖 Đánh dấu
                        </button>
                    </div>
                </div>
            `;

            // Add click event for the lesson
            lessonElement.addEventListener('click', (e) => {
                // Don't trigger if clicking on action buttons
                if (e.target.classList.contains('lesson-action-btn')) return;
                
                if (isCompleted || isCurrent || index === 0) {
                    this.showLesson(module.id, lesson.id, level);
                }
            });

            // Add action button events
            const actionBtns = lessonElement.querySelectorAll('.lesson-action-btn');
            actionBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const btnText = btn.textContent.trim();
                    
                    if (btnText.includes('Xem trước')) {
                        const moduleId = btn.dataset.moduleId;
                        const lessonId = btn.dataset.lessonId;
                        const level = btn.dataset.level;
                        this.showLessonPreview(moduleId, lessonId, level);
                    } else if (btnText.includes('Ôn tập') || btnText.includes('Tiếp tục')) {
                        this.showLesson(module.id, lesson.id, level);
                    } else if (btnText.includes('Đánh dấu')) {
                        this.toggleBookmark(module.id, lesson.id);
                    }
                });
            });

            lessonsList.appendChild(lessonElement);
        });
    }

    toggleBookmark(moduleId, lessonId) {
        // Toggle bookmark status
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
        const key = `${moduleId}-${lessonId}`;
        
        if (bookmarks[key]) {
            delete bookmarks[key];
            this.showNotification('Đã bỏ đánh dấu bài học', 'info');
        } else {
            bookmarks[key] = true;
            this.showNotification('Đã đánh dấu bài học', 'success');
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
        // Update UI
        const lessonElement = document.querySelector(`[data-module="${moduleId}"][data-lesson="${lessonId}"]`);
        if (lessonElement) {
            const bookmarkBtn = lessonElement.querySelector('.lesson-action-btn:last-child');
            if (bookmarkBtn) {
                const isBookmarked = bookmarks[key];
                bookmarkBtn.innerHTML = isBookmarked ? '🔖 Đã đánh dấu' : '🔖 Đánh dấu';
                bookmarkBtn.style.opacity = isBookmarked ? '0.7' : '1';
            }
        }
    }

    // 🎭 Lesson Preview Modal Functions
    showLessonPreview(moduleId, lessonId, level) {
        const module = this.getModuleData(moduleId, level);
        const lesson = module.lessons.find(l => l.id === lessonId);
        
        if (!lesson) return;

        // Populate modal content
        document.getElementById('lessonPreviewThumbnail').textContent = this.getLessonTypeIcon(lesson.type);
        document.getElementById('lessonPreviewTitle').textContent = lesson.title;
        document.getElementById('lessonPreviewDuration').textContent = `${lesson.duration} phút`;
        document.getElementById('lessonPreviewLevel').textContent = this.getLevelDisplayName(lesson.level || 'basic');
        document.getElementById('lessonPreviewType').textContent = this.getLessonTypeDisplayName(lesson.type);
        document.getElementById('lessonPreviewDescription').textContent = lesson.description || this.getDefaultLessonDescription(lesson);

        // Populate objectives
        const objectives = this.getLessonObjectives(lesson);
        const objectivesList = document.getElementById('lessonPreviewObjectives');
        objectivesList.innerHTML = '';
        objectives.forEach(objective => {
            const li = document.createElement('li');
            li.textContent = objective;
            objectivesList.appendChild(li);
        });

        // Set requirements
        const requirements = document.getElementById('lessonPreviewRequirements');
        const isLocked = !this.isLessonCompleted(moduleId, lessonId) && !this.isCurrentLesson(moduleId, lessonId);
        
        if (isLocked) {
            requirements.innerHTML = `
                <h4>🔒 Khóa</h4>
                <p>Hoàn thành bài học trước đó để mở khóa bài này.</p>
            `;
            requirements.style.background = '#fee2e2';
            requirements.style.borderColor = '#f87171';
        } else {
            requirements.innerHTML = `
                <h4>✅ Sẵn sàng</h4>
                <p>Bài học này đã sẵn sàng để bắt đầu.</p>
            `;
            requirements.style.background = '#dcfce7';
            requirements.style.borderColor = '#22c55e';
        }

        // Set button states
        const startBtn = document.getElementById('lessonPreviewStart');
        const bookmarkBtn = document.getElementById('lessonPreviewCancel');
        
        if (isLocked) {
            startBtn.textContent = '🔒 Chưa mở khóa';
            startBtn.disabled = true;
            startBtn.style.opacity = '0.6';
        } else {
            startBtn.innerHTML = '▶️ Bắt đầu học';
            startBtn.disabled = false;
            startBtn.style.opacity = '1';
        }

        // Update bookmark button
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
        const key = `${moduleId}-${lessonId}`;
        const isBookmarked = bookmarks[key];
        bookmarkBtn.innerHTML = isBookmarked ? '🔖 Đã đánh dấu' : '🔖 Đánh dấu';
        bookmarkBtn.style.opacity = isBookmarked ? '0.7' : '1';

        // Show modal
        const modal = document.getElementById('lessonPreviewModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Store current lesson info for actions
        modal.dataset.moduleId = moduleId;
        modal.dataset.lessonId = lessonId;
        modal.dataset.level = level;
    }

    hideLessonPreview() {
        const modal = document.getElementById('lessonPreviewModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    getLessonTypeDisplayName(type) {
        const typeNames = {
            'video': 'Video',
            'interactive': 'Tương tác',
            'scenario': 'Tình huống',
            'simulation': 'Mô phỏng',
            'vr-simulation': 'VR Mô phỏng'
        };
        return typeNames[type] || 'Bài học';
    }

    getDefaultLessonDescription(lesson) {
        const descriptions = {
            'video': 'Bài học video với nội dung chuyên sâu và ví dụ thực tế.',
            'interactive': 'Bài học tương tác với các hoạt động thực hành.',
            'scenario': 'Bài học tình huống với các case study thực tế.',
            'simulation': 'Mô phỏng trực quan để thực hành kỹ năng.',
            'vr-simulation': 'Trải nghiệm học tập với công nghệ VR.'
        };
        return descriptions[lesson.type] || 'Bài học chuyên sâu với nội dung chất lượng cao.';
    }

    getLessonObjectives(lesson) {
        // Default objectives based on lesson type
        const defaultObjectives = {
            'video': [
                'Hiểu được các khái niệm cơ bản trong bài học',
                'Nắm vững các thuật ngữ chuyên môn',
                'Áp dụng kiến thức vào tình huống thực tế'
            ],
            'interactive': [
                'Thực hành các kỹ năng thông qua bài tập tương tác',
                'Kiểm tra hiểu biết với các câu hỏi thực tế',
                'Phát triển khả năng phản ứng nhanh'
            ],
            'scenario': [
                'Phân tích các tình huống thực tế',
                'Đưa ra quyết định đúng đắn trong công việc',
                'Rèn luyện kỹ năng xử lý tình huống'
            ],
            'simulation': [
                'Thực hành kỹ năng trong môi trường mô phỏng',
                'Trải nghiệm các tình huống khó gặp trong thực tế',
                'Nâng cao tự tin trong công việc'
            ]
        };

        // Try to get lesson-specific objectives, fallback to default
        return lesson.objectives || defaultObjectives[lesson.type] || [
            'Hoàn thành bài học một cách hiệu quả',
            'Nắm vững nội dung chính của bài học',
            'Sẵn sàng áp dụng kiến thức vào thực tế'
        ];
    }

    getLessonTypeIcon(type) {
        const icons = {
            'video': '📹',
            'interactive': '🎯',
            'scenario': '🎭',
            'simulation': '🎮',
            'vr-simulation': '🥽'
        };
        return icons[type] || '📚';
    }

    isLessonCompleted(moduleId, lessonId) {
        return this.userProfile.completedModules.some(
            completed => completed.moduleId === moduleId && completed.lessonId === lessonId
        );
    }

    isCurrentLesson(moduleId, lessonId) {
        return this.userProfile.currentModule === moduleId && 
               this.userProfile.currentLesson === lessonId;
    }

    showLesson(moduleId, lessonId, level) {
        let module;
        if (level === 'mixed' || level === 'comprehensive') {
            module = this.microlearningModules.comprehensive.find(m => m.id === moduleId);
        } else {
            module = this.microlearningModules[level]?.find(m => m.id === moduleId);
        }
        
        if (!module) {
            console.error('Module not found:', moduleId);
            return;
        }
        
        const lesson = module.lessons.find(l => l.id === lessonId);
        
        if (!lesson) {
            console.error('Lesson not found:', lessonId);
            return;
        }

        // Store current lesson context for navigation
        this.currentLessonContext = {
            moduleId: moduleId,
            level: level
        };
        
        // Also update user profile
        this.userProfile.currentModule = moduleId;
        this.userProfile.currentLesson = lessonId;

        // Update breadcrumb
        document.getElementById('lessonBreadcrumb').textContent = lesson.title;
        
        // Update lesson details
        document.getElementById('lessonTitle').textContent = lesson.title;
        document.getElementById('lessonType').textContent = this.getLessonTypeDisplayName(lesson.type);
        document.getElementById('lessonTypeIcon').textContent = this.getLessonTypeIcon(lesson.type);
        document.getElementById('lessonDuration').textContent = `${lesson.duration} phút`;
        
        // Calculate progress
        const progress = this.calculateLessonProgress(moduleId, lessonId);
        document.getElementById('lessonProgressFill').style.width = `${progress}%`;
        document.getElementById('lessonProgressText').textContent = `${progress}%`;
        
        // Render lesson content
        this.renderLessonContent(lesson, moduleId, level);
        
        // Update navigation
        this.updateLessonNavigation(module, lessonId);
        
        // Show lesson viewer section
        this.showSection('lesson-viewer');
    }

    getLessonTypeDisplayName(type) {
        const typeNames = {
            'video': 'Video',
            'interactive': 'Tương tác',
            'scenario': 'Tình huống',
            'simulation': 'Mô phỏng',
            'vr-simulation': 'VR Mô phỏng'
        };
        return typeNames[type] || 'Bài học';
    }

    calculateLessonProgress(moduleId, lessonId) {
        // For now, return 0% - this would be calculated based on actual progress
        return 0;
    }

    renderLessonContent(lesson, moduleId, level) {
        const contentContainer = document.getElementById('lessonContent');
        contentContainer.innerHTML = '';

        switch (lesson.type) {
            case 'video':
                this.renderVideoContent(lesson, contentContainer);
                break;
            case 'interactive':
                this.renderInteractiveContent(lesson, contentContainer);
                break;
            case 'scenario':
                this.renderScenarioContent(lesson, contentContainer);
                break;
            case 'simulation':
            case 'vr-simulation':
                this.renderSimulationContent(lesson, contentContainer);
                break;
            default:
                this.renderDefaultContent(lesson, contentContainer);
        }
    }

    renderVideoContent(lesson, container) {
        const content = this.lessonContent[lesson.id] || this.lessonContent.getDefaultLessonContent(lesson.id, lesson.title, lesson.type);
        
        let html = `<div class="lesson-content-rich">`;
        
        // Objectives
        if (content.objectives) {
            html += `
                <div class="lesson-section">
                    <h3>🎯 Mục tiêu học tập</h3>
                    <ul class="objectives-list">
                        ${content.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Video player placeholder
        html += `
            <div class="lesson-section">
                <div class="video-player-container">
                    <div class="video-placeholder">
                        <div class="video-play-icon">▶️</div>
                        <h3>📹 ${lesson.title}</h3>
                        <p>Video hướng dẫn chi tiết - ${lesson.duration} phút</p>
                        <button class="btn btn--primary">Phát video</button>
                    </div>
                </div>
            </div>
        `;
        
        // Main content
        if (content.content) {
            html += `<div class="lesson-section">`;
            html += `<h3>📚 Nội dung chính</h3>`;
            html += `<p class="intro-text">${content.content.introduction}</p>`;
            
            // Render key steps if available
            if (content.content.keySteps) {
                html += `<div class="key-steps">`;
                content.content.keySteps.forEach(step => {
                    html += `
                        <div class="step-card">
                            <div class="step-number">Bước ${step.step}</div>
                            <h4>${step.title}</h4>
                            <p>${step.description}</p>
                            ${step.phrases ? `
                                <div class="key-phrases">
                                    <strong>Key Phrases:</strong>
                                    <ul>
                                        ${step.phrases.map(phrase => `<li>"${phrase}"</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
                html += `</div>`;
            }
            
            // Render key points if available
            if (content.content.keyPoints) {
                html += `
                    <div class="key-points">
                        <h4>💡 Điểm quan trọng</h4>
                        <ul>
                            ${content.content.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            html += `</div>`;
        }
        
        // Quiz section
        if (content.quiz && content.quiz.length > 0) {
            html += `
                <div class="lesson-section">
                    <h3>✅ Kiểm tra kiến thức</h3>
                    <div class="lesson-quiz" id="lessonQuiz">
                        ${this.renderLessonQuiz(content.quiz)}
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        container.innerHTML = html;
        
        // Attach quiz handlers
        if (content.quiz) {
            this.attachQuizHandlers(container, content.quiz);
        }
    }

    renderInteractiveContent(lesson, container) {
        const content = this.lessonContent[lesson.id] || this.lessonContent.getDefaultLessonContent(lesson.id, lesson.title, lesson.type);
        
        let html = `<div class="lesson-content-rich">`;
        
        // Objectives
        if (content.objectives) {
            html += `
                <div class="lesson-section">
                    <h3>🎯 Mục tiêu học tập</h3>
                    <ul class="objectives-list">
                        ${content.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Interactive content
        html += `
            <div class="lesson-section">
                <h3>🎯 Học tập tương tác</h3>
                <p class="intro-text">${content.content.introduction}</p>
            </div>
        `;
        
        // Main interactive elements
        if (content.content.practiceActivities) {
            html += `
                <div class="lesson-section">
                    <h3>💪 Hoạt động thực hành</h3>
                    <div class="practice-grid">
                        ${content.content.practiceActivities.map((activity, idx) => `
                            <div class="practice-card" data-activity="${idx}">
                                <div class="practice-icon">${['📹', '🎯', '🎭', '✅'][idx]}</div>
                                <h4>${activity.activity}</h4>
                                <p>${activity.description}</p>
                                <button class="btn btn--outline">Bắt đầu</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Quiz
        if (content.quiz && content.quiz.length > 0) {
            html += `
                <div class="lesson-section">
                    <h3>✅ Kiểm tra kiến thức</h3>
                    <div class="lesson-quiz">
                        ${this.renderLessonQuiz(content.quiz)}
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        container.innerHTML = html;
        
        if (content.quiz) {
            this.attachQuizHandlers(container, content.quiz);
        }
    }

    renderScenarioContent(lesson, container) {
        container.innerHTML = `
            <div class="scenario-content">
                <div class="scenario-situation">
                    <h3>🎭 ${lesson.title}</h3>
                    <p>Tình huống: Bạn đang làm việc tại lễ tân khách sạn và gặp phải tình huống khó khăn...</p>
                </div>
                <div class="scenario-choices">
                    <div class="scenario-choice" data-choice="0">
                        <strong>Lựa chọn 1:</strong> Xử lý theo quy trình chuẩn
                    </div>
                    <div class="scenario-choice" data-choice="1">
                        <strong>Lựa chọn 2:</strong> Tham khảo ý kiến cấp trên
                    </div>
                    <div class="scenario-choice" data-choice="2">
                        <strong>Lựa chọn 3:</strong> Tìm giải pháp sáng tạo
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for scenario choices
        container.querySelectorAll('.scenario-choice').forEach(choice => {
            choice.addEventListener('click', () => {
                container.querySelectorAll('.scenario-choice').forEach(ch => ch.classList.remove('selected'));
                choice.classList.add('selected');
            });
        });
    }

    renderSimulationContent(lesson, container) {
        const content = this.lessonContent[lesson.id] || this.lessonContent.getDefaultLessonContent(lesson.id, lesson.title, lesson.type);
        const isVR = lesson.type === 'vr-simulation';
        
        let html = `<div class="lesson-content-rich">`;
        
        // Objectives
        if (content.objectives) {
            html += `
                <div class="lesson-section">
                    <h3>🎯 Mục tiêu học tập</h3>
                    <ul class="objectives-list">
                        ${content.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Simulation interface
        html += `
            <div class="lesson-section">
                <div class="simulation-interface">
                    <div class="simulation-header">
                        <h3>${isVR ? '🥽' : '🎮'} ${lesson.title}</h3>
                        <p class="simulation-type">${isVR ? 'VR Simulation' : '3D Simulation'} - ${lesson.duration} phút</p>
                    </div>
                    
                    <div class="simulation-preview">
                        <div class="simulation-icon">${isVR ? '🥽' : '🎮'}</div>
                        <h4>Môi trường mô phỏng thực tế</h4>
                        <p>${content.content.introduction}</p>
                    </div>
                    
                    <div class="simulation-controls">
                        <button class="btn btn--primary btn--lg">
                            ${isVR ? '🥽 Khởi động VR' : '🎮 Bắt đầu mô phỏng'}
                        </button>
                        <button class="btn btn--outline">📖 Hướng dẫn sử dụng</button>
                    </div>
                    
                    ${content.scenarios ? `
                        <div class="simulation-scenarios">
                            <h4>Tình huống mô phỏng:</h4>
                            <ul>
                                ${content.scenarios.map(s => `<li><strong>${s.title}:</strong> ${s.situation}</li>`).join('')}
                            </ul>
                </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Key learning points
        if (content.content.keyPoints) {
            html += `
                <div class="lesson-section">
                    <h3>💡 Điểm học chính</h3>
                    <ul class="key-points">
                        ${content.content.keyPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
            </div>
        `;
        }
        
        html += `</div>`;
        container.innerHTML = html;
    }

    renderDefaultContent(lesson, container) {
        container.innerHTML = `
            <div class="lesson-content-placeholder">
                <h3>📚 ${lesson.title}</h3>
                <p>Nội dung bài học sẽ được hiển thị tại đây</p>
                <p>Thời lượng: ${lesson.duration} phút</p>
            </div>
        `;
    }

    updateLessonNavigation(module, currentLessonId) {
        const currentIndex = module.lessons.findIndex(l => l.id === currentLessonId);
        const prevBtn = document.getElementById('prevLesson');
        const nextBtn = document.getElementById('nextLesson');

        // Update previous button
        if (currentIndex > 0) {
            prevBtn.disabled = false;
            prevBtn.onclick = () => {
                const prevLesson = module.lessons[currentIndex - 1];
                this.showLesson(module.id, prevLesson.id, this.getModuleLevel(module.id));
            };
        } else {
            prevBtn.disabled = true;
        }

        // Update next button
        if (currentIndex < module.lessons.length - 1) {
            nextBtn.disabled = false;
            nextBtn.onclick = () => {
                const nextLesson = module.lessons[currentIndex + 1];
                this.showLesson(module.id, nextLesson.id, this.getModuleLevel(module.id));
            };
        } else {
            nextBtn.disabled = true;
        }
    }

    getModuleLevel(moduleId) {
        for (const level in this.microlearningModules) {
            if (this.microlearningModules[level].some(m => m.id === moduleId)) {
                return level;
            }
        }
        return 'basic';
    }

    // Enhanced Learning Path Rendering
    renderLearningPath() {
        const container = document.getElementById('learningModules');
        if (!container) return;

        container.innerHTML = '';

        // Calculate stats
        let totalModules = 0;
        let completedModules = 0;
        let totalLessons = 0;
        let completedLessons = 0;

        Object.keys(this.microlearningModules).forEach(level => {
            this.microlearningModules[level].forEach(module => {
                totalModules++;
                totalLessons += module.lessons.length;
                
                const moduleProgress = this.calculateModuleProgress(module.id, level);
                if (moduleProgress === 100) {
                    completedModules++;
                }
                
                // Count completed lessons for this module
                const moduleCompletedLessons = this.userProfile.completedModules
                    .filter(completed => completed.moduleId === module.id).length;
                completedLessons += moduleCompletedLessons;
            });
        });

        // Update stats
        document.getElementById('totalModules').textContent = totalModules;
        document.getElementById('completedModules').textContent = completedModules;
        document.getElementById('totalLessons').textContent = totalLessons;
        document.getElementById('completedLessons').textContent = completedLessons;

        // Render all comprehensive modules
        const levelSection = document.createElement('div');
        levelSection.className = 'level-section';
        
        levelSection.innerHTML = `
            <h2 class="level-title">Module Học Tập Toàn Diện</h2>
            <div class="level-modules" id="modules-comprehensive"></div>
        `;
        
        container.appendChild(levelSection);
        
        const levelContainer = document.getElementById('modules-comprehensive');
        this.microlearningModules.comprehensive.forEach(module => {
            const moduleElement = this.createModuleCard(module, 'comprehensive');
            levelContainer.appendChild(moduleElement);
        });
    }

    createModuleCard(module, level) {
        const progress = this.calculateModuleProgress(module.id, level);
        const isCompleted = progress === 100;
        const isInProgress = progress > 0 && progress < 100;

        const card = document.createElement('div');
        card.className = `module-card ${isCompleted ? 'completed' : isInProgress ? 'in-progress' : ''}`;
        
        // Calculate lesson count
        const totalLessons = module.lessons.length;
        const completedLessons = module.lessons.filter(lesson => 
            this.isLessonCompleted(module.id, lesson.id)
        ).length;
        
        card.innerHTML = `
            <div class="module-header">
                <div class="module-header-top">
                    <h3>${module.title}</h3>
                    ${isCompleted ? '<span class="module-badge completed">✓ Hoàn thành</span>' : 
                      isInProgress ? '<span class="module-badge in-progress">⚡ Đang học</span>' : ''}
                </div>
                <div class="module-meta">
                    <span class="module-duration">${module.duration} phút</span>
                    <span class="module-level">${this.getLevelDisplayName(level)}</span>
                    <span class="module-lesson-count">${totalLessons} bài học</span>
                </div>
            </div>
            
            ${progress > 0 ? `
                <div class="module-progress-bar">
                    <div class="module-progress-fill ${isCompleted ? 'completed' : ''}" 
                         style="width: ${progress}%"></div>
                </div>
            ` : ''}
            
            <p class="module-description">${this.getModuleDescription(module.id, level)}</p>
            
            <div class="module-lessons">
                ${module.lessons.slice(0, 3).map((lesson, index) => `
                    <div class="lesson-summary ${this.isLessonCompleted(module.id, lesson.id) ? 'completed' : this.isCurrentLesson(module.id, lesson.id) ? 'current' : ''}">
                        <span class="lesson-summary-icon">${this.getLessonTypeIcon(lesson.type)}</span>
                        <span class="lesson-summary-title">${lesson.title}</span>
                        <span class="lesson-summary-duration">${lesson.duration} phút</span>
                    </div>
                `).join('')}
                ${module.lessons.length > 3 ? `
                    <div class="lesson-summary-more">
                        + ${module.lessons.length - 3} bài học khác
                    </div>
                ` : ''}
            </div>
            
            <div class="module-actions">
                <button class="btn btn--primary" data-module-id="${module.id}" data-level="${level}">
                    ${isCompleted ? '🔄 Xem lại' : isInProgress ? '▶️ Tiếp tục' : '🚀 Bắt đầu'}
                </button>
                <button class="btn btn--outline" data-module-id="${module.id}" data-level="${level}">
                    📋 Chi tiết
                </button>
            </div>
        `;

        // Add event listeners
        card.querySelectorAll('button[data-module-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const moduleId = btn.dataset.moduleId;
                const level = btn.dataset.level;
                
                if (btn.textContent.includes('Chi tiết')) {
                    this.showModuleDetail(moduleId, level);
                } else {
                    // Start or continue module
                    const firstLesson = this.microlearningModules[level]
                        .find(m => m.id === moduleId).lessons[0];
                    this.showLesson(moduleId, firstLesson.id, level);
                }
            });
        });

        return card;
    }

    // NEW: Navigation and Action Methods
    startCurrentModule() {
        // Get current module from breadcrumb or stored state
        const moduleTitle = document.getElementById('moduleBreadcrumb').textContent;
        const level = this.getCurrentModuleLevel();
        
        let module;
        if (level === 'mixed' || level === 'comprehensive') {
            module = this.microlearningModules.comprehensive.find(m => m.title === moduleTitle);
        } else {
            module = this.microlearningModules[level]?.find(m => m.title === moduleTitle);
        }
        
        if (module && module.lessons.length > 0) {
            const firstLesson = module.lessons[0];
            this.showLesson(module.id, firstLesson.id, level);
        }
    }

    getCurrentModuleLevel() {
        // This would be stored in the app state
        return this.userProfile.currentLevel || 'comprehensive';
    }

    toggleModuleBookmark() {
        const moduleTitle = document.getElementById('moduleBreadcrumb').textContent;
        const level = this.getCurrentModuleLevel();
        
        let module;
        if (level === 'mixed' || level === 'comprehensive') {
            module = this.microlearningModules.comprehensive.find(m => m.title === moduleTitle);
        } else {
            module = this.microlearningModules[level]?.find(m => m.title === moduleTitle);
        }
        
        if (module) {
            // Toggle bookmark state
            const isBookmarked = this.userProfile.bookmarkedModules?.includes(module.id) || false;
            if (!this.userProfile.bookmarkedModules) {
                this.userProfile.bookmarkedModules = [];
            }
            
            if (isBookmarked) {
                this.userProfile.bookmarkedModules = this.userProfile.bookmarkedModules.filter(id => id !== module.id);
                this.showNotification('Đã bỏ đánh dấu module', 'info');
            } else {
                this.userProfile.bookmarkedModules.push(module.id);
                this.showNotification('Đã đánh dấu module', 'success');
            }
            
            this.saveUserProfile();
        }
    }

    backToCurrentModule() {
        console.log('backToCurrentModule called');
        console.log('Current lesson context:', this.currentLessonContext);
        
        // Use stored context instead of searching by lesson title
        if (this.currentLessonContext.moduleId && this.currentLessonContext.level) {
            console.log('Using stored context to show module detail');
            this.showModuleDetail(this.currentLessonContext.moduleId, this.currentLessonContext.level);
        } else {
            // Fallback to learning path if context is not available
            console.warn('No lesson context available, returning to learning path');
            this.showSection('microlearning');
        }
    }

    completeCurrentLesson() {
        // Use stored context instead of searching by lesson title
        if (!this.currentLessonContext.moduleId || !this.currentLessonContext.level) {
            console.error('No lesson context available');
            return;
        }
        
        const module = this.microlearningModules[this.currentLessonContext.level]
            .find(m => m.id === this.currentLessonContext.moduleId);
        const lessonTitle = document.getElementById('lessonTitle').textContent;
        
        if (module) {
            const lesson = module.lessons.find(l => l.title === lessonTitle);
            if (lesson) {
                // Mark lesson as completed
                const completion = {
                    moduleId: module.id,
                    lessonId: lesson.id,
                    completedAt: new Date().toISOString(),
                    level: this.currentLessonContext.level
                };
                
                if (!this.userProfile.completedModules) {
                    this.userProfile.completedModules = [];
                }
                
                // Check if already completed
                const existingIndex = this.userProfile.completedModules.findIndex(
                    c => c.moduleId === module.id && c.lessonId === lesson.id
                );
                
                if (existingIndex === -1) {
                    this.userProfile.completedModules.push(completion);
                    this.userProfile.totalPoints += this.gamification.points.lessonComplete;
                    this.showNotification('Chúc mừng! Bạn đã hoàn thành bài học', 'success');
                    
                    // Check for module completion
                    const moduleProgress = this.calculateModuleProgress(module.id, this.currentLessonContext.level);
                    if (moduleProgress === 100) {
                        this.userProfile.totalPoints += this.gamification.points.moduleComplete;
                        this.showNotification('Tuyệt vời! Bạn đã hoàn thành module', 'success');
                        this.handleModuleCompletion(module, this.currentLessonContext.level);
                    }
                    
                    this.saveUserProfile();
                    this.updateDashboardStats();
                }
            }
        }
    }

    toggleLessonBookmark() {
        // Use stored context instead of searching by lesson title
        if (!this.currentLessonContext.moduleId || !this.currentLessonContext.level) {
            console.error('No lesson context available');
            return;
        }
        
        const module = this.microlearningModules[this.currentLessonContext.level]
            .find(m => m.id === this.currentLessonContext.moduleId);
        const lessonTitle = document.getElementById('lessonTitle').textContent;
        
        if (module) {
            const lesson = module.lessons.find(l => l.title === lessonTitle);
            if (lesson) {
                const lessonId = `${module.id}-${lesson.id}`;
                const isBookmarked = this.userProfile.bookmarkedLessons?.includes(lessonId) || false;
                
                if (!this.userProfile.bookmarkedLessons) {
                    this.userProfile.bookmarkedLessons = [];
                }
                
                if (isBookmarked) {
                    this.userProfile.bookmarkedLessons = this.userProfile.bookmarkedLessons.filter(id => id !== lessonId);
                    this.showNotification('Đã bỏ đánh dấu bài học', 'info');
                } else {
                    this.userProfile.bookmarkedLessons.push(lessonId);
                    this.showNotification('Đã đánh dấu bài học', 'success');
                }
                
                this.saveUserProfile();
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        // Add to notification container
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }

        container.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }

    saveUserProfile() {
        try {
            localStorage.setItem('hospitalityUserProfile', JSON.stringify(this.userProfile));
        } catch (error) {
            console.error('Error saving user profile:', error);
        }
    }

    // ===== AI RECOMMENDATION ENGINE & PERSONALIZED LEARNING =====
    
    generatePersonalizedRecommendations() {
        const recommendations = [];
        const userLevel = this.userProfile.currentLevel;
        const completedModules = this.userProfile.completedModules || [];
        const performance = this.userProfile.performanceHistory;
        
        // Analyze weak areas based on quiz scores
        const weakAreas = this.identifyWeakAreas();
        
        // Generate recommendations based on role and performance
        const roleRecommendations = this.getRoleBasedRecommendations();
        
        // Get recommendations for weak areas
        const weakAreaRecommendations = this.getWeakAreaRecommendations(weakAreas);
        
        // Get next level recommendations if user is performing well
        const levelUpRecommendations = this.getLevelUpRecommendations();
        
        // Combine and prioritize recommendations
        recommendations.push(...roleRecommendations, ...weakAreaRecommendations, ...levelUpRecommendations);
        
        // Remove duplicates and limit to top 3
        const uniqueRecommendations = recommendations.filter((rec, index, self) => 
            index === self.findIndex(r => r.lessonId === rec.lessonId)
        ).slice(0, 3);
        
        this.userProfile.recommendedLessons = uniqueRecommendations;
        return uniqueRecommendations;
    }
    
    identifyWeakAreas() {
        const weakAreas = [];
        const quizScores = this.userProfile.performanceHistory.quizScores || {};
        const scenarioScores = this.userProfile.performanceHistory.scenarioScores || {};
        
        // Analyze quiz performance by category
        Object.keys(quizScores).forEach(lessonId => {
            const scores = quizScores[lessonId];
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            
            if (avgScore < 0.7) { // Less than 70%
                const lesson = this.findLessonById(lessonId);
                if (lesson) {
                    weakAreas.push({
                        category: lesson.category || 'General',
                        lessonId: lessonId,
                        accuracy: avgScore,
                        lastPractice: new Date().toISOString()
                    });
                }
            }
        });
        
        // Analyze scenario performance
        Object.keys(scenarioScores).forEach(scenarioId => {
            const scores = scenarioScores[scenarioId];
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            
            if (avgScore < 0.8) { // Less than 80%
                weakAreas.push({
                    category: 'Scenarios',
                    lessonId: scenarioId,
                    accuracy: avgScore,
                    lastPractice: new Date().toISOString()
                });
            }
        });
        
        this.userProfile.weakAreas = weakAreas;
        return weakAreas;
    }
    
    getRoleBasedRecommendations() {
        const recommendations = [];
        const role = this.userProfile.learningPath;
        const completedModules = this.userProfile.completedModules || [];
        
        // Define role-based lesson priorities
        const rolePriorities = {
            'reception': ['check-in-process', 'reservation-handling', 'guest-communication', 'complaint-handling'],
            'housekeeping': ['room-cleaning', 'quality-inspection', 'inventory-management', 'guest-requests'],
            'restaurant': ['basic-service', 'wine-service', 'table-service', 'upselling-techniques'],
            'food-safety': ['haccp-principles', 'allergy-awareness', 'hygiene-practices', 'temperature-control']
        };
        
        const priorities = rolePriorities[role] || [];
        
        priorities.forEach(lessonId => {
            if (!completedModules.includes(lessonId)) {
                const lesson = this.findLessonById(lessonId);
                if (lesson) {
                    recommendations.push({
                        lessonId: lessonId,
                        reason: `Được đề xuất cho vai trò ${role}`,
                        priority: 'high',
                        type: 'role-based'
                    });
                }
            }
        });
        
        return recommendations;
    }
    
    getWeakAreaRecommendations(weakAreas) {
        const recommendations = [];
        
        weakAreas.forEach(weakArea => {
            // Find related lessons for practice
            const relatedLessons = this.findRelatedLessons(weakArea.category);
            
            relatedLessons.forEach(lessonId => {
                recommendations.push({
                    lessonId: lessonId,
                    reason: `Cải thiện điểm yếu: ${weakArea.category}`,
                    priority: 'high',
                    type: 'weak-area'
                });
            });
        });
        
        return recommendations;
    }
    
    getLevelUpRecommendations() {
        const recommendations = [];
        const userLevel = this.userProfile.currentLevel;
        const completedModules = this.userProfile.completedModules || [];
        
        // Check if user is ready for next level
        if (this.isReadyForNextLevel()) {
            const nextLevel = this.getNextLevel(userLevel);
            const nextLevelLessons = this.getLessonsForLevel(nextLevel);
            
            nextLevelLessons.slice(0, 2).forEach(lessonId => {
                recommendations.push({
                    lessonId: lessonId,
                    reason: `Sẵn sàng cho cấp độ ${nextLevel}`,
                    priority: 'medium',
                    type: 'level-up'
                });
            });
        }
        
        return recommendations;
    }
    
    isReadyForNextLevel() {
        const quizScores = this.userProfile.performanceHistory.quizScores || {};
        const scenarioScores = this.userProfile.performanceHistory.scenarioScores || {};
        
        // Check if user has good performance in current level
        const allScores = [];
        Object.values(quizScores).forEach(scores => allScores.push(...scores));
        Object.values(scenarioScores).forEach(scores => allScores.push(...scores));
        
        if (allScores.length < 5) return false; // Need at least 5 attempts
        
        const avgScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;
        return avgScore >= 0.8; // 80% or higher
    }
    
    findLessonById(lessonId) {
        // Search through all modules for the lesson
        for (const moduleId in this.microlearningModules.comprehensive) {
            const module = this.microlearningModules.comprehensive[moduleId];
            const lesson = module.lessons.find(l => l.id === lessonId);
            if (lesson) return lesson;
        }
        return null;
    }
    
    findRelatedLessons(category) {
        const relatedLessons = [];
        
        // Find lessons in the same category
        for (const moduleId in this.microlearningModules.comprehensive) {
            const module = this.microlearningModules.comprehensive[moduleId];
            module.lessons.forEach(lesson => {
                if (lesson.category === category || module.title.includes(category)) {
                    relatedLessons.push(lesson.id);
                }
            });
        }
        
        return relatedLessons.slice(0, 3); // Limit to 3 related lessons
    }
    
    getNextLevel(currentLevel) {
        const levels = ['basic', 'intermediate', 'advanced'];
        const currentIndex = levels.indexOf(currentLevel);
        return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
    }
    
    getLessonsForLevel(level) {
        const lessons = [];
        
        for (const moduleId in this.microlearningModules.comprehensive) {
            const module = this.microlearningModules.comprehensive[moduleId];
            module.lessons.forEach(lesson => {
                if (lesson.level === level) {
                    lessons.push(lesson.id);
                }
            });
        }
        
        return lessons;
    }
    
    updateLearningPath() {
        const userLevel = this.userProfile.currentLevel;
        const performance = this.userProfile.performanceHistory;
        
        // Adjust difficulty based on performance
        if (this.isReadyForNextLevel()) {
            const nextLevel = this.getNextLevel(userLevel);
            this.userProfile.currentLevel = nextLevel;
            this.showNotification(`Chúc mừng! Bạn đã lên cấp độ ${nextLevel}!`, 'success');
            this.addPoints(50, 'Lên cấp độ');
        }
        
        // Update recommendations
        this.generatePersonalizedRecommendations();
        this.saveUserProfile();
    }
    
    // ===== SPACED REPETITION SYSTEM =====
    
    calculateSpacedRepetition() {
        const reviewSchedule = this.userProfile.reviewSchedule || [];
        const today = new Date();
        
        // Check which terms are due for review
        const dueReviews = reviewSchedule.filter(item => {
            const nextReview = new Date(item.nextReview);
            return nextReview <= today;
        });
        
        return dueReviews;
    }
    
    updateSpacedRepetition(termId, difficulty, isCorrect) {
        let reviewSchedule = this.userProfile.reviewSchedule || [];
        
        // Find existing item or create new one
        let item = reviewSchedule.find(item => item.termId === termId);
        
        if (!item) {
            item = {
                termId: termId,
                interval: 1, // Start with 1 day
                repetitions: 0,
                easeFactor: 2.5,
                nextReview: new Date().toISOString()
            };
            reviewSchedule.push(item);
        }
        
        // Update based on performance
        if (isCorrect) {
            item.repetitions++;
            
            if (item.repetitions === 1) {
                item.interval = 1;
            } else if (item.repetitions === 2) {
                item.interval = 6;
            } else {
                item.interval = Math.round(item.interval * item.easeFactor);
            }
            
            // Increase ease factor slightly for good performance
            item.easeFactor = Math.max(1.3, item.easeFactor + 0.1);
        } else {
            // Reset for incorrect answers
            item.repetitions = 0;
            item.interval = 1;
            item.easeFactor = Math.max(1.3, item.easeFactor - 0.2);
        }
        
        // Calculate next review date
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + item.interval);
        item.nextReview = nextReview.toISOString();
        
        this.userProfile.reviewSchedule = reviewSchedule;
        this.saveUserProfile();
    }
    
    // ===== SOCIAL LEARNING FEATURES =====
    
    processDiscussionPost(content, moduleId) {
        const post = {
            id: Date.now().toString(),
            userId: 'user_' + Math.random().toString(36).substr(2, 9),
            moduleId: moduleId,
            content: content,
            timestamp: new Date().toISOString(),
            replies: [],
            likes: 0
        };
        
        this.discussions.push(post);
        this.saveDiscussions();
        
        // Award points for contributing
        this.addPoints(3, 'Đóng góp thảo luận');
        
        // Check for discussion star badge
        this.checkBadge('discussion-star', this.discussions.length);
        
        return post;
    }
    
    saveDiscussions() {
        try {
            localStorage.setItem('hospitalityDiscussions', JSON.stringify(this.discussions));
        } catch (error) {
            console.error('Error saving discussions:', error);
        }
    }
    
    loadDiscussions() {
        try {
            const saved = localStorage.getItem('hospitalityDiscussions');
            if (saved) {
                this.discussions = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading discussions:', error);
        }
    }
    
    matchStudyBuddy() {
        // Simple study buddy matching based on role and level
        const userRole = this.userProfile.learningPath;
        const userLevel = this.userProfile.currentLevel;
        
        // In a real app, this would match with other users
        // For demo, we'll return a mock study buddy
        return {
            id: 'buddy_123',
            name: 'Nguyễn Văn A',
            role: userRole,
            level: userLevel,
            progress: 75,
            lastActive: '2 hours ago',
            sharedInterests: ['reception', 'guest-services']
        };
    }
    
    // ===== ENHANCED GAMIFICATION =====
    
    updateLeaderboards() {
        // Update daily leaderboard
        this.leaderboard.daily = this.calculateDailyLeaderboard();
        
        // Update weekly leaderboard
        this.leaderboard.weekly = this.calculateWeeklyLeaderboard();
        
        // Update monthly leaderboard
        this.leaderboard.monthly = this.calculateMonthlyLeaderboard();
        
        this.saveLeaderboards();
    }
    
    calculateDailyLeaderboard() {
        // In a real app, this would aggregate data from all users
        // For demo, we'll return mock data
        return [
            { userId: 'user_1', xp: 150, rank: 1, name: 'Nguyễn Văn A' },
            { userId: 'user_2', xp: 120, rank: 2, name: 'Trần Thị B' },
            { userId: 'user_3', xp: 100, rank: 3, name: 'Lê Văn C' },
            { userId: 'current_user', xp: this.userProfile.totalPoints, rank: 4, name: 'Bạn' }
        ].sort((a, b) => b.xp - a.xp);
    }
    
    calculateWeeklyLeaderboard() {
        return [
            { userId: 'user_1', lessons: 25, rank: 1, name: 'Nguyễn Văn A' },
            { userId: 'user_2', lessons: 20, rank: 2, name: 'Trần Thị B' },
            { userId: 'current_user', lessons: this.userProfile.completedModules.length, rank: 3, name: 'Bạn' }
        ].sort((a, b) => b.lessons - a.lessons);
    }
    
    calculateMonthlyLeaderboard() {
        const accuracy = this.calculateOverallAccuracy();
        return [
            { userId: 'user_1', accuracy: 95, rank: 1, name: 'Nguyễn Văn A' },
            { userId: 'user_2', accuracy: 92, rank: 2, name: 'Trần Thị B' },
            { userId: 'current_user', accuracy: accuracy, rank: 3, name: 'Bạn' }
        ].sort((a, b) => b.accuracy - a.accuracy);
    }
    
    calculateOverallAccuracy() {
        const quizScores = this.userProfile.performanceHistory.quizScores || {};
        const allScores = [];
        
        Object.values(quizScores).forEach(scores => allScores.push(...scores));
        
        if (allScores.length === 0) return 0;
        
        const avgScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;
        return Math.round(avgScore * 100);
    }
    
    saveLeaderboards() {
        try {
            localStorage.setItem('hospitalityLeaderboards', JSON.stringify(this.leaderboard));
        } catch (error) {
            console.error('Error saving leaderboards:', error);
        }
    }
    
    loadLeaderboards() {
        try {
            const saved = localStorage.getItem('hospitalityLeaderboards');
            if (saved) {
                this.leaderboard = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading leaderboards:', error);
        }
    }
    
    awardBadge(badgeId) {
        if (!this.userProfile.badges.includes(badgeId)) {
            this.userProfile.badges.push(badgeId);
            this.addPoints(this.gamification.points.badgeEarned, 'Nhận badge mới');
            this.showBadgeNotification(badgeId);
            this.saveUserProfile();
            return true;
        }
        return false;
    }
    
    showBadgeNotification(badgeId) {
        const badge = this.gamification.badges[badgeId];
        if (badge) {
            this.showNotification(`🏆 Chúc mừng! Bạn đã nhận được badge "${badge.name}"!`, 'success');
        }
    }
    
    checkBadge(badgeId, currentValue) {
        const badgeThresholds = {
            'milestone-50': 50,
            'milestone-100': 100,
            'milestone-1000': 1000,
            'discussion-star': 20,
            'helpful-mentor': 10
        };
        
        if (badgeThresholds[badgeId] && currentValue >= badgeThresholds[badgeId]) {
            this.awardBadge(badgeId);
        }
    }
    
    // ===== INTERACTIVE CONTENT ENHANCEMENTS =====
    
    trackInteractionFeedback(interactionType, isCorrect, explanation) {
        // Show immediate feedback
        const feedbackElement = document.createElement('div');
        feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackElement.innerHTML = `
            <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
            <div class="feedback-text">${explanation}</div>
        `;
        
        // Add to current lesson content
        const lessonContent = document.getElementById('lessonContent');
        if (lessonContent) {
            lessonContent.appendChild(feedbackElement);
            
            // Auto-remove after 3 seconds
            setTimeout(() => {
                feedbackElement.remove();
            }, 3000);
        }
        
        // Update performance tracking
        this.updatePerformanceHistory(interactionType, isCorrect);
    }
    
    updatePerformanceHistory(lessonId, isCorrect) {
        const performance = this.userProfile.performanceHistory;
        
        if (!performance.quizScores[lessonId]) {
            performance.quizScores[lessonId] = [];
        }
        
        performance.quizScores[lessonId].push(isCorrect ? 1 : 0);
        performance.lastPerformanceUpdate = new Date().toISOString();
        
        this.saveUserProfile();
    }
    
    generateDailyQuiz() {
        const questions = [];
        const userLevel = this.userProfile.currentLevel;
        const weakAreas = this.userProfile.weakAreas || [];
        
        // Get 3 questions from weak areas
        weakAreas.slice(0, 3).forEach(weakArea => {
            const lesson = this.findLessonById(weakArea.lessonId);
            if (lesson && lesson.quiz) {
                const randomQuiz = lesson.quiz[Math.floor(Math.random() * lesson.quiz.length)];
                questions.push({
                    ...randomQuiz,
                    source: 'weak-area',
                    category: weakArea.category
                });
            }
        });
        
        // Get 2 random questions from current level
        const currentLevelLessons = this.getLessonsForLevel(userLevel);
        for (let i = 0; i < 2 && questions.length < 5; i++) {
            const randomLessonId = currentLevelLessons[Math.floor(Math.random() * currentLevelLessons.length)];
            const lesson = this.findLessonById(randomLessonId);
            if (lesson && lesson.quiz) {
                const randomQuiz = lesson.quiz[Math.floor(Math.random() * lesson.quiz.length)];
                questions.push({
                    ...randomQuiz,
                    source: 'current-level',
                    category: lesson.category || 'General'
                });
            }
        }
        
        return questions.slice(0, 5); // Ensure exactly 5 questions
    }
    
    // ===== ENHANCED QUIZ SYSTEM =====
    
    handleQuizAnswer(selectedOption, question, lessonId) {
        const isCorrect = selectedOption === question.correct;
        const explanation = this.getQuizExplanation(question, selectedOption, isCorrect);
        
        // Show immediate feedback
        this.trackInteractionFeedback(lessonId, isCorrect, explanation);
        
        // Update performance history
        this.updatePerformanceHistory(lessonId, isCorrect);
        
        // Award points
        if (isCorrect) {
            this.addPoints(this.gamification.points.quizCorrect, 'Trả lời đúng quiz');
        }
        
        // Check for quiz master badge
        if (isCorrect) {
            this.checkQuizMasterBadge(lessonId);
        }
        
        return { isCorrect, explanation };
    }
    
    getQuizExplanation(question, selectedOption, isCorrect) {
        if (isCorrect) {
            return `Chính xác! ${question.options[selectedOption]} là câu trả lời đúng.`;
        } else {
            const correctAnswer = question.options[question.correct];
            return `Không đúng. Câu trả lời đúng là: ${correctAnswer}`;
        }
    }
    
    checkQuizMasterBadge(lessonId) {
        const quizScores = this.userProfile.performanceHistory.quizScores[lessonId] || [];
        const recentScores = quizScores.slice(-5); // Last 5 attempts
        
        if (recentScores.length >= 5 && recentScores.every(score => score === 1)) {
            this.awardBadge('quiz-master');
        }
    }
    
    // ===== DAILY MINI-QUIZ =====
    
    startDailyMiniQuiz() {
        const questions = this.generateDailyQuiz();
        if (questions.length === 0) {
            this.showNotification('Không có câu hỏi phù hợp cho quiz hôm nay', 'info');
            return;
        }
        
        this.currentMiniQuiz = {
            questions: questions,
            currentQuestionIndex: 0,
            correctAnswers: 0,
            startTime: Date.now()
        };
        
        this.showMiniQuizModal();
    }
    
    showMiniQuizModal() {
        const modal = document.createElement('div');
        modal.className = 'mini-quiz-modal';
        modal.innerHTML = `
            <div class="mini-quiz-content">
                <div class="mini-quiz-header">
                    <h3>📚 Quiz nhanh hàng ngày</h3>
                    <div class="quiz-progress">
                        <span id="miniQuizProgress">1/5</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 20%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="mini-quiz-question">
                    <h4 id="miniQuizQuestion">Câu hỏi</h4>
                    <div class="mini-quiz-options" id="miniQuizOptions">
                        <!-- Options will be populated -->
                    </div>
                </div>
                
                <div class="mini-quiz-feedback hidden" id="miniQuizFeedback">
                    <p id="miniQuizExplanation"></p>
                    <button class="btn btn--primary" onclick="app.nextMiniQuizQuestion()">
                        Tiếp theo
                    </button>
                </div>
                
                <div class="mini-quiz-results hidden" id="miniQuizResults">
                    <h3>🎉 Hoàn thành quiz!</h3>
                    <div class="results-stats">
                        <div class="stat">
                            <span class="stat-value" id="miniQuizScore">0/5</span>
                            <span class="stat-label">Điểm số</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value" id="miniQuizTime">0s</span>
                            <span class="stat-label">Thời gian</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value" id="miniQuizXP">+0 XP</span>
                            <span class="stat-label">Điểm thưởng</span>
                        </div>
                    </div>
                    <button class="btn btn--primary" onclick="app.closeMiniQuizModal()">
                        Đóng
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.updateMiniQuizDisplay();
    }
    
    updateMiniQuizDisplay() {
        const quiz = this.currentMiniQuiz;
        const question = quiz.questions[quiz.currentQuestionIndex];
        
        document.getElementById('miniQuizQuestion').textContent = question.question;
        document.getElementById('miniQuizProgress').textContent = `${quiz.currentQuestionIndex + 1}/5`;
        document.querySelector('.progress-fill').style.width = `${((quiz.currentQuestionIndex + 1) / 5) * 100}%`;
        
        const optionsContainer = document.getElementById('miniQuizOptions');
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <button class="mini-quiz-option" onclick="app.selectMiniQuizAnswer(${index})">
                ${String.fromCharCode(65 + index)}. ${option}
            </button>
        `).join('');
        
        // Hide feedback and results
        document.getElementById('miniQuizFeedback').classList.add('hidden');
        document.getElementById('miniQuizResults').classList.add('hidden');
    }
    
    selectMiniQuizAnswer(selectedOption) {
        const quiz = this.currentMiniQuiz;
        const question = quiz.questions[quiz.currentQuestionIndex];
        const isCorrect = selectedOption === question.correct;
        
        // Update score
        if (isCorrect) {
            quiz.correctAnswers++;
        }
        
        // Show feedback
        const feedback = document.getElementById('miniQuizFeedback');
        const explanation = document.getElementById('miniQuizExplanation');
        
        explanation.textContent = this.getQuizExplanation(question, selectedOption, isCorrect);
        feedback.classList.remove('hidden');
        
        // Disable options
        document.querySelectorAll('.mini-quiz-option').forEach((btn, index) => {
            btn.disabled = true;
            if (index === selectedOption) {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
            if (index === question.correct) {
                btn.classList.add('correct');
            }
        });
    }
    
    nextMiniQuizQuestion() {
        const quiz = this.currentMiniQuiz;
        quiz.currentQuestionIndex++;
        
        if (quiz.currentQuestionIndex < quiz.questions.length) {
            this.updateMiniQuizDisplay();
        } else {
            this.showMiniQuizResults();
        }
    }
    
    showMiniQuizResults() {
        const quiz = this.currentMiniQuiz;
        const timeSpent = Math.round((Date.now() - quiz.startTime) / 1000);
        const xpEarned = quiz.correctAnswers * 5;
        
        // Award XP
        this.addPoints(xpEarned, 'Hoàn thành quiz hàng ngày');
        
        // Update display
        document.getElementById('miniQuizScore').textContent = `${quiz.correctAnswers}/5`;
        document.getElementById('miniQuizTime').textContent = `${timeSpent}s`;
        document.getElementById('miniQuizXP').textContent = `+${xpEarned} XP`;
        
        // Show results
        document.getElementById('miniQuizFeedback').classList.add('hidden');
        document.getElementById('miniQuizResults').classList.remove('hidden');
        
        // Check for speed demon badge
        if (timeSpent < 60 && quiz.correctAnswers >= 4) {
            this.awardBadge('speed-demon');
        }
    }
    
    closeMiniQuizModal() {
        const modal = document.querySelector('.mini-quiz-modal');
        if (modal) {
            modal.remove();
        }
        this.currentMiniQuiz = null;
    }

    loadUserProfile() {
        try {
            const saved = localStorage.getItem('hospitalityUserProfile');
        if (saved) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
        }
        
        // Initialize new features
        this.loadDiscussions();
        this.loadLeaderboards();
        this.generatePersonalizedRecommendations();
        this.updateLeaderboards();
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    handleModuleCompletion(module, level) {
        // Mark module as completed
        if (!this.userProfile.completedModules) {
            this.userProfile.completedModules = [];
        }
        
        const moduleCompletion = {
            moduleId: module.id,
            level: level,
            completedAt: new Date().toISOString(),
            totalLessons: module.lessons.length,
            duration: module.duration
        };
        
        // Check if module already completed
        const existingModuleIndex = this.userProfile.completedModules.findIndex(
            c => c.moduleId === module.id && c.level === level
        );
        
        if (existingModuleIndex === -1) {
            this.userProfile.completedModules.push(moduleCompletion);
        }
        
        // Award completion badge
        this.awardBadge('module-complete', module.title);
        
        // Check for level completion
        this.checkLevelCompletion(level);
        
        // Show completion modal
        this.showCompletionModal(module, level);
    }

    awardBadge(badgeId, context = '') {
        if (!this.userProfile.badges) {
            this.userProfile.badges = [];
        }
        
        if (!this.userProfile.badges.includes(badgeId)) {
            this.userProfile.badges.push(badgeId);
            this.userProfile.totalPoints += this.gamification.points.badgeEarned;
            
            const badge = this.gamification.badges[badgeId];
            if (badge) {
                this.showNotification(`🏆 Chúc mừng! Bạn đã nhận được huy hiệu: ${badge.name}`, 'success');
            }
        }
    }

    checkLevelCompletion(level) {
        const levelModules = this.microlearningModules[level];
        const completedInLevel = this.userProfile.completedModules.filter(
            c => c.level === level
        ).length;
        
        if (completedInLevel === levelModules.length) {
            this.awardBadge(`level-${level}-complete`);
            this.showNotification(`🎉 Chúc mừng! Bạn đã hoàn thành tất cả module ${this.getLevelDisplayName(level)}!`, 'success');
        }
    }

    showCompletionModal(module, level) {
        // Create completion modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🎉 Hoàn thành Module!</h3>
                </div>
                <div class="modal-body">
                    <div class="completion-celebration">
                        <div class="completion-icon">🏆</div>
                        <h2>${module.title}</h2>
                        <p class="completion-level">Cấp độ: ${this.getLevelDisplayName(level)}</p>
                        <div class="completion-stats">
                            <div class="stat">
                                <span class="stat-number">${module.lessons.length}</span>
                                <span class="stat-label">Bài học</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${module.duration}</span>
                                <span class="stat-label">Phút</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${this.gamification.points.moduleComplete}</span>
                                <span class="stat-label">Điểm</span>
                            </div>
                        </div>
                        <div class="completion-certificate">
                            <p>📜 Chứng chỉ hoàn thành đã được cấp!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn--primary" id="continueLearning">Tiếp tục học</button>
                    <button class="btn btn--outline" id="viewCertificate">Xem chứng chỉ</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('#continueLearning').addEventListener('click', () => {
            document.body.removeChild(modal);
            this.showSection('microlearning');
        });
        
        modal.querySelector('#viewCertificate').addEventListener('click', () => {
            this.showCertificate(module, level);
            document.body.removeChild(modal);
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    showCertificate(module, level) {
        // Create certificate modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="modal-content certificate-modal">
                <div class="modal-header">
                    <h3>📜 Chứng chỉ hoàn thành</h3>
                </div>
                <div class="modal-body">
                    <div class="certificate">
                        <div class="certificate-header">
                            <h1>CHỨNG CHỈ HOÀN THÀNH</h1>
                            <h2>${module.title}</h2>
                            <p class="certificate-level">Cấp độ: ${this.getLevelDisplayName(level)}</p>
                        </div>
                        <div class="certificate-body">
                            <p>Được cấp cho:</p>
                            <h3>Học viên</h3>
                            <p>Đã hoàn thành thành công module học tập với ${module.lessons.length} bài học trong ${module.duration} phút.</p>
                            <div class="certificate-date">
                                <p>Ngày cấp: ${new Date().toLocaleDateString('vi-VN')}</p>
                            </div>
                        </div>
                        <div class="certificate-footer">
                            <div class="signature">
                                <p>Ths. Ngô Đình Minh Quang</p>
                                <p>Giảng viên</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn--primary" id="downloadCertificate">Tải xuống</button>
                    <button class="btn btn--outline" id="closeCertificate">Đóng</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('#downloadCertificate').addEventListener('click', () => {
            this.downloadCertificate(module, level);
        });
        
        modal.querySelector('#closeCertificate').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    downloadCertificate(module, level) {
        // Create a simple text-based certificate for download
        const certificateContent = `
CHỨNG CHỈ HOÀN THÀNH
${module.title}
Cấp độ: ${this.getLevelDisplayName(level)}

Được cấp cho: Học viên
Đã hoàn thành thành công module học tập với ${module.lessons.length} bài học trong ${module.duration} phút.

Ngày cấp: ${new Date().toLocaleDateString('vi-VN')}

Ths. Ngô Đình Minh Quang
Giảng viên
        `;
        
        const blob = new Blob([certificateContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Chung_chi_${module.id}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Chứng chỉ đã được tải xuống!', 'success');
    }

    // NEW: Module Accordion Toggle
    toggleModule(moduleId) {
        const content = document.getElementById(`content-${moduleId}`);
        const toggle = document.querySelector(`[data-module-toggle="${moduleId}"]`);
        const toggleIcon = toggle.querySelector('.toggle-icon');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggleIcon.textContent = '▲';
            toggle.classList.add('expanded');
        } else {
            content.style.display = 'none';
            toggleIcon.textContent = '▼';
            toggle.classList.remove('expanded');
        }
    }

    // Quiz rendering helper methods
    renderLessonQuiz(quizQuestions) {
        if (!quizQuestions || quizQuestions.length === 0) return '';
        
        let html = '';
        quizQuestions.forEach((q, qIdx) => {
            html += `
                <div class="quiz-question-card" data-question="${qIdx}">
                    <h4>Câu ${qIdx + 1}: ${q.question}</h4>
                    <div class="quiz-options">
                        ${q.options.map((option, optIdx) => `
                            <div class="quiz-option" data-option="${optIdx}">
                                <input type="radio" name="q${qIdx}" id="q${qIdx}_opt${optIdx}" value="${optIdx}">
                                <label for="q${qIdx}_opt${optIdx}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="quiz-feedback" style="display: none;"></div>
                </div>
            `;
        });
        
        html += `<button class="btn btn--primary quiz-submit-btn">Kiểm tra đáp án</button>`;
        return html;
    }

    attachQuizHandlers(container, quizQuestions) {
        const submitBtn = container.querySelector('.quiz-submit-btn');
        if (!submitBtn) return;
        
        submitBtn.addEventListener('click', () => {
            let correctCount = 0;
            
            quizQuestions.forEach((q, qIdx) => {
                const questionCard = container.querySelector(`[data-question="${qIdx}"]`);
                const selectedOption = questionCard.querySelector('input[type="radio"]:checked');
                const feedback = questionCard.querySelector('.quiz-feedback');
                
                if (selectedOption) {
                    const selectedValue = parseInt(selectedOption.value);
                    const isCorrect = selectedValue === q.correct;
                    
                    if (isCorrect) {
                        correctCount++;
                        feedback.innerHTML = '<span class="correct">✅ Chính xác!</span>';
                        feedback.className = 'quiz-feedback correct';
                    } else {
                        feedback.innerHTML = `<span class="incorrect">❌ Sai. Đáp án đúng là: ${q.options[q.correct]}</span>`;
                        feedback.className = 'quiz-feedback incorrect';
                    }
                    feedback.style.display = 'block';
                }
            });
            
            const score = Math.round((correctCount / quizQuestions.length) * 100);
            this.showNotification(`Điểm của bạn: ${score}% (${correctCount}/${quizQuestions.length} câu đúng)`, score >= 70 ? 'success' : 'error');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đã hoàn thành';
        });
    }

    // ========================================
    // ENHANCED LEARNING FLOW FUNCTIONS
    // ========================================

    renderEnhancedLearningPath() {
        this.initializeEnhancedRoadmap();
        this.renderLessonCardsGrid();
        this.updateEnhancedProgress();
        this.setupEnhancedEventListeners();
        this.loadDiscussionPosts();
        this.loadMiniQuiz();
    }

    initializeEnhancedRoadmap() {
        // Enhanced module data with lesson details
        this.enhancedModules = {
            'reception': {
                id: 'reception',
                title: 'Nghiệp vụ Lễ tân',
                progress: 75,
                totalLessons: 4,
                completedLessons: 3,
                currentLesson: 3,
                lessons: [
                    {
                        id: 'check-in-process',
                        title: 'Quy trình check-in cơ bản',
                        duration: 5,
                        type: 'video',
                        status: 'completed',
                        xp: 10,
                        rating: 4.8
                    },
                    {
                        id: 'reservation-handling',
                        title: 'Xử lý đặt phòng',
                        duration: 2,
                        type: 'interactive',
                        status: 'completed',
                        xp: 10,
                        rating: 4.6
                    },
                    {
                        id: 'guest-communication',
                        title: 'Giao tiếp với khách',
                        duration: 3,
                        type: 'scenario',
                        status: 'current',
                        progress: 60,
                        xp: 10,
                        rating: 0
                    },
                    {
                        id: 'brand-standards',
                        title: 'Tiêu chuẩn thương hiệu',
                        duration: 2,
                        type: 'video',
                        status: 'locked',
                        xp: 10,
                        rating: 0
                    }
                ]
            }
        };
    }

    renderLessonCardsGrid() {
        const gridView = document.getElementById('gridView');
        const timelineView = document.getElementById('timelineView');
        if (!gridView || !timelineView) return;

        const module = this.enhancedModules.reception;
        let gridHtml = '';
        let timelineHtml = '';

        module.lessons.forEach((lesson, index) => {
            const statusClass = lesson.status === 'completed' ? 'completed' : 
                               lesson.status === 'current' ? 'current' : 'locked';
            
            const statusIcon = lesson.status === 'completed' ? 'check-circle' :
                              lesson.status === 'current' ? 'play-circle' : 'lock';
            
            const statusText = lesson.status === 'completed' ? 'Hoàn thành' :
                              lesson.status === 'current' ? 'Đang học' : 'Chưa mở khóa';
            
            // Grid Card HTML
            gridHtml += `
                <div class="lesson-card ${statusClass} animate-slide-up" style="animation-delay: ${index * 0.1}s">
                    <div class="lesson-card-header">
                        <div class="lesson-icon ${statusClass}">
                            <i data-lucide="${this.getLessonIcon(lesson.type)}" class="w-6 h-6"></i>
                        </div>
                        <div class="lesson-status ${statusClass}">
                            <i data-lucide="${statusIcon}" class="w-4 h-4"></i>
                            <span>${statusText}</span>
                        </div>
                    </div>
                    
                    <h3 class="lesson-title">${lesson.title}</h3>
                    <p class="lesson-description">${lesson.description}</p>
                    
                    <div class="lesson-meta">
                        <div class="lesson-duration">
                            <i data-lucide="clock" class="w-4 h-4"></i>
                            <span>${lesson.duration} phút</span>
                        </div>
                        <div class="lesson-level">
                            <span class="level-badge ${lesson.level}">${lesson.level}</span>
                        </div>
                    </div>
                    
                    ${lesson.status === 'completed' ? `
                        <div class="lesson-progress">
                            <div class="progress-label">
                                <span>Tiến độ</span>
                                <span>100%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill completed" style="width: 100%"></div>
                            </div>
                        </div>
                        <div class="lesson-actions">
                            <button class="lesson-btn secondary" onclick="app.reviewLesson('${lesson.id}')">
                                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                                Ôn tập
                            </button>
                            <button class="lesson-btn secondary" onclick="app.markLesson('${lesson.id}')">
                                <i data-lucide="bookmark" class="w-4 h-4"></i>
                                Đánh dấu
                            </button>
                        </div>
                    ` : lesson.status === 'current' ? `
                        <div class="lesson-progress">
                            <div class="progress-label">
                                <span>Tiến độ</span>
                                <span>${lesson.progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill current" style="width: ${lesson.progress}%"></div>
                            </div>
                        </div>
                        <div class="lesson-actions">
                            <button class="lesson-btn primary" onclick="app.startLesson('${lesson.id}')">
                                <i data-lucide="play" class="w-4 h-4"></i>
                                Tiếp tục
                            </button>
                            <button class="lesson-btn secondary" onclick="app.previewLesson('${lesson.id}')">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                                Xem trước
                            </button>
                        </div>
                    ` : `
                        <div class="lesson-progress">
                            <div class="progress-label">
                                <span>Yêu cầu</span>
                                <span>Hoàn thành bài trước</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill locked" style="width: 0%"></div>
                            </div>
                        </div>
                        <div class="lesson-actions">
                            <button class="lesson-btn secondary" disabled>
                                <i data-lucide="eye" class="w-4 h-4"></i>
                                Xem trước
                            </button>
                            <button class="lesson-btn secondary" disabled>
                                <i data-lucide="lock" class="w-4 h-4"></i>
                                Khóa
                            </button>
                        </div>
                    `}
                </div>
            `;

            // Timeline HTML (simplified for now)
            timelineHtml += `
                <div class="timeline-item ${statusClass}">
                    <div class="timeline-marker">
                        <i data-lucide="${statusIcon}" class="w-5 h-5"></i>
                    </div>
                    <div class="timeline-content">
                        <h4>${lesson.title}</h4>
                        <p>${lesson.description}</p>
                        <div class="timeline-meta">
                            <span>${lesson.duration} phút</span>
                            <span class="level-badge ${lesson.level}">${lesson.level}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        gridView.innerHTML = gridHtml;
        timelineView.innerHTML = timelineHtml;
        
        this.initializeLucideIcons();
        this.setupViewToggle();
    }

    getLessonIcon(type) {
        const iconMap = {
            'video': 'play',
            'interactive': 'mouse-pointer',
            'scenario': 'message-circle',
            'simulation': 'gamepad-2',
            'quiz': 'help-circle'
        };
        return iconMap[type] || 'book';
    }

    setupViewToggle() {
        const toggleBtns = document.querySelectorAll('.view-toggle-btn');
        const gridView = document.getElementById('gridView');
        const timelineView = document.getElementById('timelineView');

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Toggle views
                const view = btn.dataset.view;
                if (view === 'grid') {
                    gridView.classList.remove('hidden');
                    timelineView.classList.add('hidden');
                } else {
                    gridView.classList.add('hidden');
                    timelineView.classList.remove('hidden');
                }
            });
        });
    }

    startLesson(lessonId) {
        // Add gamification: Award XP for starting lesson
        this.awardXP(25, 'Started lesson');
        console.log(`Starting lesson: ${lessonId}`);
        // Implementation would navigate to lesson content
    }

    reviewLesson(lessonId) {
        // Add gamification: Award XP for reviewing
        this.awardXP(15, 'Reviewed lesson');
        console.log(`Reviewing lesson: ${lessonId}`);
        // Implementation would show lesson review
    }

    previewLesson(lessonId) {
        console.log(`Previewing lesson: ${lessonId}`);
        // Show lesson preview modal
        this.showLessonPreview(lessonId);
    }

    markLesson(lessonId) {
        // Add gamification: Award XP for bookmarking
        this.awardXP(5, 'Bookmarked lesson');
        console.log(`Marking lesson: ${lessonId}`);
        // Implementation would bookmark lesson
    }

    showLessonPreview(lessonId) {
        const modal = document.getElementById('lessonPreviewModal');
        if (modal) {
            modal.style.display = 'block';
            // Populate modal with lesson data
        }
    }

    updateEnhancedProgress() {
        // Update module progress
        const module = this.enhancedModules.reception;
        const progressPercent = Math.round((module.completedLessons / module.totalLessons) * 100);
        
        document.getElementById('moduleProgressPercent').textContent = progressPercent + '%';
        document.getElementById('moduleProgressBar').style.width = progressPercent + '%';
        document.getElementById('moduleProgressBar').style.setProperty('--progress-width', progressPercent + '%');
        
        // Update lesson counts
        document.getElementById('totalLessons').textContent = module.totalLessons;
        document.getElementById('completedLessons').textContent = module.completedLessons;
        document.getElementById('currentLessons').textContent = module.lessons.filter(l => l.status === 'current').length;
        
        // Update current lesson progress
        const currentLesson = module.lessons.find(l => l.status === 'current');
        if (currentLesson) {
            document.getElementById('currentLessonProgress').textContent = 
                `Bài ${module.currentLesson}/${module.totalLessons} - ${currentLesson.title}`;
        }
    }

    setupEnhancedEventListeners() {
        // Mini Quiz event listeners
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                // Remove previous selections
                quizOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selection to clicked option
                e.target.classList.add('selected');
            });
        });

        // Submit Quiz button
        const submitQuizBtn = document.getElementById('submitQuizBtn');
        if (submitQuizBtn) {
            submitQuizBtn.addEventListener('click', () => {
                this.handleQuizSubmission();
            });
        }

        // Discussion input
        const discussionInput = document.getElementById('discussionInput');
        const sendDiscussionBtn = document.getElementById('sendDiscussionBtn');
        
        if (sendDiscussionBtn) {
            sendDiscussionBtn.addEventListener('click', () => {
                this.sendDiscussionPost();
            });
        }
        
        if (discussionInput) {
            discussionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendDiscussionPost();
                }
            });
        }
    }

    loadDiscussionPosts() {
        const discussionPosts = document.getElementById('discussionPosts');
        if (!discussionPosts) return;

        // Sample discussion posts
        const posts = [
            {
                id: 1,
                author: 'Anh Minh',
                avatar: 'A',
                content: '"Cách xử lý khách VIP khác gì so với khách thường?"',
                time: '2 phút trước',
                likes: 3,
                replies: 0,
                color: 'green'
            },
            {
                id: 2,
                author: 'Cô Lan',
                avatar: 'C',
                content: '"Tôi đã hoàn thành module này, rất hữu ích! 👍"',
                time: '5 phút trước',
                likes: 7,
                replies: 0,
                color: 'blue'
            }
        ];

        discussionPosts.innerHTML = posts.map(post => `
            <div class="bg-${post.color}-50 p-3 rounded-lg discussion-post">
                <div class="flex items-center space-x-2 mb-2">
                    <div class="w-6 h-6 bg-${post.color}-500 rounded-full flex items-center justify-center text-white text-xs font-bold">${post.avatar}</div>
                    <span class="text-sm font-medium text-${post.color}-800">${post.author}</span>
                    <span class="text-xs text-${post.color}-600">${post.time}</span>
                </div>
                <p class="text-sm text-${post.color}-700">${post.content}</p>
                <div class="flex items-center space-x-4 mt-2 text-xs text-${post.color}-600">
                    <button class="flex items-center space-x-1 hover:text-${post.color}-800">
                        <i data-lucide="thumbs-up" class="w-3 h-3"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button class="flex items-center space-x-1 hover:text-${post.color}-800">
                        <i data-lucide="message-circle" class="w-3 h-3"></i>
                        <span>Trả lời</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    loadMiniQuiz() {
        // Sample quiz data - in real app, this would come from server
        const quizData = {
            question: '"Check-in" trong tiếng Việt có nghĩa là gì?',
            options: [
                'A. Đăng ký nhận phòng',
                'B. Thanh toán hóa đơn', 
                'C. Đặt bàn ăn',
                'D. Gọi điện thoại'
            ],
            correct: 0
        };

        // Update quiz content
        document.getElementById('quizQuestion').textContent = quizData.question;
        const quizOptions = document.getElementById('quizOptions');
        quizOptions.innerHTML = quizData.options.map(option => `
            <button class="w-full text-left p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors quiz-option">
                ${option}
            </button>
        `).join('');

        // Re-attach event listeners
        const options = quizOptions.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.addEventListener('click', (e) => {
                // Remove previous selections
                options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
                // Add selection to clicked option
                e.target.classList.add('selected');
            });
        });
    }

    handleQuizSubmission() {
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (!selectedOption) {
            this.showNotification('Vui lòng chọn một đáp án!', 'warning');
            return;
        }

        const selectedIndex = Array.from(selectedOption.parentNode.children).indexOf(selectedOption);
        const isCorrect = selectedIndex === 0; // Correct answer is A

        // Update UI
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            if (index === 0) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected')) {
                option.classList.add('incorrect');
            }
        });

        // Award XP
        const xp = isCorrect ? 5 : 0;
        this.awardXP(xp);
        
        // Show result
        const message = isCorrect ? 
            `Chính xác! +${xp} XP` : 
            'Sai rồi! Đáp án đúng là A. Đăng ký nhận phòng';
        
        this.showNotification(message, isCorrect ? 'success' : 'error');

        // Disable submit button
        document.getElementById('submitQuizBtn').disabled = true;
        document.getElementById('submitQuizBtn').textContent = isCorrect ? 'Đã nhận +5 XP' : 'Đã hoàn thành';

        // Show achievement if this is first quiz
        if (isCorrect && !this.userProfile.badges.includes('quiz-master')) {
            setTimeout(() => {
                this.showAchievement('quiz-master', 'Bậc thầy quiz', 'Đạt 100% điểm quiz', 25);
            }, 1000);
        }
    }

    sendDiscussionPost() {
        const input = document.getElementById('discussionInput');
        const content = input.value.trim();
        
        if (!content) return;

        // Add new post to discussion
        const discussionPosts = document.getElementById('discussionPosts');
        const newPost = document.createElement('div');
        newPost.className = 'bg-purple-50 p-3 rounded-lg discussion-post';
        newPost.innerHTML = `
            <div class="flex items-center space-x-2 mb-2">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">B</div>
                <span class="text-sm font-medium text-purple-800">Bạn</span>
                <span class="text-xs text-purple-600">Vừa xong</span>
            </div>
            <p class="text-sm text-purple-700">${content}</p>
            <div class="flex items-center space-x-4 mt-2 text-xs text-purple-600">
                <button class="flex items-center space-x-1 hover:text-purple-800">
                    <i data-lucide="thumbs-up" class="w-3 h-3"></i>
                    <span>0</span>
                </button>
                <button class="flex items-center space-x-1 hover:text-purple-800">
                    <i data-lucide="message-circle" class="w-3 h-3"></i>
                    <span>Trả lời</span>
                </button>
            </div>
        `;

        discussionPosts.insertBefore(newPost, discussionPosts.firstChild);
        input.value = '';

        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Award XP for participation
        this.awardXP(2);
        this.showNotification('Cảm ơn bạn đã tham gia thảo luận! +2 XP', 'success');
    }

    awardXP(amount) {
        this.userProfile.totalPoints += amount;
        this.userProfile.experience += amount;
        
        // Update XP display
        const xpProgress = document.getElementById('xpProgress');
        const xpBar = document.getElementById('xpBar');
        
        if (xpProgress && xpBar) {
            const currentXP = this.userProfile.totalPoints;
            const nextLevelXP = this.getNextLevelXP();
            const progress = Math.min((currentXP / nextLevelXP) * 100, 100);
            
            xpProgress.textContent = `${currentXP}/${nextLevelXP}`;
            xpBar.style.width = progress + '%';
        }

        // Check for level up
        this.checkLevelUp();
    }

    getNextLevelXP() {
        const level = this.getUserLevel();
        return level * 500; // Each level requires 500 more XP
    }

    getUserLevel() {
        return Math.floor(this.userProfile.totalPoints / 500) + 1;
    }

    checkLevelUp() {
        const newLevel = this.getUserLevel();
        const currentLevel = parseInt(document.getElementById('userLevel').textContent.replace('Lv.', ''));
        
        if (newLevel > currentLevel) {
            document.getElementById('userLevel').textContent = `Lv.${newLevel}`;
            this.showAchievement('level-up', 'Lên cấp!', `Chúc mừng! Bạn đã lên cấp ${newLevel}`, 50);
        }
    }

    showAchievement(badgeId, title, description, xp) {
        const notification = document.getElementById('achievementNotification');
        const titleEl = document.getElementById('achievementTitle');
        const descEl = document.getElementById('achievementDesc');
        const xpEl = document.getElementById('achievementXp');

        if (notification && titleEl && descEl && xpEl) {
            titleEl.textContent = title;
            descEl.textContent = description;
            xpEl.textContent = `+${xp} XP`;
            
            notification.style.display = 'block';
            
            // Award XP
            this.awardXP(xp);
            
            // Add badge if not already earned
            if (!this.userProfile.badges.includes(badgeId)) {
                this.userProfile.badges.push(badgeId);
                this.updateBadgesDisplay();
            }

            // Auto hide after 5 seconds
            setTimeout(() => {
                hideAchievement();
            }, 5000);
        }
    }

    updateBadgesDisplay() {
        const badgesContainer = document.getElementById('badgesContainer');
        const badgeCount = document.getElementById('badgeCount');
        
        if (badgesContainer && badgeCount) {
            badgeCount.textContent = `+${this.userProfile.badges.length} badges`;
        }
    }

    // Lesson interaction methods
    continueLesson(lessonId) {
        this.showNotification('Bắt đầu bài học...', 'info');
        // In real app, this would navigate to lesson content
        setTimeout(() => {
            this.showNotification('Bài học đã hoàn thành! +10 XP', 'success');
            this.awardXP(10);
            this.createConfetti();
        }, 2000);
    }

    reviewLesson(lessonId) {
        this.showNotification('Mở bài ôn tập...', 'info');
        // In real app, this would open review mode
    }

    bookmarkLesson(lessonId) {
        this.showNotification('Đã thêm vào danh sách yêu thích!', 'success');
        // In real app, this would save bookmark
    }

    createConfetti() {
        const colors = ['#fbbf24', '#f59e0b', '#d97706', '#3b82f6', '#1d4ed8'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    // 🎭 Lesson Preview Modal Methods
    initLessonPreviewModal() {
        const modal = document.getElementById('lessonPreviewModal');
        const closeBtn = document.getElementById('lessonPreviewClose');
        const cancelBtn = document.getElementById('lessonPreviewCancel');
        const startBtn = document.getElementById('lessonPreviewStart');

        // Close modal handlers
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLessonPreview());
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeLessonPreview());
        }
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startLessonFromPreview());
        }

        // Close on backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeLessonPreview();
                }
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                this.closeLessonPreview();
            }
        });
    }

    showLessonPreview(lesson) {
        const modal = document.getElementById('lessonPreviewModal');
        if (!modal) return;

        // Update modal content
        document.getElementById('lessonPreviewThumbnail').textContent = this.getLessonIcon(lesson.type);
        document.getElementById('lessonPreviewTitle').textContent = lesson.title;
        document.getElementById('lessonPreviewDuration').textContent = `${lesson.duration || 5} phút`;
        document.getElementById('lessonPreviewLevel').textContent = this.getLevelLabel(lesson.level);
        document.getElementById('lessonPreviewType').textContent = this.getLessonTypeLabel(lesson.type);
        document.getElementById('lessonPreviewDescription').textContent = lesson.description || 'Mô tả bài học sẽ hiển thị ở đây...';

        // Update objectives
        const objectivesList = document.getElementById('lessonPreviewObjectives');
        if (objectivesList && lesson.objectives) {
            objectivesList.innerHTML = lesson.objectives.map(obj => `<li>${obj}</li>`).join('');
        }

        // Store current lesson for start action
        this.previewLesson = lesson;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLessonPreview() {
        const modal = document.getElementById('lessonPreviewModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.previewLesson = null;
        }
    }

    startLessonFromPreview() {
        if (this.previewLesson) {
            this.closeLessonPreview();
            // Navigate to lesson viewer with the previewed lesson
            this.showSection('lesson-viewer');
            this.loadLesson(this.previewLesson);
        }
    }

    getLessonIcon(type) {
        const icons = {
            'video': '📹',
            'interactive': '🎮',
            'reading': '📖',
            'quiz': '📝',
            'scenario': '🎭',
            'simulation': '🎯',
            'vr-simulation': '🥽'
        };
        return icons[type] || '📚';
    }

    getLessonTypeLabel(type) {
        const labels = {
            'video': 'Video',
            'interactive': 'Tương tác',
            'reading': 'Đọc hiểu',
            'quiz': 'Kiểm tra',
            'scenario': 'Tình huống',
            'simulation': 'Mô phỏng',
            'vr-simulation': 'VR Mô phỏng'
        };
        return labels[type] || 'Bài học';
    }

    getVietnameseTranslation(englishTerm) {
        const translations = {
            'wine pairing': 'kết hợp rượu vang',
            'special occasion': 'dịp đặc biệt',
            'budget-friendly': 'thân thiện ngân sách',
            'complementary flavors': 'hương vị bổ sung',
            'signature cocktail': 'cocktail đặc trưng',
            'mixology': 'nghệ thuật pha chế',
            'premium ingredients': 'nguyên liệu cao cấp',
            'craft technique': 'kỹ thuật thủ công',
            'sincere apology': 'lời xin lỗi chân thành',
            'service recovery': 'khôi phục dịch vụ',
            'compensation': 'bồi thường',
            'customer satisfaction': 'hài lòng khách hàng',
            'order modification': 'thay đổi đơn hàng',
            'kitchen coordination': 'phối hợp bếp',
            'guest preference': 'sở thích khách',
            'flexibility': 'linh hoạt',
            'cooking technique': 'kỹ thuật nấu ăn',
            'preparation method': 'phương pháp chuẩn bị',
            'culinary expertise': 'chuyên môn ẩm thực',
            'food knowledge': 'kiến thức ẩm thực',
            'meat doneness': 'độ chín thịt',
            'cooking temperature': 'nhiệt độ nấu',
            'personal preference': 'sở thích cá nhân',
            'culinary advice': 'tư vấn ẩm thực',
            'upselling': 'bán thêm',
            'dessert recommendation': 'gợi ý tráng miệng',
            'cross-selling': 'bán chéo',
            'spa service': 'dịch vụ spa',
            'wellness package': 'gói chăm sóc sức khỏe',
            'relaxation therapy': 'liệu pháp thư giãn',
            'couple retreat': 'nghỉ dưỡng cặp đôi'
        };
        return translations[englishTerm.toLowerCase()] || englishTerm;
    }
}

// Global function for hiding achievement notification
function hideAchievement() {
    const notification = document.getElementById('achievementNotification');
    if (notification) {
        notification.style.display = 'none';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new HospitalityApp();
});