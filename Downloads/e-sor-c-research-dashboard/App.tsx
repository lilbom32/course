import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { calculateSimulation, SCENARIOS, SimState } from './lib/simulation';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import {
  Activity, BrainCircuit, ShoppingCart, Search,
  AlertTriangle, CheckCircle2, Minus,
  Zap, ArrowRight, Sun, Moon, Globe,
  Download, Printer,
  Users, MessageCircle, Package, MapPin, ShieldAlert, Ban, Info, LayoutTemplate,
  Calculator, Share2, Footprints, Lightbulb
} from 'lucide-react';

// --- I18N DICTIONARY ---
const TRANSLATIONS = {
  vi: {
    title: "E-SOR-C Research Dashboard",
    subtitle: "Hành vi mua quà lưu niệm tại ĐBSCL — Phan Thị Thúy Phượng",
    tabDashboard: "DASHBOARD",
    tabSimulator: "MÔ PHỎNG",
    tabInfographic: "INFOGRAPHIC",
    tabFormulas: "CÔNG THỨC",
    exportPNG: "Xuất ảnh",
    exportPrint: "In báo cáo",

    // Infographic
    igTitle: "Tóm Tắt Trực Quan Mô Hình E-SOR-C",
    igSub: "Bản đồ hành trình tâm lý khách hàng tại ĐBSCL",
    igDrivers: "5 Động lực Kích thích (Drivers)",
    igBarriers: "3 Rào cản Mua hàng (Barriers)",
    igMechanism: "Cơ chế Tâm lý (Mechanism)",
    igContext: "Bối cảnh quyết định (Context)",
    igJourneyTitle: "Hành trình Khách hàng Thực tế",
    igJ1: "Tiếp cận",
    igJ1Sub: "Bước vào không gian trưng bày đậm chất địa phương",
    igJ2: "Kích thích (S)",
    igJ2Sub: "Bắt gặp câu chuyện văn hóa & sự độc đáo",
    igJ3: "Cảm xúc (O)",
    igJ3Sub: "Hứng thú + Niềm vui dâng trào",
    igJ4: "Bối cảnh (C)",
    igJ4Sub: "HDV khuyến khích + Hiệu ứng đám đông",
    igJ5: "Hành động (R)",
    igJ5Sub: "Mua xung động & Lan tỏa (Feedback Loop)",
    igKeyTitle: "Dữ liệu Nghiên cứu",
    igKey1: "12 Phỏng vấn sâu",
    igKey2: "80 Mã hóa mở",
    igKey3: "10 Giả thuyết",
    igKey4: "3 Nhóm đối tượng",
    igKey5: "6 Tỉnh ĐBSCL",

    igD1: "Storytelling",
    igD1Sub: "Câu chuyện văn hóa là linh hồn. Không có câu chuyện = Không có giá trị.",
    igD2: "Người dẫn dắt",
    igD2Sub: "HDV là chìa khóa mở lòng tin và kích hoạt hành vi.",
    igD3: "Đặc trưng",
    igD3Sub: "Sản phẩm phải 'gào thét' lên được bản sắc địa phương.",
    igD4: "Hiệu ứng đám đông",
    igD4Sub: "Thấy người khác mua -> Sợ bỏ lỡ (FOMO) -> Mua theo.",
    igD5: "Không gian",
    igD5Sub: "Trưng bày phải đập vào mắt ngay lập tức.",

    igB1: "Niềm tin (Trust)",
    igB1Sub: "Made in China, Giá loạn = CHẶN ĐỨNG mọi giao dịch.",
    igB2: "Thực tiễn (Logistics)",
    igB2Sub: "Sợ hải quan, sợ hư hỏng, sợ cồng kềnh.",
    igB3: "Thông tin (Info Gap)",
    igB3Sub: "Không hiểu món này là gì thì sao dám mua?",

    igM1: "Hứng thú (Arousal)",
    igM1Sub: "Tò mò, Phấn khích -> Mua NGAY",
    igM2: "Niềm vui (Pleasure)",
    igM2Sub: "Ký ức, Tặng quà -> Mua NHIỀU",
    igM3: "Thái độ (Attitude)",
    igM3Sub: "Bộ lọc Niềm tin -> QUYẾT ĐỊNH",

    // Formulas
    fmTitle: "Hệ Thống Công Thức Mô Phỏng E-SOR-C",
    fmSub: "Cơ sở toán học cho mô hình dự báo hành vi mua quà lưu niệm",
    fmOverview: "Tổng quan mô hình",
    fmOverviewDesc: "Mô hình E-SOR-C mở rộng khung lý thuyết S-O-R (Mehrabian & Russell, 1974) bằng cách bổ sung biến Context [C] — loại hình du lịch, thời gian tiếp xúc — tạo thành chuỗi: Stimulus → Organism → Response, được điều tiết bởi Context.",
    fmOrganism: "Tầng Organism [O] — 3 công thức cốt lõi",
    fmAttTitle: "Attitude — Bộ lọc niềm tin (H5 Moderator)",
    fmAttDesc: "Thái độ đóng vai trò BỘ LỌC: khi Attitude < 40, mọi tín hiệu Stimulus bị chặn, khách từ chối mua bất kể sản phẩm hấp dẫn đến đâu.",
    fmAttGate: "Nếu Attitude < 40 → CHẶN (gate ≈ 0) · Nếu ≥ 70 → MỞ hoàn toàn",
    fmArousalTitle: "Arousal — Hứng thú tức thì (O_Arousal)",
    fmArousalDesc: "Phản ứng cảm xúc tức thì, thúc đẩy mua sắm ngẫu hứng. S_Social được khuếch đại gấp 2.25× trong bối cảnh tour đoàn (0.45 vs 0.20).",
    fmPleasureTitle: "Pleasure — Cảm xúc lâu dài (O_Pleasure)",
    fmPleasureDesc: "Tạo \"giá trị ký ức\" — cảm xúc bền vững hơn Arousal, thúc đẩy mua số lượng lớn và quà tặng.",
    fmResponse: "Tầng Response [R] — Xác suất 3 chiều",
    fmRespDesc: "Ba xác suất Buy / NoBuy / Undecided luôn chuẩn hóa tổng = 100%. Undecided được mô hình hóa dựa trên mức thông tin, thời gian, và thiếu hụt áp lực xã hội.",
    fmBuyTitle: "rawBuy — Xác suất mua thô",
    fmNoBuyTitle: "rawNoBuy — Phạt từ chối",
    fmUndecidedTitle: "rawUndecided — Chưa quyết định",
    fmNormTitle: "Chuẩn hóa 3 chiều",
    fmNormDesc: "Tất cả raw scores được chia cho tổng → luôn = 100%. Tránh tình trạng Buy + NoBuy < 100% với phần dư không giải thích.",
    fmHypotheses: "10 Giả thuyết nghiên cứu",
    fmScenarios: "Bảng tổng hợp kịch bản",
    fmScDesc: "Kết quả dự báo từ 6 kịch bản đặc trưng (giá trị được tính từ công thức ở trên)",
    fmVar: "Biến",
    fmWeight: "Trọng số",
    fmMeaning: "Ý nghĩa",
    fmThreshold: "Ngưỡng",
    fmPenalty: "Phạt",
    fmCondition: "Điều kiện",
    fmScenario: "Kịch bản",

    // Stats
    stTotal: "Tổng mã hóa",
    stTotalSub: "Từ 12 cuộc phỏng vấn sâu",
    stStim: "Biến Stimulus [S]",
    stStimSub: "55% tổng mã · 6 nhóm biến",
    stOrg: "Biến Organism [O]",
    stOrgSub: "23% tổng mã · 3 lớp chức năng",
    stResp: "Biến Response [R]",
    stRespSub: "23% tổng mã · Buy = NoBuy",

    // Model Explainer
    exTitle: "Đọc mô hình trong 60 giây",
    exSub: "4 cơ chế · 2 kịch bản thực tế · Trích dẫn từ phỏng vấn sâu ĐBSCL",
    exMechTitle: "4 Cơ chế cốt lõi",
    exScenTitle: "2 Kịch bản thực chiến",
    exInsightTitle: "Nghịch lý ĐBSCL",

    // Charts & Matrix
    chDistrib: "Phân bổ mã hóa",
    mxTitle: "Ma trận đồng thuận",
    mxFilterAll: "Tất cả",
    mxFilterHigh: "Đồng thuận cao",
    mxFilterConflict: "Mâu thuẫn",
    mxTopic: "Chủ đề",
    mxHDV: "HDV",
    mxCG: "CG",
    mxHKD: "HKD",
    mxLevel: "Mức độ",

    // NoBuy
    nbTitle: "Phân tích rào cản không mua",
    nbTrust: "Mất niềm tin",
    nbPractical: "Rào cản thực tiễn",
    nbGap: "Khoảng trống TT",
    nbStruct: "Rào cản cấu trúc",
    nbTrustDesc: "\"Made in China\" · Không chứng minh được xuất xứ · Giá không đồng nhất giữa các điểm bán",
    nbPracticalDesc: "Vận chuyển khó (tranh gạo dễ vỡ) · Lo ngại hải quan · Kích thước/trọng lượng không phù hợp",
    nbGapDesc: "Không có storytelling · Khách không hiểu giá trị sản phẩm · Thiếu thông tin nguồn gốc",
    nbStructDesc: "Chỉ bán sỉ, không bán lẻ · Kênh phân phối hạn chế · Không tiếp cận được khách du lịch",
    nbNote: "\"Made in China\" · Giá không đồng nhất",

    // Simulator
    simQuick: "⚡ Kịch bản nhanh",
    simAdjust: "🎛️ Điều chỉnh biến số",
    simFlow: "🔄 Luồng kích hoạt S → O → R (thời gian thực)",
    simForecast: "📊 Kết quả dự báo",
    simHyp: "🔬 Trạng thái 10 Giả thuyết",
    simNar: "📝 Diễn giải kịch bản",

    // Scenarios
    scIdeal: "🌟 Lý tưởng",
    scNoStory: "📭 Thiếu Story",
    scChina: "🚫 Made in China",
    scTour: "🚌 Tour đoàn",
    scSolo: "🎒 Khách lẻ",
    scB2B: "🏢 Chỉ bán sỉ",

    // Sliders
    slStory: "S_Cultural (Story)",
    slSocial: "S_Social (HDV)",
    slProduct: "S_Product (Đặc tính)",
    slPlace: "S_Place (Không gian)",
    slPrice: "S_Price (Minh bạch)",
    slPromo: "S_Promotion (Storytelling)",
    slAtt: "O_Attitude (Niềm tin)",
    slCtx: "Context (0=Lẻ, 100=Đoàn)",
    slTime: "Thời gian (phút)",

    // Diagram / Flow
    dgStim: "Stimulus",
    dgStimSub: "avg S score",
    dgArousal: "Arousal",
    dgArousalSub: "O_Arousal",
    dgGate: "H5 gate",
    dgGateBlocked: "BLOCKED",
    dgGateOpen: "OPEN",
    dgGatePartial: "PARTIAL",
    dgBuy: "R_Buy",
    dgNoBuy: "R_NoBuy",
    dgProbBuy: "Xác suất mua",
    dgProbNoBuy: "Xác suất không mua",
    dgCult: "Cultural",
    dgCultSub: "S_Cultural",
    dgPleasure: "Pleasure",
    dgPleasureSub: "O_Pleasure",
    dgAttGate: "Attitude Gate",
    dgBlocked: "🔴 Chặn",
    dgOpen: "🟢 Mở",
    dgPartial: "🟡 Một phần",

    // Outcomes
    ocBuy: "Xác suất Mua",
    ocNoBuy: "Xác suất Không mua",
    ocArousal: "Mức độ Hứng thú",
    ocAttitude: "Mức độ Niềm tin",

    // Narrative
    narTrust: "Niềm tin bị phá vỡ.",
    narTrustDesc: "Bộ lọc Attitude đang chặn mọi nỗ lực Stimulus. Cần minh bạch giá và chứng minh xuất xứ.",
    narGap: "Khoảng trống Storytelling.",
    narGapDesc: "Khách không hiểu giá trị sản phẩm nên Arousal thấp. Cần kể chuyện văn hóa.",
    narTour: "Hiệu ứng đoàn Tour.",
    narTourDesc: "HDV kích hoạt FOMO mạnh mẽ. Feedback Loop hoạt động tốt.",
    narSolo: "Khách lẻ tự túc.",
    narSoloDesc: "Không có HDV → S_Social yếu. Quyết định phụ thuộc vào S_Cultural và S_Product.",
    narBal: "Kịch bản cân bằng.",
    narBalDesc: "Kết quả phụ thuộc vào sự điều chỉnh tinh tế của từng biến số.",



    // Intro tab
    tabIntro: "GIỚI THIỆU",
    inHero: "Tại sao có người mua, có người không?",
    inHeroSub: "Nghiên cứu 12 phỏng vấn sâu tại 6 tỉnh ĐBSCL tìm ra câu trả lời.",
    inHeroDesc: "Hai du khách cùng đứng trước một sản phẩm — một người móc ví ngay, người kia lắc đầu bỏ đi. Điều gì tạo ra sự khác biệt đó? Mô hình E-SOR-C giải thích cơ chế tâm lý đằng sau quyết định mua quà lưu niệm.",
    inModelTitle: "Mô hình hoạt động như thế nào?",
    inS: "Kích thích (S)",
    inSDesc: "Những gì khách nhìn thấy và nghe thấy: câu chuyện HDV kể, sản phẩm trưng bày, không gian cửa hàng, giá niêm yết.",
    inO: "Cảm xúc bên trong (O)",
    inODesc: "Phản ứng tâm lý: cảm thấy hứng thú, vui vẻ, và quan trọng nhất — tin tưởng hay không tin tưởng.",
    inR: "Hành động (R)",
    inRDesc: "Kết quả cuối cùng: mua, không mua, hoặc chia sẻ với bạn bè.",
    inC: "Bối cảnh (C)",
    inCDesc: "Đi tour đoàn hay đi lẻ? Có bao nhiêu thời gian? Những yếu tố này khuếch đại hoặc làm yếu phản ứng cảm xúc.",
    inFindTitle: "3 Phát hiện quan trọng nhất",
    inF1Title: "Câu chuyện quan trọng hơn giá tiền",
    inF1Desc: "Khách quốc tế sẵn sàng chi tiền — nhưng họ không mua vì không ai giải thích sản phẩm là gì.",
    inF1Quote: "Không phải người ta không có tiền mua đâu. Người ta không mua vì người ta không biết cái đó là cái gì.",
    inF2Title: "Niềm tin là cánh cửa duy nhất",
    inF2Desc: "Khi thấy 'Made in China', khách đặt xuống ngay và không quay lại — dù sản phẩm đẹp đến đâu.",
    inF2Quote: "Nhìn thấy made in China là tôi dứt khoát không mua, dù nó đẹp cỡ nào.",
    inF3Title: "Tour đoàn khuếch đại hiệu ứng ×2.25",
    inF3Desc: "Khi 5 người dừng lại xem, cả đoàn xúm vào. Áp lực xã hội tích cực thúc đẩy quyết định mua nhanh hơn.",
    inF3Quote: "Một đoàn xe 10 khách... chỉ cần 5–7 khách đứng lại mua thôi là đã khác rồi.",
    inCTA: "Khám phá Dashboard",

    // Footer
    footer: "E-SOR-C Dashboard · Nghiên cứu sinh Phan Thị Thúy Phượng · ĐH Nguyễn Tất Thành · 2026"
  },
  en: {
    title: "E-SOR-C Research Dashboard",
    subtitle: "Souvenir purchasing behavior in Mekong Delta — Phan Thi Thuy Phuong",
    tabDashboard: "DASHBOARD",
    tabSimulator: "SIMULATOR",
    tabInfographic: "INFOGRAPHIC",
    tabFormulas: "FORMULAS",
    exportPNG: "Export Image",
    exportPrint: "Print Report",

    igTitle: "E-SOR-C Visual Snapshot",
    igSub: "Visualizing the Customer Psychology Journey",
    igDrivers: "Top 5 Stimulus Drivers",
    igBarriers: "Top 3 Buying Barriers",
    igMechanism: "Psychological Mechanism",
    igContext: "Critical Context",
    igJourneyTitle: "Real-world Customer Journey",
    igJ1: "Approach",
    igJ1Sub: "Enter local-themed display space",
    igJ2: "Stimulus (S)",
    igJ2Sub: "Encounter cultural stories & uniqueness",
    igJ3: "Organism (O)",
    igJ3Sub: "Arousal + Pleasure spikes",
    igJ4: "Context (C)",
    igJ4Sub: "Guide endorsement + Crowd effect",
    igJ5: "Response (R)",
    igJ5Sub: "Impulse Buy & Social Sharing",
    igKeyTitle: "Research Data",
    igKey1: "12 In-depth Interviews",
    igKey2: "80 Open Codes",
    igKey3: "10 Hypotheses",
    igKey4: "3 Subject Groups",
    igKey5: "6 Provinces",

    igD1: "Storytelling",
    igD1Sub: "Cultural stories are the soul. No story = No value.",
    igD2: "The Guide",
    igD2Sub: "Guides are the key to unlocking trust and action.",
    igD3: "Local Identity",
    igD3Sub: "Products must scream local identity/uniqueness.",
    igD4: "Crowd Effect",
    igD4Sub: "Seeing others buy -> FOMO -> Buy together.",
    igD5: "Display",
    igD5Sub: "Visual impact must be immediate.",

    igB1: "Trust Barrier",
    igB1Sub: "Made in China, Price Chaos = COMPLETE BLOCK.",
    igB2: "Practical Barrier",
    igB2Sub: "Customs fears, verify fragility, bulky size.",
    igB3: "Info Barrier",
    igB3Sub: "Don't understand the item? Won't buy it.",

    igM1: "Arousal",
    igM1Sub: "Curiosity, Excitement -> Buy NOW",
    igM2: "Pleasure",
    igM2Sub: "Memory, Gifting -> Buy MORE",
    igM3: "Attitude",
    igM3Sub: "Trust Filter -> DECISION GATE",

    // Formulas
    fmTitle: "E-SOR-C Simulation Formula System",
    fmSub: "Mathematical foundations for the souvenir purchasing behavior prediction model",
    fmOverview: "Model Overview",
    fmOverviewDesc: "The E-SOR-C model extends the S-O-R framework (Mehrabian & Russell, 1974) by adding a Context [C] variable — trip type, interaction time — forming the chain: Stimulus → Organism → Response, moderated by Context.",
    fmOrganism: "Organism Layer [O] — 3 Core Formulas",
    fmAttTitle: "Attitude — Trust Filter (H5 Moderator)",
    fmAttDesc: "Attitude acts as a GATE: when Attitude < 40, all Stimulus signals are blocked — the customer refuses to buy regardless of product appeal.",
    fmAttGate: "If Attitude < 40 → BLOCKED (gate ≈ 0) · If ≥ 70 → FULLY OPEN",
    fmArousalTitle: "Arousal — Instant Excitement (O_Arousal)",
    fmArousalDesc: "Immediate emotional response driving impulse purchases. S_Social is amplified 2.25× in tour group contexts (0.45 vs 0.20).",
    fmPleasureTitle: "Pleasure — Lasting Emotion (O_Pleasure)",
    fmPleasureDesc: "Creates \"memory value\" — more enduring than Arousal, drives volume purchases and gift-buying.",
    fmResponse: "Response Layer [R] — 3-Way Probabilities",
    fmRespDesc: "Three probabilities Buy / NoBuy / Undecided always normalize to sum = 100%. Undecided is modeled based on information level, time, and social pressure deficit.",
    fmBuyTitle: "rawBuy — Raw Purchase Probability",
    fmNoBuyTitle: "rawNoBuy — Rejection Penalty",
    fmUndecidedTitle: "rawUndecided — Undecided",
    fmNormTitle: "3-Way Normalization",
    fmNormDesc: "All raw scores divided by total → always = 100%. Prevents unexplained remainders where Buy + NoBuy < 100%.",
    fmHypotheses: "10 Research Hypotheses",
    fmScenarios: "Scenario Summary Table",
    fmScDesc: "Predicted outcomes for 6 representative scenarios (values computed from formulas above)",
    fmVar: "Variable",
    fmWeight: "Weight",
    fmMeaning: "Meaning",
    fmThreshold: "Threshold",
    fmPenalty: "Penalty",
    fmCondition: "Condition",
    fmScenario: "Scenario",

    stTotal: "Total Codes",
    stTotalSub: "From 12 in-depth interviews",
    stStim: "Stimulus [S]",
    stStimSub: "55% total codes · 6 groups",
    stOrg: "Organism [O]",
    stOrgSub: "23% total codes · 3 layers",
    stResp: "Response [R]",
    stRespSub: "23% total codes · Buy = NoBuy",

    chDistrib: "Coding Distribution",
    mxTitle: "Consensus Matrix",
    mxFilterAll: "All",
    mxFilterHigh: "High Consensus",
    mxFilterConflict: "Conflict",
    mxTopic: "Topic",
    mxHDV: "Guide",
    mxCG: "Expert",
    mxHKD: "Seller",
    mxLevel: "Level",

    exTitle: "Read the Model in 60 Seconds",
    exSub: "4 mechanisms · 2 real scenarios · Quotes from ĐBSCL in-depth interviews",
    exMechTitle: "4 Core Mechanisms",
    exScenTitle: "2 Real-World Scenarios",
    exInsightTitle: "The Mekong Delta Paradox",

    nbTitle: "No-Buy Barrier Analysis",
    nbTrust: "Trust Loss",
    nbPractical: "Practical Barriers",
    nbGap: "Info Gap",
    nbStruct: "Structural Barriers",
    nbTrustDesc: "\"Made in China\" label · Cannot prove origin · Inconsistent pricing across outlets",
    nbPracticalDesc: "Hard to transport (rice paintings fragile) · Customs concerns · Size/weight issues",
    nbGapDesc: "No storytelling · Customers don't understand product value · Missing origin info",
    nbStructDesc: "Wholesale only, no retail · Limited distribution · Inaccessible to tourists",
    nbNote: "\"Made in China\" · Inconsistent Pricing",

    simQuick: "⚡ Quick Scenarios",
    simAdjust: "🎛️ Adjust Variables",
    simFlow: "🔄 Activation Flow S → O → R (Real-time)",
    simForecast: "📊 Forecast Results",
    simHyp: "🔬 Hypothesis Status",
    simNar: "📝 Narrative Interpretation",

    scIdeal: "🌟 Ideal",
    scNoStory: "📭 No Story",
    scChina: "🚫 Made in China",
    scTour: "🚌 Tour Group",
    scSolo: "🎒 Solo Traveler",
    scB2B: "🏢 Wholesale Only",

    slStory: "S_Cultural (Story)",
    slSocial: "S_Social (Guide)",
    slProduct: "S_Product (Features)",
    slPlace: "S_Place (Space)",
    slPrice: "S_Price (Transparency)",
    slPromo: "S_Promotion (Storytelling)",
    slAtt: "O_Attitude (Trust)",
    slCtx: "Context (0=Solo, 100=Group)",
    slTime: "Time (mins)",

    dgStim: "Stimulus",
    dgStimSub: "avg S score",
    dgArousal: "Arousal",
    dgArousalSub: "O_Arousal",
    dgGate: "H5 gate",
    dgGateBlocked: "BLOCKED",
    dgGateOpen: "OPEN",
    dgGatePartial: "PARTIAL",
    dgBuy: "R_Buy",
    dgNoBuy: "R_NoBuy",
    dgProbBuy: "Buy Prob",
    dgProbNoBuy: "NoBuy Prob",
    dgCult: "Cultural",
    dgCultSub: "S_Cultural",
    dgPleasure: "Pleasure",
    dgPleasureSub: "O_Pleasure",
    dgAttGate: "Attitude Gate",
    dgBlocked: "🔴 Block",
    dgOpen: "🟢 Open",
    dgPartial: "🟡 Partial",

    ocBuy: "Buy Probability",
    ocNoBuy: "No-Buy Probability",
    ocArousal: "Arousal Level",
    ocAttitude: "Trust Level",

    narTrust: "Trust Broken.",
    narTrustDesc: "Attitude filter is blocking all Stimulus efforts. Need price transparency and origin proof.",
    narGap: "Storytelling Gap.",
    narGapDesc: "Customers don't understand value, low Arousal. Need cultural storytelling.",
    narTour: "Tour Group Effect.",
    narTourDesc: "Guide triggers strong FOMO. Feedback loop active.",
    narSolo: "Solo Traveler.",
    narSoloDesc: "No Guide → Weak S_Social. Decision depends on S_Cultural and S_Product.",
    narBal: "Balanced Scenario.",
    narBalDesc: "Result depends on subtle adjustments of variables.",



    // Intro tab
    tabIntro: "INTRO",
    inHero: "Why do some tourists buy while others don't?",
    inHeroSub: "12 in-depth interviews across 6 Mekong Delta provinces reveal the answer.",
    inHeroDesc: "Two tourists stand before the same product — one reaches for their wallet immediately, the other walks away. What creates that difference? The E-SOR-C model explains the psychological mechanism behind souvenir buying decisions.",
    inModelTitle: "How does the model work?",
    inS: "Stimulus (S)",
    inSDesc: "Everything guests see and hear: the guide's storytelling, displayed products, store atmosphere, listed prices.",
    inO: "Inner Emotion (O)",
    inODesc: "Psychological reactions: feeling excited, happy, and most critically — trusting or not trusting.",
    inR: "Action (R)",
    inRDesc: "The final outcome: buy, don't buy, or share with friends.",
    inC: "Context (C)",
    inCDesc: "Group tour or solo travel? How much time is available? These factors amplify or dampen emotional responses.",
    inFindTitle: "3 Key Research Findings",
    inF1Title: "Story matters more than price",
    inF1Desc: "International tourists are willing to spend — but they don't buy because no one explains what the product is.",
    inF1Quote: "It's not that they don't have money. They don't buy because they don't know what it is or what makes it special.",
    inF2Title: "Trust is the only gate",
    inF2Desc: "When guests see \"Made in China\", they put it down immediately and don't come back — no matter how beautiful the product.",
    inF2Quote: "Once I see 'Made in China' I absolutely won't buy, no matter how pretty it is.",
    inF3Title: "Tour groups amplify the effect ×2.25",
    inF3Desc: "When 5 people stop to look, the whole group gathers. Positive social pressure drives faster buying decisions.",
    inF3Quote: "A bus of 10 guests... you only need 5–7 to stop and buy and it all changes.",
    inCTA: "Explore Dashboard",

    footer: "E-SOR-C Dashboard · PhD Candidate Phan Thi Thuy Phuong · Nguyen Tat Thanh University · 2026"
  }
};

type Lang = 'vi' | 'en';

// --- SHARED CONSTANTS ---
const COLORS = {
  blue: '#3b82f6',
  purple: '#a855f7',
  cyan: '#06b6d4',
  green: '#22c55e',
  amber: '#f59e0b',
  red: '#ef4444',
  teal: '#14b8a6',
  slate: '#64748b'
};

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('E-SOR-C Error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-8 text-center border bg-red-500/10 border-red-500/20 rounded-xl">
          <h2 className="text-lg font-bold text-red-500">Đã xảy ra lỗi hiển thị</h2>
          <p className="mt-2 text-sm text-red-400">Vui lòng tải lại trang hoặc liên hệ quản trị viên.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 mt-4 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Thử lại
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- COMPONENT: ESORC DIAGRAM (SVG) ---
const ESORCDiagram = () => {
  // Helper for % conversion based on 1100x560 viewBox to ensure responsive scaling matches SVG
  const x = (v: number) => `${(v / 1100) * 100}%`;
  const y = (v: number) => `${(v / 560) * 100}%`;

  const Node = ({ l, t, w, h, bg, border, title, sub, titleColor, subColor, dashed = false }: any) => {
    const isHexBg = bg.startsWith('#');
    const isHexBorder = border.startsWith('#');
    return (
      <div
        className={`absolute z-20 flex flex-col items-center justify-center rounded-xl border-2 shadow-sm transition-transform hover:scale-105 ${dashed ? 'border-dashed' : ''} ${!isHexBg ? bg : ''} ${!isHexBorder ? border : ''}`}
        style={{
          left: x(l), top: y(t), width: x(w), height: y(h),
          backgroundColor: isHexBg ? bg : undefined,
          borderColor: isHexBorder ? border : undefined
        }}
      >
        <div className={`font-bold text-sm sm:text-base text-center leading-tight ${titleColor}`} style={{ color: titleColor.startsWith('#') ? titleColor : undefined }}>{title}</div>
        <div className={`text-[9px] sm:text-[11px] text-center mt-1 leading-tight ${subColor}`} style={{ color: subColor.startsWith('#') ? subColor : undefined }}>{sub}</div>
      </div>
    );
  };

  return (
    <div className="relative w-full aspect-[1100/560] select-none bg-surface2/30 rounded-xl border border-border overflow-visible min-h-[520px]">
      {/* SVG Layer for Connections & Background - z-index 5 */}
      <svg viewBox="0 0 1100 560" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full z-[5] pointer-events-none">
        <defs>
          <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" /></marker>
          <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#a855f7" /></marker>
          <marker id="arrow-cyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#06b6d4" /></marker>
          <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#22c55e" /></marker>
          <marker id="arrow-amber" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" /></marker>
          <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ef4444" /></marker>
          <marker id="arrow-teal" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#14b8a6" /></marker>
          <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b" /></marker>
        </defs>
        {/* Background Zones */}
        <rect x="10" y="20" width="240" height="520" rx="16" className="fill-surface2/50 stroke-blue-500/50" strokeWidth="1" strokeDasharray="4,4" />
        <text x="130" y="45" textAnchor="middle" className="fill-blue-400 dark:fill-blue-400 font-extrabold tracking-widest text-base">STIMULUS [S]</text>

        <rect x="270" y="20" width="510" height="520" rx="16" className="fill-surface2/50 stroke-purple-500/50" strokeWidth="1" strokeDasharray="4,4" />
        <text x="525" y="45" textAnchor="middle" className="fill-purple-400 dark:fill-purple-400 font-extrabold tracking-widest text-base">ORGANISM [O]</text>

        <rect x="800" y="20" width="290" height="520" rx="16" className="fill-surface2/50 stroke-green-500/50" strokeWidth="1" strokeDasharray="4,4" />
        <text x="945" y="45" textAnchor="middle" className="fill-green-400 dark:fill-green-400 font-extrabold tracking-widest text-base">RESPONSE [R]</text>

        {/* ═══ S → O Connections (H1, H3, H6) ═══ */}
        {/* S_Product → O_Arousal */}
        <path d="M220,91 C290,91 290,96 360,96" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" opacity="0.6" />

        {/* S_Social → O_Arousal (H6) */}
        <path d="M220,191 C290,191 290,96 360,96" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" opacity="0.6" />
        <rect x="228" y="163" width="24" height="16" rx="3" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1" opacity="0.95" />
        <text x="240" y="175" textAnchor="middle" className="fill-violet-300 text-[10px] font-bold">H6</text>

        {/* S_Cultural → O_Arousal (H1) */}
        <path d="M220,291 C290,291 290,96 360,96" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" opacity="0.6" />
        <rect x="228" y="240" width="24" height="16" rx="3" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1" opacity="0.95" />
        <text x="240" y="252" textAnchor="middle" className="fill-violet-300 text-[10px] font-bold">H1</text>

        {/* S_Cultural → O_Pleasure (H3) */}
        <path d="M220,291 C290,291 290,211 360,211" fill="none" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow-cyan)" opacity="0.6" />
        <rect x="252" y="284" width="24" height="16" rx="3" fill="#082f49" stroke="#06b6d4" strokeWidth="1" opacity="0.95" />
        <text x="264" y="296" textAnchor="middle" className="fill-cyan-300 text-[10px] font-bold">H3</text>

        {/* S_Place/Price → O_Arousal (atmospheric stimuli → excitement) */}
        <path d="M220,391 C290,391 290,96 360,96" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" opacity="0.5" />

        {/* S_Place/Price → O_Attitude (H8: thiếu S_Promotion → O_Attitude âm → R_NoBuy) */}
        <path d="M220,391 C260,391 270,446 290,446" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow-amber)" opacity="0.6" />
        <rect x="228" y="358" width="24" height="16" rx="3" fill="#1c1003" stroke="#f59e0b" strokeWidth="1" opacity="0.95" />
        <text x="240" y="370" textAnchor="middle" className="fill-amber-300 text-[10px] font-bold">H8</text>

        {/* O_Arousal → R_Buy (H2) — đường thẳng */}
        <path d="M560,96 L840,91" fill="none" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
        <rect x="680" y="81" width="30" height="20" rx="4" className="fill-surface stroke-green-500" />
        <text x="695" y="95" textAnchor="middle" className="fill-green-500 text-[11px] font-bold">H2</text>

        {/* O_Pleasure → R_Buy (H4) — đường thẳng chéo */}
        <path d="M560,211 L840,110" fill="none" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
        <rect x="680" y="150" width="30" height="20" rx="4" className="fill-surface stroke-green-500" />
        <text x="695" y="164" textAnchor="middle" className="fill-green-500 text-[11px] font-bold">H4</text>

        {/* H5: O_Attitude thấp → R_NoBuy — right-angle path */}
        <path d="M490,446 L820,446 L820,236 L840,236" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrow-red)" opacity="0.85" />
        <text x="660" y="462" textAnchor="middle" className="fill-amber-400 text-[10px] font-bold">H5 (Att. Blocks → NoBuy)</text>

        {/* H9: R_Buy → R_Recommend — bracket thẳng cạnh phải, tránh R_NoBuy */}
        <path d="M1060,127 L1083,127 L1083,345 L1060,345" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrow-teal)" />
        <rect x="1063" y="223" width="28" height="18" rx="4" className="fill-surface stroke-teal-500" />
        <text x="1077" y="236" textAnchor="middle" className="fill-teal-500 text-[11px] font-bold">H9</text>

        <path d="M840,381 C120,381 120,381 120,227" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrow-gray)" opacity="0.5" />
        <text x="480" y="530" textAnchor="middle" className="fill-text3 text-[11px] italic">Feedback Loop (H10): R_Recommend → S_Social</text>

        {/* [C] Context: đường thẳng đứng cắt qua H2 & H4 — standard moderator notation */}
        {/* H7: Context moderates S_Social × O_Arousal (tour vs solo amplification) */}
        <path d="M720,410 L720,75" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-gray)" opacity="0.75" />
        <text x="736" y="253" className="fill-slate-400 text-[10px] italic">C mod.</text>
        <rect x="730" y="257" width="24" height="16" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" opacity="0.9" />
        <text x="742" y="269" textAnchor="middle" className="fill-slate-300 text-[10px] font-bold">H7</text>
      </svg>

      {/* HTML Nodes - Z-Index 20 */}
      {/* S Nodes */}
      <Node l={20} t={55} w={200} h={72} bg="bg-surface dark:bg-[#1e293b]" border="border-blue-500" title="S_Product" titleColor="text-blue-400" sub="Features · 16 codes" subColor="text-blue-500" />
      <Node l={20} t={155} w={200} h={72} bg="bg-surface dark:bg-[#1e293b]" border="border-blue-500" title="S_Social" titleColor="text-blue-400" sub="Social Influence · 5 codes" subColor="text-blue-500" />
      <Node l={20} t={255} w={200} h={72} bg="bg-surface dark:bg-[#1e293b]" border="border-blue-500" title="S_Cultural" titleColor="text-blue-400" sub="Identity · 7 codes" subColor="text-blue-500" />
      <Node l={20} t={355} w={200} h={72} bg="bg-surface dark:bg-[#1e293b]" border="border-blue-500" title="S_Place/Price" titleColor="text-blue-400" sub="Env · Price · Promo" subColor="text-blue-500" />

      {/* O Nodes */}
      <Node l={360} t={60} w={200} h={72} bg="#2e1065" border="#a855f7" title="O_Arousal" titleColor="#e9d5ff" sub="Instant Excitement" subColor="#c084fc" />
      <Node l={360} t={175} w={200} h={72} bg="#083344" border="#06b6d4" title="O_Pleasure" titleColor="#a5f3fc" sub="Lasting Emotion" subColor="#67e8f9" />
      <Node l={290} t={410} w={200} h={72} bg="#431407" border="#f59e0b" dashed={true} title="O_Attitude" titleColor="#fdba74" sub="FILTER / MODERATOR" subColor="#fb923c" />
      <Node l={510} t={410} w={210} h={72} bg="bg-surface dark:bg-[#1e293b]" border="#64748b" dashed={true} title="[C] Context" titleColor="text-text2" sub="Type · Time" subColor="text-text3" />

      {/* R Nodes */}
      <Node l={840} t={55} w={220} h={72} bg="#052e16" border="#22c55e" title="R_Buy" titleColor="#86efac" sub="Impulse · Volume · Chain" subColor="#4ade80" />
      <Node l={840} t={200} w={220} h={72} bg="#450a0a" border="#ef4444" title="R_NoBuy" titleColor="#fca5a5" sub="Trust · Practical · Info" subColor="#f87171" />
      <Node l={840} t={345} w={220} h={72} bg="#042f2e" border="#14b8a6" title="R_Recommend" titleColor="#5eead4" sub="SNS · WOM · Return" subColor="#2dd4bf" />
    </div>
  );
};


// --- MODEL EXPLAINER ---

const ModelExplainer = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang];
  const isVi = lang === 'vi';

  const MECHANISMS = [
    {
      id: 'H5',
      icon: <Ban size={20} />,
      color: 'amber',
      bg: 'bg-amber-500/8 border-amber-500/25',
      badgeBg: 'bg-amber-500/15',
      badgeText: 'text-amber-400',
      iconBg: 'bg-amber-500/15 text-amber-400',
      headline: isVi ? 'H5 — Thái độ: Cánh cửa duy nhất' : 'H5 — Attitude: The Only Gate',
      mechanism: isVi
        ? 'Khi O_Attitude < 40 → xác suất mua gần bằng 0, dù sản phẩm đẹp hay HDV giỏi đến đâu.'
        : 'When O_Attitude < 40 → purchase probability ≈ 0, no matter how good the product or guide.',
      quote: isVi
        ? '"Nhìn thấy made in China là tôi dứt khoát không mua, dù nó đẹp cỡ nào."'
        : '"Once I see \'Made in China\' I absolutely won\'t buy, no matter how pretty it is."',
      attribution: 'HDV Ngô Đình Minh Quang',
      signal: isVi ? 'Ngưỡng nguy hiểm: < 40' : 'Danger threshold: < 40',
    },
    {
      id: 'H1+H6',
      icon: <Zap size={20} />,
      color: 'purple',
      bg: 'bg-purple-500/8 border-purple-500/25',
      badgeBg: 'bg-purple-500/15',
      badgeText: 'text-purple-400',
      iconBg: 'bg-purple-500/15 text-purple-400',
      headline: isVi ? 'H1+H6 — Story + HDV bật hứng thú' : 'H1+H6 — Story + Guide triggers excitement',
      mechanism: isVi
        ? 'S_Cultural & S_Social → O_Arousal → R_Buy tức thì. Trong tour đoàn, S_Social được khuếch đại ×2.25 (H7).'
        : 'S_Cultural & S_Social → O_Arousal → immediate R_Buy. In tour groups, S_Social amplified ×2.25 (H7).',
      quote: isVi
        ? '"Khi kể về bình giữ nhiệt làm từ trái dừa, khách Ý nói Extremely interesting! rồi mua ngay."'
        : '"When I told the story about the coconut thermos, the Italian guest said \'Extremely interesting!\' and bought immediately."',
      attribution: 'HDV Trần Minh Luyện',
      signal: isVi ? 'Tour: ×2.25 vs khách lẻ' : 'Tour: ×2.25 vs solo',
    },
    {
      id: 'H3+H4',
      icon: <Sun size={20} />,
      color: 'cyan',
      bg: 'bg-cyan-500/8 border-cyan-500/25',
      badgeBg: 'bg-cyan-500/15',
      badgeText: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15 text-cyan-400',
      headline: isVi ? 'H3+H4 — Ký ức → Mua nhiều hơn' : 'H3+H4 — Memory → Buys More',
      mechanism: isVi
        ? 'S_Cultural → O_Pleasure (H3) → R_Buy_Volume (H4). Quà lưu niệm không phải đồ vật — là ký ức được vật chất hóa.'
        : 'S_Cultural → O_Pleasure (H3) → R_Buy_Volume (H4). Souvenirs aren\'t objects — they\'re materialized memories.',
      quote: isVi
        ? '"Có nhiều người mua nón lá một lần 5–7 cái, cả chục cái về tặng bạn bè."'
        : '"Many people buy 5–7 conical hats at once, a dozen to give as gifts to friends."',
      attribution: 'HDV La Phi Long',
      signal: isVi ? 'Thúc đẩy mua sỉ & quà tặng' : 'Drives bulk & gift buying',
    },
    {
      id: 'H9+H10',
      icon: <Share2 size={20} />,
      color: 'teal',
      bg: 'bg-teal-500/8 border-teal-500/25',
      badgeBg: 'bg-teal-500/15',
      badgeText: 'text-teal-400',
      iconBg: 'bg-teal-500/15 text-teal-400',
      headline: isVi ? 'H9+H10 — Vòng lặp tự khuếch đại' : 'H9+H10 — Self-amplifying Loop',
      mechanism: isVi
        ? 'R_Buy → R_Recommend (H9) → S_Social mới (H10). Mỗi giao dịch thành công tạo ra S_Social cho lượt sau.'
        : 'R_Buy → R_Recommend (H9) → new S_Social (H10). Each successful sale creates S_Social for the next cycle.',
      quote: isVi
        ? '"Người ta mang về nước, kể cho bạn bè nghe — đó là cách quảng bá Việt Nam miễn phí."'
        : '"They bring it home, tell their friends — that\'s free advertising for Vietnam."',
      attribution: 'HDV Phạm Tấn Đức',
      signal: isVi ? 'Mỗi lần mua = 1 S_Social mới' : 'Each purchase = 1 new S_Social',
    },
  ];

  const SCENARIO_CARDS = [
    {
      type: 'success',
      emoji: '🟢',
      title: isVi ? 'Kịch bản MUA — Tour đoàn + HDV nhiệt tình' : 'BUY scenario — Group tour + enthusiastic guide',
      borderColor: 'border-green-500/30',
      bg: 'bg-green-500/5',
      steps: [
        { icon: '①', color: 'text-blue-400', label: isVi ? 'HDV kể chuyện bình dừa' : 'Guide tells coconut thermos story', detail: isVi ? 'S_Cultural ↑ · S_Promotion ↑' : 'S_Cultural ↑ · S_Promotion ↑' },
        { icon: '②', color: 'text-purple-400', label: isVi ? 'Khách hứng thú tức thì' : 'Guest becomes excited immediately', detail: isVi ? 'O_Arousal ↑ (H1+H6)' : 'O_Arousal ↑ (H1+H6)' },
        { icon: '③', color: 'text-amber-400', label: isVi ? 'Niềm tin OK — cánh cửa mở' : 'Trust OK — gate opens', detail: isVi ? 'O_Attitude ≥ 70 → gate ≈ 0.7+ (H5)' : 'O_Attitude ≥ 70 → gate ≈ 0.7+ (H5)' },
        { icon: '④', color: 'text-blue-300', label: isVi ? '5 người dừng → cả đoàn xúm vào' : '5 stop → whole group gathers', detail: isVi ? 'S_Social ×2.25 (H7)' : 'S_Social ×2.25 (H7)' },
        { icon: '⑤', color: 'text-green-400', label: isVi ? 'Mua ngay + chụp ảnh chia sẻ' : 'Buy immediately + photos shared', detail: isVi ? 'R_Buy → R_Recommend → H10' : 'R_Buy → R_Recommend → H10' },
      ],
      result: '~80–95% Buy',
      resultColor: 'text-green-400',
    },
    {
      type: 'fail',
      emoji: '🔴',
      title: isVi ? 'Kịch bản KHÔNG MUA — Made in China + Không story' : 'NO-BUY scenario — Made in China + No story',
      borderColor: 'border-red-500/30',
      bg: 'bg-red-500/5',
      steps: [
        { icon: '①', color: 'text-slate-400', label: isVi ? 'Không có HDV giới thiệu' : 'No guide to introduce product', detail: isVi ? 'S_Promotion = 10 → O_Attitude giảm (H8)' : 'S_Promotion = 10 → O_Attitude drops (H8)' },
        { icon: '②', color: 'text-red-400', label: isVi ? 'Thấy tem "Made in China"' : 'Spots "Made in China" label', detail: isVi ? 'S_Product ↓ · O_Attitude < 40' : 'S_Product ↓ · O_Attitude < 40' },
        { icon: '③', color: 'text-red-500', label: isVi ? 'Cánh cửa H5 đóng chặt' : 'H5 gate slams shut', detail: isVi ? 'gate ≈ 0.2 → rawBuy gần bằng 0' : 'gate ≈ 0.2 → rawBuy ≈ 0' },
        { icon: '④', color: 'text-slate-500', label: isVi ? 'Dù sản phẩm đẹp cũng bỏ qua' : 'Ignores even beautiful products', detail: isVi ? 'O_Arousal không đủ vượt gate' : 'O_Arousal insufficient to overcome gate' },
        { icon: '⑤', color: 'text-red-300', label: isVi ? 'Ra đi — không mua, không chia sẻ' : 'Walks away — no buy, no share', detail: isVi ? 'R_NoBuy ↑ · H10 bị ngắt' : 'R_NoBuy ↑ · H10 cycle broken' },
      ],
      result: isVi ? '~14% Buy · ~61% NoBuy' : '~14% Buy · ~61% NoBuy',
      resultColor: 'text-red-400',
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400"><Lightbulb size={16} /></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-text2">{t.exTitle}</h2>
          </div>
          <p className="text-xs text-text3 ml-8">{t.exSub}</p>
        </div>
      </div>

      {/* 4 Mechanisms */}
      <div>
        <p className="text-[11px] font-bold tracking-widest uppercase text-text3 mb-3">{t.exMechTitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {MECHANISMS.map((m) => (
            <div key={m.id} className={`rounded-xl border p-4 flex flex-col gap-3 ${m.bg}`}>
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${m.iconBg}`}>{m.icon}</div>
                <span className={`text-[10px] font-bold ${m.badgeText} ${m.badgeBg} px-2 py-0.5 rounded-full`}>{m.id}</span>
              </div>
              <div>
                <p className={`text-[13px] font-bold ${m.badgeText} leading-snug mb-1`}>{m.headline}</p>
                <p className="text-[11px] text-text2 leading-relaxed">{m.mechanism}</p>
              </div>
              <blockquote className="border-l-2 border-current pl-2.5 opacity-70">
                <p className="text-[10px] text-text2 italic leading-relaxed">{m.quote}</p>
                <footer className={`text-[9px] mt-1 font-semibold ${m.badgeText}`}>— {m.attribution}</footer>
              </blockquote>
              <div className={`text-[9px] font-bold ${m.badgeText} opacity-80 mt-auto`}>↳ {m.signal}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 Scenarios */}
      <div>
        <p className="text-[11px] font-bold tracking-widest uppercase text-text3 mb-3">{t.exScenTitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCENARIO_CARDS.map((sc) => (
            <div key={sc.type} className={`rounded-xl border p-4 ${sc.bg} ${sc.borderColor}`}>
              <p className="text-[12px] font-bold text-text mb-3 flex items-center gap-1.5">
                <span>{sc.emoji}</span> {sc.title}
              </p>
              <div className="space-y-2 mb-3">
                {sc.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`text-[13px] font-black ${step.color} shrink-0 leading-tight`}>{step.icon}</span>
                    <div>
                      <span className="text-[11px] font-semibold text-text">{step.label}</span>
                      <span className="text-[10px] text-text3 ml-1.5">{step.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`text-xs font-extrabold ${sc.resultColor} pt-2 border-t border-current/10`}>
                {isVi ? 'Kết quả: ' : 'Result: '}{sc.result}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Paradox */}
      <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 flex gap-3">
        <div className="text-2xl shrink-0">⚡</div>
        <div>
          <p className="text-[12px] font-bold text-amber-400 mb-1">{t.exInsightTitle}</p>
          <p className="text-[12px] text-text2 leading-relaxed mb-2">
            {isVi
              ? 'Giá cả KHÔNG phải rào cản chính. Khách quốc tế sẵn sàng chi tiền — nhưng họ không mua vì không ai kể chuyện cho họ nghe.'
              : 'Price is NOT the main barrier. International tourists are willing to pay — but they don\'t buy because no one tells them the story.'}
          </p>
          <blockquote className="border-l-2 border-amber-500/40 pl-2.5">
            <p className="text-[11px] text-amber-300/80 italic">
              {isVi
                ? '"Không phải người ta không có tiền mua đâu. Người ta không mua vì người ta không biết cái đó là cái gì, nó có gì đặc biệt."'
                : '"It\'s not that they don\'t have money. They don\'t buy because they don\'t know what it is or what makes it special."'}
            </p>
            <footer className="text-[10px] text-amber-400 font-semibold mt-1">— HDV Trần Minh Luyện</footer>
          </blockquote>
          <p className={`text-[11px] font-bold text-amber-400 mt-2`}>
            {isVi
              ? '→ Storytelling (H8) = đòn bẩy ROI cao nhất trong toàn bộ mô hình E-SOR-C'
              : '→ Storytelling (H8) = highest ROI lever in the entire E-SOR-C model'}
          </p>
        </div>
      </div>
    </div>
  );
};


// --- INTRO VIEW ---

const IntroView = ({ lang, onStart }: { lang: Lang; onStart: () => void }) => {
  const t = TRANSLATIONS[lang];

  const MODEL_STEPS = [
    {
      letter: 'S',
      color: 'blue',
      bg: 'bg-blue-500/10 border-blue-500/30',
      textColor: 'text-blue-400',
      title: t.inS,
      desc: t.inSDesc,
      icon: <Zap size={22} />,
    },
    {
      letter: 'O',
      color: 'purple',
      bg: 'bg-purple-500/10 border-purple-500/30',
      textColor: 'text-purple-400',
      title: t.inO,
      desc: t.inODesc,
      icon: <BrainCircuit size={22} />,
    },
    {
      letter: 'R',
      color: 'green',
      bg: 'bg-green-500/10 border-green-500/30',
      textColor: 'text-green-400',
      title: t.inR,
      desc: t.inRDesc,
      icon: <ShoppingCart size={22} />,
    },
    {
      letter: 'C',
      color: 'amber',
      bg: 'bg-amber-500/10 border-amber-500/30 border-dashed',
      textColor: 'text-amber-400',
      title: t.inC,
      desc: t.inCDesc,
      icon: <Users size={22} />,
    },
  ];

  const FINDINGS = [
    {
      num: '01',
      icon: <MessageCircle size={20} />,
      color: 'blue',
      bg: 'bg-blue-500/5 border-blue-500/20',
      badgeColor: 'bg-blue-500/15 text-blue-400',
      title: t.inF1Title,
      desc: t.inF1Desc,
      quote: t.inF1Quote,
      attribution: 'HDV Trần Minh Luyện',
    },
    {
      num: '02',
      icon: <ShieldAlert size={20} />,
      color: 'red',
      bg: 'bg-red-500/5 border-red-500/20',
      badgeColor: 'bg-red-500/15 text-red-400',
      title: t.inF2Title,
      desc: t.inF2Desc,
      quote: t.inF2Quote,
      attribution: 'HDV Ngô Đình Minh Quang',
    },
    {
      num: '03',
      icon: <Users size={20} />,
      color: 'amber',
      bg: 'bg-amber-500/5 border-amber-500/20',
      badgeColor: 'bg-amber-500/15 text-amber-400',
      title: t.inF3Title,
      desc: t.inF3Desc,
      quote: t.inF3Quote,
      attribution: 'HDV La Phi Long',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 py-4">

      {/* Hero */}
      <div className="text-center space-y-4 py-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Info size={12} /> E-SOR-C Model
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-text leading-tight">
          {t.inHero}
        </h1>
        <p className="text-sm font-semibold text-blue-400">{t.inHeroSub}</p>
        <p className="text-sm text-text2 leading-relaxed max-w-2xl mx-auto">{t.inHeroDesc}</p>
      </div>

      {/* Model Steps */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-text3 mb-5 text-center">{t.inModelTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODEL_STEPS.map((step, i) => (
            <div key={step.letter} className="relative">
              <div className={`p-5 rounded-2xl border h-full flex flex-col gap-3 ${step.bg}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${step.textColor} bg-surface border border-current/20 shrink-0`}>
                    {step.letter}
                  </div>
                  <div className={`p-2 rounded-lg bg-surface/60 ${step.textColor}`}>{step.icon}</div>
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${step.textColor} mb-1`}>{step.title}</h3>
                  <p className="text-xs text-text2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {/* Arrow between steps (desktop) */}
              {i < 3 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-text3">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3 Key Findings */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-text3 mb-5 text-center">{t.inFindTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FINDINGS.map((f) => (
            <div key={f.num} className={`p-5 rounded-2xl border flex flex-col gap-3 ${f.bg}`}>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${f.badgeColor}`}>{f.num}</span>
                <div className={`text-${f.color}-400`}>{f.icon}</div>
              </div>
              <h3 className={`text-sm font-bold text-${f.color}-400 leading-snug`}>{f.title}</h3>
              <p className="text-xs text-text2 leading-relaxed flex-1">{f.desc}</p>
              <blockquote className={`border-l-2 border-${f.color}-500/40 pl-3`}>
                <p className="text-[11px] italic text-text2 leading-relaxed">"{f.quote}"</p>
                <footer className={`text-[10px] font-semibold text-${f.color}-400 mt-1`}>— {f.attribution}</footer>
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="flex justify-center pb-8">
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/30"
        >
          {t.inCTA} <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

// --- DASHBOARD COMPONENTS ---

const StatCard = ({ data }: { data: any }) => (
  <article
    className={`relative overflow-hidden rounded-xl bg-surface border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-opacity-50 group shadow-sm`}
    aria-label={`${data.label}: ${data.value}`}
  >
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${data.color === COLORS.blue ? 'from-blue-500 to-blue-300' :
      data.color === COLORS.purple ? 'from-purple-500 to-purple-300' :
        data.color === COLORS.green ? 'from-green-500 to-green-300' :
          'from-amber-500 to-amber-300'
      }`} />
    <div className="flex justify-between items-start mb-2">
      <span className="text-[11px] font-bold tracking-wider text-text3 uppercase" aria-hidden="true">{data.label}</span>
      <div className="text-text2" aria-hidden="true">{data.icon}</div>
    </div>
    <div className="text-4xl font-extrabold text-text" aria-live="polite">{data.value}</div>
    <div className="text-xs text-text2 mt-1">{data.sub}</div>
  </article>
);

const Card = ({ title, dotColor, children, className = "" }: any) => (
  <div className={`bg-surface border border-border rounded-2xl p-6 relative overflow-hidden shadow-sm ${className}`}>
    <div className="flex items-center gap-2 mb-5">
      <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: dotColor, color: dotColor }} />
      <h3 className="text-[15px] font-semibold text-text">{title}</h3>
    </div>
    {children}
  </div>
);

const DashboardView = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang];
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'high' | 'conflict'>('all');

  const STATS = [
    { label: t.stTotal, value: 80, sub: t.stTotalSub, color: COLORS.blue, icon: <Search size={20} /> },
    { label: t.stStim, value: 44, sub: t.stStimSub, color: COLORS.blue, icon: <Activity size={20} /> },
    { label: t.stOrg, value: 18, sub: t.stOrgSub, color: COLORS.purple, icon: <BrainCircuit size={20} /> },
    { label: t.stResp, value: 18, sub: t.stRespSub, color: COLORS.green, icon: <ShoppingCart size={20} /> },
  ];

  const DISTRIBUTION_DATA = [
    { name: 'S_Product', count: 16, pct: 20, color: COLORS.blue },
    { name: 'S_Cultural', count: 7, pct: 9, color: '#60a5fa' },
    { name: 'S_Place', count: 8, pct: 10, color: '#93c5fd' },
    { name: 'S_Social', count: 5, pct: 6, color: '#bfdbfe' },
    { name: 'S_Promo', count: 5, pct: 6, color: '#dbeafe' },
    { name: 'S_Price', count: 3, pct: 4, color: '#eff6ff' },
    { name: 'O_Attitude', count: 10, pct: 12, color: COLORS.amber },
    { name: 'O_Arousal', count: 4, pct: 5, color: COLORS.purple },
    { name: 'O_Pleasure', count: 4, pct: 5, color: COLORS.cyan },
    { name: 'R_Buy', count: 7, pct: 9, color: COLORS.green },
    { name: 'R_NoBuy', count: 7, pct: 9, color: COLORS.red },
    { name: 'R_Recommend', count: 4, pct: 5, color: COLORS.teal },
  ];

  const NOBUY_DATA = [
    { name: t.nbTrust, value: 28, color: COLORS.red, desc: t.nbTrustDesc },
    { name: t.nbPractical, value: 28, color: COLORS.amber, desc: t.nbPracticalDesc },
    { name: t.nbGap, value: 28, color: COLORS.purple, desc: t.nbGapDesc },
    { name: t.nbStruct, value: 16, color: COLORS.slate, desc: t.nbStructDesc },
  ];

  const MATRIX_DATA = [
    { label: 'OP-04: Quà = ký ức du lịch', hdv: true, cg: true, hkd: true, level: 'all', levelText: 'Đồng thuận tuyệt đối' },
    { label: 'SP-01: Sản phẩm đồng nhất', hdv: true, cg: true, hkd: false, level: 'high', levelText: t.mxFilterHigh },
    { label: 'SPro-02: Thiếu storytelling', hdv: true, cg: true, hkd: false, level: 'high', levelText: t.mxFilterHigh },
    { label: 'SPl-01: Trưng bày lộn xộn', hdv: true, cg: true, hkd: false, level: 'high', levelText: t.mxFilterHigh },
    { label: 'SPr-01: Giá không đồng nhất', hdv: true, cg: true, hkd: false, level: 'high', levelText: t.mxFilterHigh },
    { label: 'OAt-08: Thiếu bản sắc riêng', hdv: true, cg: true, hkd: false, level: 'high', levelText: t.mxFilterHigh },
    { label: 'RNB-05: Na ná → không mua', hdv: true, cg: true, hkd: false, level: 'high', levelText: t.mxFilterHigh },
    { label: 'SSo-01→04: Hiệu ứng xã hội', hdv: true, cg: false, hkd: false, level: 'conflict', levelText: t.mxFilterConflict },
    { label: 'SP-10: Xu hướng eco-friendly', hdv: false, cg: false, hkd: true, level: 'conflict', levelText: t.mxFilterConflict },
    { label: 'SPl-07: Chỉ bán sỉ', hdv: false, cg: false, hkd: true, level: 'conflict', levelText: t.mxFilterConflict },
  ];

  const filteredMatrix = MATRIX_DATA.filter(row => matrixFilter === 'all' || row.level === matrixFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => <StatCard key={i} data={stat} />)}
      </div>

      {/* Diagram */}
      <div className="p-8 border bg-surface border-border rounded-2xl shadow-sm">
        <h2 className="mb-4 text-sm font-bold tracking-widest uppercase text-text2">Mô hình E-SOR-C</h2>
        <ESORCDiagram />
      </div>

      {/* Model Explainer */}
      <ModelExplainer lang={lang} />

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          {/* Chart */}
          <Card title={t.chDistrib} dotColor={COLORS.blue}>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={DISTRIBUTION_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)' }} itemStyle={{ color: 'var(--text)' }} cursor={{ fill: 'var(--surface2)', opacity: 0.5 }} />
                  <Bar dataKey="pct" radius={[0, 4, 4, 0]} barSize={20}>
                    {DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Matrix */}
          <Card title={t.mxTitle} dotColor={COLORS.green} className="flex-1">
            <div className="flex gap-2 mb-4">
              {([
                { id: 'all', label: t.mxFilterAll },
                { id: 'high', label: t.mxFilterHigh },
                { id: 'conflict', label: t.mxFilterConflict }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMatrixFilter(tab.id)}
                  aria-pressed={matrixFilter === tab.id}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${matrixFilter === tab.id ? 'bg-blue-600 text-white' : 'bg-surface2 text-text2 hover:bg-surface2/80'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border/50 text-text3">
                    <th className="py-2 pl-2 font-medium">{t.mxTopic}</th>
                    <th className="py-2 text-center">{t.mxHDV}</th>
                    <th className="py-2 text-center">{t.mxCG}</th>
                    <th className="py-2 text-center">{t.mxHKD}</th>
                    <th className="py-2 text-center">{t.mxLevel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredMatrix.map((row, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-blue-500/5">
                      <td className="py-3 pl-2 font-medium text-text">{row.label}</td>
                      {[row.hdv, row.cg, row.hkd].map((status, i) => (
                        <td key={i} className="text-center py-3"><div className={`w-6 h-6 mx-auto flex items-center justify-center rounded-full ${status ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400'}`}>{status ? <CheckCircle2 size={14} /> : <Minus size={14} />}</div></td>
                      ))}
                      <td className="text-center py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.level === 'all' ? 'bg-emerald-500/20 text-emerald-400' : row.level === 'high' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>{row.levelText}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          {/* NoBuy */}
          <Card title={t.nbTitle} dotColor={COLORS.red}>
            <div className="flex flex-col items-center md:flex-row">
              <div className="w-[200px] h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={NOBUY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {NOBUY_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }: any) => {
                        if (!active || !payload?.[0]) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="max-w-[220px] p-3 rounded-lg border shadow-lg" style={{ backgroundColor: 'var(--surface2)', borderColor: 'var(--border)' }}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: d.color }} />
                              <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{d.name}</span>
                            </div>
                            <div className="text-lg font-extrabold mb-1" style={{ color: d.color }}>{d.value}%</div>
                            <div className="text-[10px] leading-relaxed" style={{ color: 'var(--text3)' }}>{d.desc}</div>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3 mt-4 md:ml-6">
                {NOBUY_DATA.map((item, i) => (
                  <div key={i} className="group relative flex items-center gap-2 cursor-help">
                    <div className="w-2.5 h-2.5 rounded shadow-sm" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-text">{item.name}</span>
                      <span className="text-[10px] text-text3">{item.value}%</span>
                    </div>
                    <div className="absolute left-full ml-2 top-0 z-50 hidden group-hover:block w-[200px] p-2 rounded-lg border shadow-lg text-[10px] leading-relaxed" style={{ backgroundColor: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text3)' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              {NOBUY_DATA.map((item, i) => (
                <div key={i} className="p-3 border rounded-lg" style={{ backgroundColor: `${item.color}08`, borderColor: `${item.color}30` }}>
                  <div className="flex items-center gap-2 mb-1 text-xs font-bold" style={{ color: item.color }}>{i === 0 ? <AlertTriangle size={12} /> : <Minus size={12} />} {item.name} ({item.value}%)</div>
                  <div className="text-[11px] text-text3">{item.desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- SIMULATOR COMPONENTS ---


const SimulatorView = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang];
  const [s, setS] = useState<SimState>({
    sCu: 70, sSo: 60, sPr: 65, sPl: 50, sPx: 70, sPro: 65,
    oAt: 70, ctx: 70, time: 30
  });
  const deferredS = useDeferredValue(s);
  const [scenario, setScenario] = useState<string | null>(null);

  const o = useMemo(() => {
    return calculateSimulation(deferredS);
  }, [deferredS]);

  const applyScenario = (name: string) => {
    setScenario(name);
    if (SCENARIOS[name]) {
      setS(SCENARIOS[name]);
    }
  };

  const updateVal = (key: keyof SimState, val: number) => {
    setS(prev => ({ ...prev, [key]: val }));
    setScenario(null);
  };

  const strengthClass = (v: number, inverted = false) => {
    const effective = inverted ? 100 - v : v;
    if (effective >= 70) return 'bg-emerald-500/15 text-emerald-400';
    if (effective >= 40) return 'bg-amber-500/15 text-amber-400';
    if (effective > 0) return 'bg-red-500/15 text-red-400';
    return 'bg-slate-500/15 text-slate-400';
  };
  const strengthLabel = (v: number, inverted = false) => {
    const effective = inverted ? 100 - v : v;
    if (effective >= 70) return 'Mạnh ✓';
    if (effective >= 40) return 'Trung bình';
    if (effective > 10) return 'Yếu';
    return 'Bị chặn ✗';
  };

  const HYPS = [
    { id: 'H1', cls: 'bg-blue-500/5 border-blue-500/20', tag: 'bg-blue-500/15 text-blue-400', label: 'H1', text: 'S_Cultural → O_Arousal (+)', fn: () => ({ strength: deferredS.sCu * 0.85, note: deferredS.sCu > 70 ? 'Mạnh' : 'Yếu' }) },
    { id: 'H2', cls: 'bg-purple-500/5 border-purple-500/20', tag: 'bg-purple-500/15 text-purple-400', label: 'H2', text: 'O_Arousal → R_Buy_Impulse (+)', fn: () => ({ strength: o.arousal * 0.9, note: o.arousal > 70 ? 'Mạnh' : 'Trung bình' }) },
    { id: 'H3', cls: 'bg-blue-500/5 border-blue-500/20', tag: 'bg-blue-500/15 text-blue-400', label: 'H3', text: 'S_Cultural → O_Pleasure (+)', fn: () => ({ strength: deferredS.sCu * 0.75 + deferredS.sPr * 0.25, note: 'Bản sắc văn hóa' }) },
    { id: 'H4', cls: 'bg-purple-500/5 border-purple-500/20', tag: 'bg-purple-500/15 text-purple-400', label: 'H4', text: 'O_Pleasure → R_Buy_Volume (+)', fn: () => ({ strength: o.pleasure * 0.85, note: o.pleasure > 70 ? 'Mạnh' : 'Trung bình' }) },
    { id: 'H5', cls: 'bg-amber-500/5 border-amber-500/20', tag: 'bg-amber-500/15 text-amber-400', label: 'H5', text: 'O_Attitude điều tiết S→R', fn: () => ({ strength: o.attitude, note: o.attitude < 40 ? '🔴 BLOCKED' : o.attitude > 70 ? '🟢 OPEN' : '🟡 PARTIAL' }) },
    { id: 'H6', cls: 'bg-blue-500/5 border-blue-500/20', tag: 'bg-blue-500/15 text-blue-400', label: 'H6', text: 'S_Social → O_Arousal (+)', fn: () => ({ strength: deferredS.sSo * 0.9 * (o.isTour ? 1.3 : 0.7), note: o.isTour ? 'Tour: Mạnh' : 'Lẻ: Yếu' }) },
    { id: 'H7', cls: 'bg-amber-500/5 border-amber-500/20', tag: 'bg-amber-500/15 text-amber-400', label: 'H7', text: 'S_Social × Đoàn/Lẻ', fn: () => ({ strength: o.isTour ? deferredS.sSo * 1.4 : deferredS.sSo * 0.5, note: o.isTour ? 'Tour: ×1.4' : 'Lẻ: ×0.5' }) },
    // H8: strength = rủi ro thiếu storytelling (cao = nguy hiểm) — inverted=true để render màu đúng ngữ nghĩa
    { id: 'H8', cls: 'bg-amber-500/5 border-amber-500/20', tag: 'bg-amber-500/15 text-amber-400', label: 'H8', text: 'Thiếu S_Promo → O_Attitude âm → R_NoBuy', inverted: true, fn: () => ({ strength: (100 - deferredS.sPro) * 0.8, note: deferredS.sPro < 30 ? '🚫 Không Storytelling' : deferredS.sPro < 50 ? '⚠️ Story yếu' : '✅ Story đủ' }) },
    { id: 'H9', cls: 'bg-green-500/5 border-green-500/20', tag: 'bg-green-500/15 text-green-400', label: 'H9', text: 'R_Buy → R_Recommend', fn: () => ({ strength: o.arousal * 0.7, note: 'Tạo S_Social mới' }) },
    { id: 'H10', cls: 'bg-green-500/5 border-green-500/20', tag: 'bg-green-500/15 text-green-400', label: 'H10', text: 'Feedback Loop → S_Social', fn: () => ({ strength: o.arousal * 0.5 * o.tourFactor, note: 'Lây lan' }) },
  ];

  const getNarrative = () => {
    if (o.attitude < 40) {
      return (<span>🔴 <strong className="text-red-400">{t.narTrust}</strong> {t.narTrustDesc}</span>);
    } else if (deferredS.sCu < 30) {
      return (<span>📭 <strong className="text-amber-400">{t.narGap}</strong> {t.narGapDesc}</span>);
    } else if (o.isTour && deferredS.sSo > 70) {
      return (<span>🚌 <strong className="text-green-400">{t.narTour}</strong> {t.narTourDesc}</span>);
    } else if (!o.isTour) {
      return (<span>🎒 <strong className="text-blue-400">{t.narSolo}</strong> {t.narSoloDesc}</span>);
    } else {
      return (<span>✅ <strong className="text-blue-400">{t.narBal}</strong> {t.narBalDesc}</span>);
    }
  };

  const QUOTES: Record<string, string[]> = {
    ideal: ['"Có một khách Ý, khi mình kể về cái bình giữ nhiệt làm từ trái dừa, họ nói Extremely interesting! rồi mua ngay"', 'HDV Trần Minh Luyện — O_Arousal → R_Buy'],
    noStory: ['"Không phải người ta không có tiền mua đâu. Người ta không mua vì người ta không biết cái đó là cái gì"', 'HDV Trần Minh Luyện — Thiếu S_Promotion'],
    madeChina: ['"Khách lật ra thấy Made in China là họ đặt xuống liền, họ không mua nữa đâu"', 'HDV Ngô Đình Minh Quang — O_Attitude → R_NoBuy'],
    tour: ['"Một đoàn xe 10 khách... chỉ cần 5–7 khách đứng lại mua thôi là đã khác rồi"', 'HDV La Phi Long — S_Social Feedback Loop'],
    solo: ['"Đa phần khách nước ngoài thích có những câu chuyện về vùng làng quê"', 'HDV La Phi Long — S_Cultural'],
    b2b: ['"Mình bán sỉ cho mấy cái đại lý thôi chứ không bán lẻ, khách du lịch vào hỏi mua một cái thì mình cũng không bán"', 'Cô Nguyễn Thị Thuận — R_NoBuy Channel'],
  };

  const activeQuote = QUOTES[scenario || (deferredS.oAt < 40 ? 'madeChina' : deferredS.sCu < 30 ? 'noStory' : deferredS.oAt > 70 && deferredS.ctx > 50 ? 'ideal' : o.isTour ? 'tour' : 'ideal')];
  const aw = (v: number) => Math.max(2, v / 20);
  const ac = (v: number) => v > 60 ? '#10b981' : v > 30 ? '#f59e0b' : '#ef4444';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0 lg:gap-8 animate-in fade-in duration-500">

      {/* --- SIDEBAR --- */}
      <div className="space-y-6 lg:pr-6 lg:border-r border-border">
        {/* Scenarios */}
        <div>
          <h3 className="mb-3 text-[11px] font-bold tracking-widest uppercase text-text3">{t.simQuick}</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'ideal', l: t.scIdeal }, { id: 'noStory', l: t.scNoStory },
              { id: 'madeChina', l: t.scChina }, { id: 'tour', l: t.scTour },
              { id: 'solo', l: t.scSolo }, { id: 'b2b', l: t.scB2B }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => applyScenario(b.id)}
                className={`px-3 py-2 text-[11px] font-medium rounded-lg border transition-all ${scenario === b.id ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-surface2 border-border text-text2 hover:border-blue-500/50'}`}
              >
                {b.l}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-border/50" />

        {/* Sliders */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-text3">📦 [S] Stimulus</h3>
            <div className="space-y-4">
              {[
                { k: 'sCu', l: t.slStory, c: 'blue' }, { k: 'sSo', l: t.slSocial, c: 'blue' },
                { k: 'sPr', l: t.slProduct, c: 'blue' }, { k: 'sPl', l: t.slPlace, c: 'blue' },
                { k: 'sPx', l: t.slPrice, c: 'blue' }, { k: 'sPro', l: t.slPromo, c: 'blue' }
              ].map((i) => (
                <div key={i.k}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[11px] text-text2 font-medium">{i.l}</span>
                    <span className={`text-xs font-bold text-${i.c}-400`}>{(s as any)[i.k]}</span>
                  </div>
                  <input
                    type="range" min="0" max="100" value={(s as any)[i.k]}
                    onChange={(e) => updateVal(i.k as keyof SimState, +e.target.value)}
                    className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-surface2 accent-${i.c}-500`}
                    aria-label={i.l}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-border/50" />

          <div>
            <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-text3">🧠 [O] Organism</h3>
            <div className="space-y-4">
              <div key="oAt">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[11px] text-text2 font-medium">{t.slAtt}</span>
                  <span className={`text-xs font-bold text-amber-400`}>{s.oAt}</span>
                </div>
                <input type="range" min="0" max="100" value={s.oAt} onChange={(e) => updateVal('oAt', +e.target.value)} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-surface2 accent-amber-500" aria-label={t.slAtt} />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/50" />

          <div>
            <h3 className="mb-4 text-[11px] font-bold tracking-widest uppercase text-text3">🌍 [C] Context</h3>
            <div className="space-y-4">
              <div key="ctx">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[11px] text-text2 font-medium">{t.slCtx}</span>
                  <span className={`text-xs font-bold text-green-400`}>{s.ctx}</span>
                </div>
                <input type="range" min="0" max="100" value={s.ctx} onChange={(e) => updateVal('ctx', +e.target.value)} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-surface2 accent-green-500" aria-label={t.slCtx} />
              </div>
              <div key="time">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[11px] text-text2 font-medium">{t.slTime}</span>
                  <span className={`text-xs font-bold text-green-400`}>{s.time}</span>
                </div>
                <input type="range" min="5" max="90" value={s.time} onChange={(e) => updateVal('time', +e.target.value)} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-surface2 accent-green-500" aria-label={t.slTime} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="space-y-6">

        {/* Flow Diagram (Visual) */}
        <div className="p-5 border bg-surface border-border rounded-2xl shadow-sm">
          <h3 className="mb-6 text-sm font-bold text-text2">{t.simFlow}</h3>
          <div className="flex flex-col gap-6">

            {/* Top Flow: Stimulus -> Arousal -> Buy/NoBuy */}
            <div className="flex items-center">
              {/* S Node */}
              <div className="min-w-[120px] p-3 text-center border-2 rounded-xl bg-blue-500/5 border-blue-500/20">
                <div className="text-[10px] uppercase tracking-wider text-blue-400 font-bold mb-1">{t.dgStim}</div>
                <div className="text-xl font-extrabold text-blue-400 dark:text-blue-200">{Math.round((deferredS.sCu + deferredS.sSo + deferredS.sPr) / 3)}</div>
                <div className="text-[9px] text-blue-400 mt-1">{t.dgStimSub}</div>
              </div>

              {/* Arrow 1 */}
              <div className="flex-1 flex flex-col items-center px-2">
                <div className="w-full transition-all duration-300 rounded-full" style={{ height: aw(o.arousal), backgroundColor: ac(o.arousal) }} />
                <span className="text-[9px] font-bold mt-1 transition-colors" style={{ color: ac(o.arousal) }}>H1,H3,H6 →</span>
              </div>

              {/* O Arousal Node */}
              <div className="min-w-[120px] p-3 text-center border-2 rounded-xl bg-purple-500/5 border-purple-500/20">
                <div className="text-[10px] uppercase tracking-wider text-purple-400 font-bold mb-1">{t.dgArousal}</div>
                <div className="text-xl font-extrabold text-purple-500 dark:text-purple-200">{Math.round(o.arousal)}</div>
                <div className="text-[9px] text-purple-400 mt-1">{t.dgArousalSub}</div>
              </div>

              {/* Arrow 2 (Gate) */}
              <div className="flex-1 flex flex-col items-center px-2">
                <div className="w-full transition-all duration-300 rounded-full relative" style={{ height: aw(o.attitude), backgroundColor: ac(o.attitude) }}>
                  {o.attitude < 40 && <div className="absolute inset-0 border-t-2 border-red-500 border-dashed w-full top-1/2" />}
                </div>
                <span className="text-[9px] font-bold mt-1 transition-colors" style={{ color: ac(o.attitude) }}>
                  {t.dgGate} {o.attitude < 40 ? t.dgGateBlocked : o.attitude > 70 ? t.dgGateOpen : t.dgGatePartial}
                </span>
              </div>

              {/* R Result Node */}
              <div className={`min-w-[120px] p-3 text-center border-2 rounded-xl ${o.rBuy > o.rNoBuy ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <div className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${o.rBuy > o.rNoBuy ? 'text-emerald-400' : 'text-red-400'}`}>{o.rBuy > o.rNoBuy ? t.dgBuy : t.dgNoBuy}</div>
                <div className={`text-xl font-extrabold ${o.rBuy > o.rNoBuy ? 'text-emerald-500 dark:text-emerald-200' : 'text-red-500 dark:text-red-200'}`}>{o.rBuy > o.rNoBuy ? o.rBuy : o.rNoBuy}%</div>
                <div className={`text-[9px] mt-1 ${o.rBuy > o.rNoBuy ? 'text-emerald-400' : 'text-red-400'}`}>{o.rBuy > o.rNoBuy ? t.dgProbBuy : t.dgProbNoBuy}</div>
              </div>
            </div>

            {/* Bottom Flow: Cultural -> Pleasure -> Gate */}
            <div className="flex items-center">
              {/* S Cultural Node */}
              <div className="min-w-[120px] p-3 text-center border-2 rounded-xl bg-blue-500/5 border-blue-500/20">
                <div className="text-[10px] uppercase tracking-wider text-blue-400 font-bold mb-1">{t.dgCult}</div>
                <div className="text-xl font-extrabold text-blue-400 dark:text-blue-200">{deferredS.sCu}</div>
                <div className="text-[9px] text-blue-400 mt-1">{t.dgCultSub}</div>
              </div>

              {/* Arrow 3 */}
              <div className="flex-1 flex flex-col items-center px-2">
                <div className="w-full bg-purple-400/50 rounded-full" style={{ height: aw(o.pleasure) }} />
                <span className="text-[9px] font-bold mt-1 text-purple-400">H3 →</span>
              </div>

              {/* O Pleasure Node */}
              <div className="min-w-[120px] p-3 text-center border-2 rounded-xl bg-cyan-500/5 border-cyan-500/20">
                <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold mb-1">{t.dgPleasure}</div>
                <div className="text-xl font-extrabold text-cyan-500 dark:text-cyan-200">{Math.round(o.pleasure)}</div>
                <div className="text-[9px] text-cyan-400 mt-1">{t.dgPleasureSub}</div>
              </div>

              {/* Arrow 4 */}
              <div className="flex-1 flex flex-col items-center px-2">
                <div className="w-full bg-purple-400/50 rounded-full" style={{ height: aw(o.pleasure * o.gate) }} />
                <span className="text-[9px] font-bold mt-1 text-purple-400">H4 →</span>
              </div>

              {/* Attitude Gate Node */}
              <div className="min-w-[120px] p-3 text-center border-2 rounded-xl bg-amber-500/5 border-amber-500/20">
                <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">{t.dgAttGate}</div>
                <div className="text-xl font-extrabold text-amber-500 dark:text-amber-200">{Math.round(o.attitude)}</div>
                <div className="text-[9px] text-amber-400 mt-1">{o.attitude < 40 ? t.dgBlocked : o.attitude > 70 ? t.dgOpen : t.dgPartial}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Outcome Bars */}
        <div className="p-5 border bg-surface border-border rounded-2xl shadow-sm">
          <h3 className="mb-4 text-xs font-bold tracking-widest uppercase text-text2">{t.simForecast}</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { l: t.ocBuy, v: o.rBuy, c: 'emerald' },
              { l: t.ocNoBuy, v: o.rNoBuy, c: 'red' },
              { l: lang === 'vi' ? "Chưa quyết định" : "Undecided", v: o.rUndecided, c: 'slate' },
              { l: t.ocArousal, v: Math.round(o.arousal), c: 'purple' },
              { l: t.ocAttitude, v: Math.round(o.attitude), c: 'amber' }
            ].map((x, i) => (
              <div key={i} className={`p-4 rounded-xl border bg-${x.c}-500/5 border-${x.c}-500/20 text-center`}>
                <div className={`text-[10px] uppercase font-bold text-${x.c}-400 mb-2`}>{x.l}</div>
                <div className={`text-2xl font-extrabold text-${x.c}-500 dark:text-${x.c}-200 mb-3`}>{x.v}%</div>
                <div className={`h-1 w-full bg-${x.c}-500/20 rounded-full overflow-hidden`}>
                  <div className={`h-full bg-${x.c}-500 transition-all duration-500`} style={{ width: `${x.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hypothesis Cards */}
        <div>
          <h3 className="mb-3 text-xs font-bold tracking-widest uppercase text-text2">{t.simHyp}</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {HYPS.map((h, i) => {
              const res = h.fn();
              const strength = Math.min(100, Math.round(res.strength));
              const inv = (h as any).inverted === true;
              return (
                <div key={i} className={`relative p-3.5 border rounded-xl bg-surface shadow-sm transition-all hover:bg-surface2 ${h.cls}`}>
                  <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-xl ${h.tag.split(' ')[0].replace('/15', '/50')}`} />
                  <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2 ${h.tag}`}>{h.label}</div>
                  <div className="text-[11px] text-text2 font-medium mb-1.5">{h.text}</div>
                  <div className="text-[10px] text-text3 mb-2">{res.note}</div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${strengthClass(strength, inv)}`}>
                    {strengthLabel(strength, inv)} · {strength}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative & Quote */}
        <div className="space-y-4">
          <div className="p-5 border bg-surface2 border-border rounded-xl shadow-sm">
            <h3 className="mb-3 text-[11px] font-bold tracking-widest uppercase text-text3">{t.simNar}</h3>
            <div className="text-xs leading-relaxed text-text2">
              {getNarrative()}
            </div>
          </div>

          <div className="p-4 border-l-4 rounded-r-xl bg-surface border-y border-r-border border-l-blue-500 shadow-sm">
            <div className="text-xs italic text-text2 leading-relaxed">
              "{activeQuote?.[0]}"
              <div className="mt-2 not-italic font-bold text-blue-400 text-[10px] uppercase tracking-wide">
                — {activeQuote?.[1]}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- FORMULAS COMPONENT ---

const FormulaBox = ({ children, label, color = 'blue' }: { children: React.ReactNode; label: string; color?: string }) => (
  <div className="mb-6">
    <div className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 bg-${color}-500/15 text-${color}-400`}>{label}</div>
    <div className={`p-4 rounded-xl bg-${color}-500/5 border border-${color}-500/20 font-mono text-sm leading-relaxed text-text overflow-x-auto`}>
      {children}
    </div>
  </div>
);

const InteractiveFormula = ({
  title,
  description,
  color = 'blue',
  inputs,
  calculate,
  formatResult = (v) => Math.round(v),
  resultLabel = 'Result',
  children,
  presets,
  visualizer
}: {
  title: string;
  description: string;
  color?: string;
  inputs: { key: string; label: string; min?: number; max?: number; def: number; step?: number }[];
  calculate: (vals: Record<string, number>) => number;
  formatResult?: (v: number) => string | number;
  resultLabel?: string;
  children?: React.ReactNode;
  presets?: { label: string; vals: Record<string, number> }[];
  visualizer?: (vals: Record<string, number>, result: number) => React.ReactNode;
}) => {
  const [vals, setVals] = useState(() => inputs.reduce((acc, i) => ({ ...acc, [i.key]: i.def }), {} as Record<string, number>));
  const result = calculate(vals);
  const c = (COLORS as any)[color] || color;

  return (
    <Card title={title} dotColor={c}>
      <p className="text-xs text-text2 leading-relaxed mb-4">{description}</p>
      {children && (
        <div className="mb-6">
          <div className={`p-3 rounded-xl bg-surface2/50 border border-border font-mono text-xs overflow-x-auto`}>
            {children}
          </div>
        </div>
      )}

      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text3 py-1.5 mr-2 self-center">Presets:</span>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => setVals(prev => ({ ...prev, ...p.vals }))}
              className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-surface2 border border-border hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface2/30 p-4 rounded-xl border border-border">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-md bg-surface border border-border"><Activity size={12} /></span>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-text3">Variables</h4>
          </div>
          {inputs.map(inp => (
            <div key={inp.key}>
              <div className="flex justify-between mb-1.5">
                <span className="text-[11px] font-medium text-text2">{inp.label}</span>
                <span className="text-xs font-mono font-bold text-text">{vals[inp.key]}</span>
              </div>
              <input
                type="range"
                min={inp.min ?? 0}
                max={inp.max ?? 100}
                step={inp.step ?? 1}
                value={vals[inp.key]}
                onChange={(e) => setVals(prev => ({ ...prev, [inp.key]: Number(e.target.value) }))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-surface2 accent-${color}-500`}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className={`flex flex-col justify-center items-center p-6 bg-surface border border-border rounded-xl relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg flex-1`}>
            <div className={`absolute inset-0 bg-${color}-500/5`}></div>
            <div className="text-[10px] font-bold uppercase text-text3 mb-2 z-10">{resultLabel}</div>
            <div className={`text-5xl font-black text-${color}-500 transition-all duration-300 z-10`}>
              {formatResult(result)}
            </div>
            <div className="mt-4 h-2 w-full max-w-[120px] bg-border/50 rounded-full overflow-hidden z-10">
              <div className={`h-full bg-${color}-500 transition-all duration-300`} style={{ width: `${Math.min(100, Math.max(0, result))}%` }} />
            </div>
          </div>
          {visualizer && (
            <div className="p-3 bg-surface border border-border rounded-xl">
              {visualizer(vals, result)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const WeightTable = ({ rows, t }: { rows: { v: string; w: string; m: string; c?: string }[]; t: any }) => (
  <div className="overflow-x-auto mt-3 mb-6">
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-border">
          <th className="py-2 text-left text-text3 font-bold uppercase tracking-wider">{t.fmVar}</th>
          <th className="py-2 text-center text-text3 font-bold uppercase tracking-wider">{t.fmWeight}</th>
          <th className="py-2 text-left text-text3 font-bold uppercase tracking-wider">{t.fmMeaning}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/30">
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-blue-500/5">
            <td className="py-2 font-mono font-medium" style={{ color: r.c || 'var(--text)' }}>{r.v}</td>
            <td className="py-2 text-center font-bold text-text2">{r.w}</td>
            <td className="py-2 text-text2">{r.m}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FormulasView = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang];
  const isVi = lang === 'vi';

  const HYPS_DATA = [
    { id: 'H1', rel: 'S_Cultural → O_Arousal (+)', formula: 'S_Cultural × 0.85', note: isVi ? 'Storytelling tạo hứng thú trực tiếp' : 'Storytelling directly creates excitement', color: 'blue' },
    { id: 'H2', rel: 'O_Arousal → R_Buy_Impulse (+)', formula: 'Arousal × 0.9', note: isVi ? 'Hứng thú cao → mua ngẫu hứng' : 'High arousal → impulse purchase', color: 'purple' },
    { id: 'H3', rel: 'S_Cultural → O_Pleasure (+)', formula: 'S_Cultural × 0.75 + S_Product × 0.25', note: isVi ? 'Bản sắc văn hóa tạo ký ức' : 'Cultural identity creates memories', color: 'blue' },
    { id: 'H4', rel: 'O_Pleasure → R_Buy_Volume (+)', formula: 'Pleasure × 0.85', note: isVi ? 'Cảm xúc lâu dài → mua nhiều' : 'Lasting emotion → volume purchase', color: 'purple' },
    { id: 'H5', rel: isVi ? 'O_Attitude điều tiết S→R' : 'O_Attitude moderates S→R', formula: 'gate = Attitude / 100', note: isVi ? 'BỘ LỌC: < 40 = chặn, ≥ 70 = mở' : 'GATE: < 40 = blocked, ≥ 70 = open', color: 'amber' },
    { id: 'H6', rel: 'S_Social → O_Arousal (+)', formula: 'S_Social × 0.9 × (tour ? 1.3 : 0.7)', note: isVi ? 'Tour boost: ×1.3 vs Lẻ: ×0.7' : 'Tour boost: ×1.3 vs Solo: ×0.7', color: 'blue' },
    { id: 'H7', rel: isVi ? 'S_Social × Đoàn/Lẻ' : 'S_Social × Group/Solo', formula: 'tour ? S_Social × 1.4 : S_Social × 0.5', note: isVi ? 'Bối cảnh khuếch đại hiệu ứng xã hội' : 'Context amplifies social effect', color: 'amber' },
    { id: 'H8', rel: isVi ? 'Thiếu S_Promo → O_Attitude (−) → R_NoBuy' : 'Low S_Promo → O_Attitude (−) → R_NoBuy', formula: '(100 − S_Promotion) × 0.8', note: isVi ? 'Không Storytelling/HDV → giảm niềm tin → NoBuy' : 'No Storytelling/Guide → trust drops → NoBuy', color: 'red' },
    { id: 'H9', rel: 'R_Buy → R_Recommend', formula: 'Arousal × 0.7', note: isVi ? 'Mua hàng tạo truyền miệng' : 'Purchase triggers word-of-mouth', color: 'green' },
    { id: 'H10', rel: 'Feedback Loop R → S_Social', formula: 'Arousal × 0.5 × tourFactor', note: isVi ? 'Vòng lặp phản hồi: lây lan trong đoàn' : 'Feedback loop: spreads within group', color: 'teal' },
  ];

  const SCENARIOS_TABLE = [
    { name: isVi ? 'Lý tưởng' : 'Ideal', key: 'sCu:90 sSo:80 sPr:85 oAt:80 ctx:80', buy: '~95%', noBuy: '~0%', und: '~5%' },
    { name: isVi ? 'Thiếu Story' : 'No Story', key: 'sCu:10 sSo:50 sPr:60 oAt:70 ctx:70', buy: '~27%', noBuy: '~44%', und: '~29%' },
    { name: 'Made in China', key: 'sCu:70 sSo:60 sPr:30 oAt:20 ctx:70', buy: '~14%', noBuy: '~61%', und: '~25%' },
    { name: isVi ? 'Tour đoàn' : 'Tour Group', key: 'sCu:70 sSo:90 sPr:65 oAt:70 ctx:95', buy: '~69%', noBuy: '~12%', und: '~19%' },
    { name: isVi ? 'Khách lẻ' : 'Solo', key: 'sCu:65 sSo:20 sPr:70 oAt:75 ctx:10', buy: '~64%', noBuy: '~0%', und: '~36%' },
    { name: isVi ? 'Chỉ bán sỉ' : 'Wholesale', key: 'sCu:60 sSo:50 sPr:70 oAt:65 ctx:60', buy: '~49%', noBuy: '~15%', und: '~36%' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* Header */}
      <div className="text-center space-y-2 py-5">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
          {t.fmTitle}
        </h2>
        <p className="text-text2 font-medium text-sm">{t.fmSub}</p>
      </div>

      {/* Section 1: Overview */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Activity size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.fmOverview}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="p-5 border bg-surface border-border rounded-2xl shadow-sm mb-4">
          <p className="text-xs text-text2 leading-relaxed mb-5">{t.fmOverviewDesc}</p>
          <div className="flex items-center justify-center gap-3 flex-wrap text-xs font-bold">
            <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">S — Stimulus</span>
            <ArrowRight size={16} className="text-text3" />
            <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">O — Organism</span>
            <ArrowRight size={16} className="text-text3" />
            <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">R — Response</span>
            <span className="text-text3 mx-1">|</span>
            <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 border-dashed">C — Context (moderator)</span>
          </div>
        </div>
        <ESORCDiagram />
      </section>

      {/* Section 2: Organism Formulas */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><BrainCircuit size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.fmOrganism}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Attitude */}
        <InteractiveFormula
          title={t.fmAttTitle}
          description={t.fmAttDesc}
          color="amber"
          resultLabel={isVi ? "Kết quả Attitude" : "Attitude Score"}
          inputs={[
            { key: 'O_Attitude', label: 'Niềm tin (O)', def: 60 },
            { key: 'S_Price', label: 'Minh bạch giá (S)', def: 50 },
            { key: 'S_Product', label: 'Sản phẩm (S)', def: 70 },
            { key: 'S_Promo', label: 'Story/HDV (S)', def: 40 },
          ]}
          calculate={(v) => Math.min(100, v.O_Attitude * 0.5 + v.S_Price * 0.25 + v.S_Product * 0.1 + v.S_Promo * 0.15)}
          presets={[
            { label: "High Trust", vals: { O_Attitude: 90, S_Price: 80, S_Product: 80, S_Promo: 80 } },
            { label: "Made in China", vals: { O_Attitude: 20, S_Price: 40, S_Product: 30, S_Promo: 20 } },
            { label: "Price Chaos", vals: { O_Attitude: 50, S_Price: 10, S_Product: 60, S_Promo: 40 } },
          ]}
          visualizer={(vals, res) => (
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-bold text-text3 uppercase">
                <span>Gate Status</span>
                <span className={res >= 70 ? 'text-emerald-500' : res >= 40 ? 'text-amber-500' : 'text-red-500'}>
                  {res >= 70 ? 'OPEN' : res >= 40 ? 'PARTIAL' : 'BLOCKED'}
                </span>
              </div>
              <div className="relative h-6 bg-surface2 rounded overflow-hidden flex text-[8px] font-bold text-white/50">
                <div className="w-[40%] bg-red-500/20 border-r border-red-500/30 flex items-center justify-center text-red-500">BLOCKED (&lt;40)</div>
                <div className="w-[30%] bg-amber-500/20 border-r border-amber-500/30 flex items-center justify-center text-amber-500">PARTIAL</div>
                <div className="w-[30%] bg-emerald-500/20 flex items-center justify-center text-emerald-500">OPEN (&gt;70)</div>
                <div className="absolute top-0 bottom-0 w-1 bg-text shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-300 z-10" style={{ left: `${res}%` }} />
              </div>
              <div className="text-[10px] text-text3 italic">
                {res < 40
                  ? (isVi ? "Thái độ < 40: Chặn đứng mọi hành vi mua." : "Attitude < 40: Completely blocks buying behavior.")
                  : res < 70
                    ? (isVi ? "Thái độ " + Math.round(res) + ": Mua bán diễn ra nhưng dè dặt." : "Attitude " + Math.round(res) + ": Buying occurs but hesitantly.")
                    : (isVi ? "Thái độ ≥ 70: Cánh cửa mở hoàn toàn." : "Attitude ≥ 70: Gate fully open.")}
              </div>
            </div>
          )}
        >
          <span className="text-amber-400">Attitude</span> = min(100, <span className="text-blue-400">O_Attitude</span> × <span className="font-bold text-amber-300">0.5</span> + <span className="text-blue-400">S_Price</span> × <span className="font-bold text-amber-300">0.25</span> + <span className="text-blue-400">S_Product</span> × <span className="font-bold text-amber-300">0.1</span> + <span className="text-blue-400">S_Promotion</span> × <span className="font-bold text-amber-300">0.15</span>)
        </InteractiveFormula>
        <div className="mt-4">
          <WeightTable t={t} rows={[
            { v: 'O_Attitude', w: '0.5 (50%)', m: isVi ? 'Niềm tin ban đầu — yếu tố chi phối chính' : 'Initial trust — primary driver', c: COLORS.amber },
            { v: 'S_Promotion', w: '0.15 (15%)', m: isVi ? 'Storytelling / HDV — xây dựng niềm tin (H8)' : 'Storytelling / Guide — builds trust (H8)', c: COLORS.blue },
            { v: 'S_Price', w: '0.25 (25%)', m: isVi ? 'Minh bạch giá — giảm nghi ngờ' : 'Price transparency — reduces doubt', c: COLORS.blue },
            { v: 'S_Product', w: '0.1 (10%)', m: isVi ? 'Đặc tính sản phẩm — hỗ trợ nhẹ' : 'Product features — minor support', c: COLORS.blue },
          ]} />
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-400 font-medium">
            <AlertTriangle size={12} className="inline mr-1.5" />{t.fmAttGate}
          </div>
        </div>

        {/* Arousal */}
        <div className="mt-8">
          <InteractiveFormula
            title={t.fmArousalTitle}
            description={t.fmArousalDesc}
            color="purple"
            resultLabel="Arousal"
            inputs={[
              { key: 'S_Cultural', label: 'Story Văn hóa', def: 80 },
              { key: 'S_Social', label: 'Hiệu ứng Xã hội', def: 70 },
              { key: 'S_Promo', label: 'HDV Kể chuyện', def: 60 },
              { key: 'S_Product', label: 'Sản phẩm Độc đáo', def: 75 },
              { key: 'isTour', label: 'Tour (0=Lẻ, 1=Đoàn)', def: 1, max: 1, step: 1 },
            ]}
            calculate={(v) => {
              const wSocial = v.isTour === 1 ? 0.45 : 0.20;
              const base = v.S_Cultural * 0.4 + v.S_Social * wSocial + v.S_Promo * 0.08 + v.S_Product * 0.12;
              return Math.min(100, base);
            }}
          >
            <span className="text-purple-400">Arousal</span> = min(100, <span className="text-blue-400">S_Cultural</span> × 0.4 + <span className="text-blue-400">S_Social</span> × <span className="font-bold text-green-400">w<sub>social</sub></span> + ...)
          </InteractiveFormula>
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20 text-xs">
                <div className="font-bold text-green-400 mb-1">w<sub>social</sub></div>
                <div className="text-text2 font-mono">= 0.45 {isVi ? '(tour đoàn)' : '(tour group)'} | 0.20 {isVi ? '(khách lẻ)' : '(solo)'}</div>
              </div>
            </div>
            <WeightTable t={t} rows={[
              { v: 'S_Cultural', w: '0.40 (40%)', m: isVi ? 'Câu chuyện văn hóa — động lực chính (H1)' : 'Cultural story — primary driver (H1)', c: COLORS.blue },
              { v: 'S_Social', w: '0.45 / 0.20', m: isVi ? 'Ảnh hưởng xã hội — ×2.25 khi tour (H6/H7)' : 'Social influence — ×2.25 for tours (H6/H7)', c: COLORS.blue },
              { v: 'S_Promotion', w: '0.08 (8%)', m: isVi ? 'Storytelling / HDV → hứng thú tức thì (OA-02)' : 'Storytelling / Guide → immediate excitement (OA-02)', c: COLORS.blue },
              { v: 'S_Product', w: '0.12 (12%)', m: isVi ? 'Đặc tính sản phẩm — tò mò khám phá' : 'Product features — curiosity', c: COLORS.blue },
            ]} />
          </div>
        </div>

        {/* Pleasure */}
        <div className="mt-8">
          <InteractiveFormula
            title={t.fmPleasureTitle}
            description={t.fmPleasureDesc}
            color="cyan"
            resultLabel="Pleasure"
            inputs={[
              { key: 'S_Product', label: 'Sản phẩm', def: 80 },
              { key: 'S_Cultural', label: 'Văn hóa', def: 70 },
              { key: 'S_Place', label: 'Không gian', def: 60 },
              { key: 'S_Social', label: 'Xã hội', def: 50 },
            ]}
            calculate={(v) => Math.min(100, v.S_Product * 0.40 + v.S_Cultural * 0.35 + v.S_Place * 0.15 + v.S_Social * 0.10)}
          >
            <span className="text-cyan-400">Pleasure</span> = min(100, <span className="text-blue-400">S_Product</span> × 0.40 + <span className="text-blue-400">S_Cultural</span> × 0.35 + ...)
          </InteractiveFormula>
          <div className="mt-4">
            <WeightTable t={t} rows={[
              { v: 'S_Product', w: '0.40 (40%)', m: isVi ? 'Đặc tính sản phẩm — ưu tiên cao nhất' : 'Product features — highest priority', c: COLORS.blue },
              { v: 'S_Cultural', w: '0.35 (35%)', m: isVi ? 'Giá trị văn hóa / bản sắc' : 'Cultural value / identity', c: COLORS.blue },
              { v: 'S_Place', w: '0.15 (15%)', m: isVi ? 'Không gian trải nghiệm' : 'Experience environment', c: COLORS.blue },
              { v: 'S_Social', w: '0.10 (10%)', m: isVi ? 'Ảnh hưởng xã hội (nhẹ hơn Arousal)' : 'Social influence (weaker than Arousal)', c: COLORS.blue },
            ]} />
          </div>
        </div>
      </section>

      {/* Section 3: Response Formulas */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500"><ShoppingCart size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.fmResponse}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-xs text-text2 leading-relaxed mb-6">{t.fmRespDesc}</p>

        {/* rawBuy */}
        <InteractiveFormula
          title={t.fmBuyTitle}
          description={t.fmRespDesc}
          color="green"
          resultLabel={isVi ? "Xác suất (Raw)" : "Raw Probability"}
          inputs={[
            { key: 'Arousal', label: 'Hứng thú (Arousal)', def: 80 },
            { key: 'Pleasure', label: 'Hài lòng (Pleasure)', def: 70 },
            { key: 'Attitude', label: 'Niềm tin (Attitude Gate)', def: 90 },
          ]}
          calculate={(v) => {
            const gate = v.Attitude / 100;
            return (v.Arousal * 0.5 + v.Pleasure * 0.35) * gate;
          }}
        >
          <span className="text-green-400">rawBuy</span> = (<span className="text-purple-400">Arousal</span> × 0.5 + <span className="text-cyan-400">Pleasure</span> × 0.35) × <span className="text-amber-400">gate</span>
          <div className="mt-2 text-text3 text-xs">{isVi ? 'gate = Attitude / 100 (bộ lọc niềm tin)' : 'gate = Attitude / 100 (trust filter)'}</div>
        </InteractiveFormula>

        {/* rawNoBuy */}
        <div className="mt-8">
          <InteractiveFormula
            title={t.fmNoBuyTitle}
            description={isVi ? "Cơ chế 'Phạt': Điểm trừ tích lũy khi các điều kiện không đạt." : "Penalty mechanism: Cumulative point deductions when conditions are not met."}
            color="red"
            resultLabel={isVi ? "Điểm Phạt (NoBuy)" : "Penalty Score"}
            inputs={[
              { key: 'Attitude', label: 'Niềm tin (O_Attitude)', def: 30 },
              { key: 'S_Cultural', label: 'Văn hóa (S_Cultural)', def: 20 },
              { key: 'S_Price', label: 'Giá (S_Price)', def: 35 },
              { key: 'S_Promo', label: 'Story (S_Promo)', def: 25 },
            ]}
            calculate={(v) => {
              let penalty = 0;
              if (v.Attitude < 40) penalty += 60;
              else if (v.Attitude < 55) penalty += 25;
              else if (v.Attitude < 70) penalty += 8;

              if (v.S_Cultural < 30) penalty += 30;
              else if (v.S_Cultural < 50) penalty += 12;

              if (v.S_Price < 40) penalty += 20;
              else if (v.S_Price < 55) penalty += 5;

              if (v.S_Promo < 30) penalty += 25;
              else if (v.S_Promo < 50) penalty += 10;

              return penalty;
            }}
            presets={[
              { label: "Clean (No Penalty)", vals: { Attitude: 80, S_Cultural: 70, S_Price: 70, S_Promo: 60 } },
              { label: "Bad Attitude", vals: { Attitude: 30, S_Cultural: 70, S_Price: 70, S_Promo: 60 } },
              { label: "Worst Case", vals: { Attitude: 20, S_Cultural: 20, S_Price: 20, S_Promo: 20 } },
            ]}
            visualizer={(vals, res) => (
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold text-text3 uppercase">
                  <span>Penalty Stack</span>
                  <span className="text-red-400">Total: {res}</span>
                </div>
                <div className="flex bg-surface2 rounded overflow-hidden h-4">
                  {vals.Attitude < 40 && <div className="h-full bg-red-500 animate-in fade-in" style={{ width: `${(60 / res) * 100}%` }} title="Attitude Critical" />}
                  {vals.Attitude >= 40 && vals.Attitude < 55 && <div className="h-full bg-amber-500" style={{ width: `${(25 / res) * 100}%` }} title="Attitude Warning" />}
                  {vals.S_Cultural < 30 && <div className="h-full bg-blue-500" style={{ width: `${(30 / res) * 100}%` }} title="Cultural" />}
                  {vals.S_Price < 40 && <div className="h-full bg-purple-500" style={{ width: `${(20 / res) * 100}%` }} title="Price" />}
                  {/* Fill remainder if 0 */}
                  {res === 0 && <div className="w-full text-[8px] flex items-center justify-center text-text3 italic">No Penalty</div>}
                </div>
                <div className="text-[9px] text-text3 italic mt-1">
                  {res > 80 ? "Penalty > 80: Khách hàng bỏ đi ngay lập tức." : res > 40 ? "Penalty > 40: Khách hàng do dự rất lâu." : "Penalty thấp: Rào cản không đáng kể."}
                </div>
              </div>
            )}
          >
            <span className="text-red-400">rawNoBuy</span> = max(0, <span className="text-amber-400">penalty_attitude</span> + <span className="text-blue-400">penalty_story</span> + <span className="text-blue-400">penalty_price</span>)
          </InteractiveFormula>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left text-text3 font-bold uppercase">{t.fmCondition}</th>
                <th className="py-2 text-center text-text3 font-bold uppercase">{t.fmThreshold}</th>
                <th className="py-2 text-center text-text3 font-bold uppercase">{t.fmPenalty}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-mono">
              <tr><td className="py-2 text-amber-400">Attitude &lt; 40</td><td className="py-2 text-center font-bold text-red-400">+60</td><td className="py-2 text-center text-text3">{isVi ? 'Chặn hoàn toàn' : 'Full block'}</td></tr>
              <tr><td className="py-2 text-amber-400">Attitude &lt; 55</td><td className="py-2 text-center font-bold text-amber-400">+25</td><td className="py-2 text-center text-text3">{isVi ? 'Nghi ngờ cao' : 'High doubt'}</td></tr>
              <tr><td className="py-2 text-amber-400">Attitude &lt; 70</td><td className="py-2 text-center font-bold text-amber-300">+8</td><td className="py-2 text-center text-text3">{isVi ? 'Nhẹ' : 'Mild'}</td></tr>
              <tr><td className="py-2 text-blue-400">S_Cultural &lt; 30</td><td className="py-2 text-center font-bold text-red-400">+30</td><td className="py-2 text-center text-text3">{isVi ? 'Không hiểu giá trị' : 'No value understanding'}</td></tr>
              <tr><td className="py-2 text-blue-400">S_Cultural &lt; 50</td><td className="py-2 text-center font-bold text-amber-400">+12</td><td className="py-2 text-center text-text3">{isVi ? 'Story yếu' : 'Weak story'}</td></tr>
              <tr><td className="py-2 text-blue-400">S_Price &lt; 40</td><td className="py-2 text-center font-bold text-red-400">+20</td><td className="py-2 text-center text-text3">{isVi ? 'Giá mập mờ' : 'Price opacity'}</td></tr>
              <tr><td className="py-2 text-blue-400">S_Price &lt; 55</td><td className="py-2 text-center font-bold text-amber-300">+5</td><td className="py-2 text-center text-text3">{isVi ? 'Giá chưa rõ' : 'Price unclear'}</td></tr>
              <tr><td className="py-2 text-blue-400">S_Promo &lt; 30</td><td className="py-2 text-center font-bold text-red-400">+25</td><td className="py-2 text-center text-text3">{isVi ? 'Không Story/HDV — H8' : 'No Story/Guide — H8'}</td></tr>
              <tr><td className="py-2 text-blue-400">S_Promo &lt; 50</td><td className="py-2 text-center font-bold text-amber-400">+10</td><td className="py-2 text-center text-text3">{isVi ? 'Story yếu — H8' : 'Weak Story — H8'}</td></tr>
            </tbody>
          </table>
        </div>

        {/* rawUndecided */}
        <FormulaBox label={t.fmUndecidedTitle} color="slate">
          <span className="text-slate-300">rawUndecided</span> = max(0,{'\n'}
          {'  '}<span className="text-blue-400">{isVi ? 'thiếu_thông_tin' : 'info_deficit'}</span> + <span className="text-green-400">{isVi ? 'áp_lực_thời_gian' : 'time_pressure'}</span> + <span className="text-purple-400">{isVi ? 'thiếu_xã_hội' : 'social_deficit'}</span>)
          <div className="mt-2 text-text3 text-xs">
            {isVi ? 'infoLevel = avg(S_Cultural, S_Product, S_Price) · socialDeficit = nếu ctx < 30 VÀ S_Social < 40 → +15' : 'infoLevel = avg(S_Cultural, S_Product, S_Price) · socialDeficit = if ctx < 30 AND S_Social < 40 → +15'}
          </div>
        </FormulaBox>

        {/* Normalization */}
        <Card title={t.fmNormTitle} dotColor={COLORS.teal} className="mt-4">
          <p className="text-xs text-text2 leading-relaxed mb-4">{t.fmNormDesc}</p>
          <FormulaBox label={isVi ? 'Chuẩn hóa' : 'Normalize'} color="teal">
            total = rawBuy + rawNoBuy + rawUndecided{'\n'}
            <span className="text-green-400">Buy%</span> = round(rawBuy / total × 100){'\n'}
            <span className="text-red-400">NoBuy%</span> = round(rawNoBuy / total × 100){'\n'}
            <span className="text-slate-300">Undecided%</span> = 100 − Buy% − NoBuy%
          </FormulaBox>
        </Card>
      </section>

      {/* Section 4: Hypotheses */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500"><Search size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.fmHypotheses}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HYPS_DATA.map((h) => (
            <div key={h.id} className={`relative p-4 border rounded-xl bg-surface shadow-sm bg-${h.color}-500/5 border-${h.color}-500/20`}>
              <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-${h.color}-500/50`} />
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-${h.color}-500/15 text-${h.color}-400`}>{h.id}</span>
                <span className="text-[11px] text-text2 font-medium">{h.rel}</span>
              </div>
              <div className="p-2 rounded-md bg-surface2/50 border border-border font-mono text-xs text-text mb-2">{h.formula}</div>
              <div className="text-[10px] text-text3">{h.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Scenarios Table */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500"><Calculator size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.fmScenarios}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-xs text-text2 mb-4">{t.fmScDesc}</p>
        <div className="overflow-x-auto bg-surface border border-border rounded-2xl shadow-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface2/50">
                <th className="py-3 px-4 text-left text-text3 font-bold uppercase">{t.fmScenario}</th>
                <th className="py-3 px-4 text-left text-text3 font-bold uppercase font-mono">{isVi ? 'Tham số chính' : 'Key Params'}</th>
                <th className="py-3 px-3 text-center text-green-400 font-bold uppercase">Buy</th>
                <th className="py-3 px-3 text-center text-red-400 font-bold uppercase">NoBuy</th>
                <th className="py-3 px-3 text-center text-slate-400 font-bold uppercase">{isVi ? 'Chưa QĐ' : 'Undecided'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {SCENARIOS_TABLE.map((sc, i) => (
                <tr key={i} className="hover:bg-blue-500/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-text">{sc.name}</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-text3">{sc.key}</td>
                  <td className="py-3 px-3 text-center font-bold text-green-400">{sc.buy}</td>
                  <td className="py-3 px-3 text-center font-bold text-red-400">{sc.noBuy}</td>
                  <td className="py-3 px-3 text-center font-bold text-slate-400">{sc.und}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-[10px] text-text3 uppercase tracking-widest opacity-50">
        E-SOR-C Formula System — Mehrabian & Russell (1974) Extended
      </div>

    </div>
  );
};

// --- INFOGRAPHIC COMPONENT ---

const InfoCard = ({ icon, title, sub, color, type = 'driver', codeCount, hypothesis, insight }: any) => (
  <div className={`relative p-5 rounded-2xl border transition-all hover:scale-[1.02] group/card ${type === 'driver'
    ? `bg-${color}-500/5 border-${color}-500/20`
    : `bg-surface border-border shadow-sm`
    }`}>
    <div className={`absolute top-0 right-0 p-3 opacity-10 text-${color}-500 transition-opacity group-hover/card:opacity-20`}>
      {/* Background Icon Watermark */}
      {React.cloneElement(icon, { size: 64, strokeWidth: 1 })}
    </div>

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}-500 text-white shadow-lg shadow-${color}-500/30`}>
          {icon}
        </div>
        {codeCount && (
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-bold text-${color}-500 bg-${color}-500/10 px-2 py-0.5 rounded-full border border-${color}-500/20`}>
              {typeof codeCount === 'number' ? `n=${codeCount}` : codeCount}
            </span>
            {hypothesis && <span className="text-[9px] font-mono text-text3 mt-1 hover:text-text cursor-help" title="Related Hypothesis">{hypothesis}</span>}
          </div>
        )}
      </div>

      <h4 className="text-sm font-bold uppercase tracking-wide mb-1 text-text">{title}</h4>
      <p className="text-xs text-text2 leading-relaxed mb-3">{sub}</p>

      {insight && (
        <div className={`mt-3 pt-3 border-t border-${color}-500/10`}>
          <p className="text-[10px] text-text2 italic leading-relaxed">
            <span className={`font-bold text-${color}-400 not-italic mr-1`}>Insight:</span>
            {insight}
          </p>
        </div>
      )}
    </div>
  </div>
);

const InfographicView = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* Header Section */}
      <div className="text-center space-y-2 py-5">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {t.igTitle}
        </h2>
        <p className="text-text2 font-medium">{t.igSub}</p>
      </div>

      {/* Journey Section (New) */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500"><Footprints size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.igJourneyTitle}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="relative px-4">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-8 left-4 right-4 h-0.5 bg-gradient-to-r from-slate-200 via-blue-200 to-green-200 dark:from-slate-800 dark:via-blue-900 dark:to-green-900 -z-10 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { icon: <MapPin size={24} />, title: t.igJ1, sub: t.igJ1Sub, color: 'slate' },
              { icon: <Zap size={24} />, title: t.igJ2, sub: t.igJ2Sub, color: 'blue' },
              { icon: <BrainCircuit size={24} />, title: t.igJ3, sub: t.igJ3Sub, color: 'purple' },
              { icon: <Users size={24} />, title: t.igJ4, sub: t.igJ4Sub, color: 'amber' },
              { icon: <Share2 size={24} />, title: t.igJ5, sub: t.igJ5Sub, color: 'green' },
            ].map((item, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-surface border-4 border-${item.color}-500/20 text-${item.color}-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-${item.color}-500 group-hover:shadow-${item.color}-500/30`}>
                  {item.icon}
                </div>
                <div className="bg-surface/80 backdrop-blur-sm px-2 py-1 rounded-xl">
                  <h4 className={`text-sm font-bold uppercase mb-1 text-${item.color}-500`}>{item.title}</h4>
                  <p className="text-xs text-text2 leading-tight font-medium">{item.sub}</p>
                </div>
                {/* Arrow for mobile */}
                {index < 4 && (
                  <div className="md:hidden mt-4 text-border">
                    <ArrowRight size={20} className="rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Numbers Section (New) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-6 px-6 bg-slate-900 text-white rounded-2xl shadow-inner">
        {[
          { l: t.igKey1, v: "12", i: <MessageCircle size={16} /> },
          { l: t.igKey2, v: "80", i: <Search size={16} /> },
          { l: t.igKey3, v: "10", i: <Lightbulb size={16} /> },
          { l: t.igKey4, v: "3", i: <Users size={16} /> },
          { l: t.igKey5, v: "6", i: <MapPin size={16} /> },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center text-center p-2">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-1">{item.v}</div>
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 flex gap-1 items-center justify-center">
              {item.i} {item.l.replace(/^\d+\s/, '')}
            </div>
          </div>
        ))}
      </div>

      {/* Drivers Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Zap size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.igDrivers}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <InfoCard
            icon={<BrainCircuit size={20} />}
            title={t.igD1}
            sub={t.igD1Sub}
            color="blue"
            codeCount={7}
            hypothesis="H1, H3"
            insight={lang === 'vi' ? "Yếu tố cốt lõi kích thích cả O_Arousal và O_Pleasure." : "Core factor stimulating both O_Arousal and O_Pleasure."}
          />
          <InfoCard
            icon={<Users size={20} />}
            title={t.igD2}
            sub={t.igD2Sub}
            color="purple"
            codeCount={5}
            hypothesis="H6, H7"
            insight={lang === 'vi' ? "Người dẫn truyện đóng vai trò khuếch đại cảm xúc (Moderator)." : "Storyteller acts as an emotional amplifier (Moderator)."}
          />
          <InfoCard
            icon={<Package size={20} />}
            title={t.igD3}
            sub={t.igD3Sub}
            color="cyan"
            codeCount={16}
            hypothesis="H3"
            insight={lang === 'vi' ? "Đặc tính 'Độc - Lạ' là điều kiện cần để tạo ra Pleasure." : "'Unique' feature is a necessary condition for Pleasure."}
          />
          <InfoCard
            icon={<MessageCircle size={20} />}
            title={t.igD4}
            sub={t.igD4Sub}
            color="amber"
            codeCount={5}
            hypothesis="H10"
            insight={lang === 'vi' ? "Hiệu ứng đám đông tạo áp lực tâm lý tích cực (FOMO)." : "Crowd effect creates positive psychological pressure (FOMO)."}
          />
          <InfoCard
            icon={<LayoutTemplate size={20} />}
            title={t.igD5}
            sub={t.igD5Sub}
            color="teal"
            codeCount={8}
            hypothesis="S_Place"
            insight={lang === 'vi' ? "Không gian trưng bày phải kể được câu chuyện văn hóa." : "Display space must tell the cultural story."}
          />
        </div>
      </section>

      {/* Deep Dive: Information Dynamics (New Section) */}
      <section className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500"><Lightbulb size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">
            {lang === 'vi' ? "Cơ chế Thông tin & Niềm tin" : "Information & Trust Dynamics"}
          </h3>
          <div className="h-px flex-1 bg-amber-500/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-2 uppercase">
              {lang === 'vi' ? "Vai trò của Thông tin (S_Promotion)" : "Role of Information (S_Promotion)"}
            </h4>
            <p className="text-xs text-text2 leading-relaxed mb-3">
              {lang === 'vi'
                ? "Thông tin không chỉ là mô tả sản phẩm, mà là 'ngòi nổ' cho cảm xúc. Thiếu thông tin (S_Promotion thấp) dẫn đến sự nghi ngờ về giá trị thực của sản phẩm."
                : "Information is not just product description, but a 'trigger' for emotion. Lack of information (low S_Promotion) leads to doubt about the product's real value."}
            </p>
            <div className="flex gap-2 text-[10px] font-mono text-text3">
              <span className="bg-surface px-2 py-1 rounded border border-border">H8: Info ↓ → Trust ↓</span>
              <span className="bg-surface px-2 py-1 rounded border border-border">OA-02: Story → Arousal</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-2 uppercase">
              {lang === 'vi' ? "Niềm tin là Bộ lọc (O_Attitude)" : "Trust as a Filter (O_Attitude)"}
            </h4>
            <p className="text-xs text-text2 leading-relaxed mb-3">
              {lang === 'vi'
                ? "Khác với các mô hình truyền thống, E-SOR-C xác định Attitude là một 'Cổng kiểm soát' (Gatekeeper). Nếu niềm tin không đủ (Attitude < 40), mọi nỗ lực marketing đều vô nghĩa."
                : "Unlike traditional models, E-SOR-C defines Attitude as a 'Gatekeeper'. If trust is insufficient (Attitude < 40), all marketing efforts are futile."}
            </p>
            <div className="flex gap-2 text-[10px] font-mono text-text3">
              <span className="bg-surface px-2 py-1 rounded border border-border">H5: Attitude Gate</span>
              <span className="bg-surface px-2 py-1 rounded border border-border">R_NoBuy: Trust Breakdown</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism & Barriers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Mechanism (The Engine) */}
        <section className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><Activity size={20} /></div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.igMechanism}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex-1 bg-surface border border-border rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />

            <div className="relative space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 group-hover:scale-110 transition-transform">1</div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-bold text-blue-400 uppercase mb-1">{t.igM1}</h4>
                    <span className="text-[9px] font-mono text-blue-500/50 border border-blue-500/20 px-1.5 rounded">H2, H6</span>
                  </div>
                  <p className="text-xs text-text2">{t.igM1Sub}</p>
                </div>
              </div>

              {/* Connector */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-border -z-0" />

              {/* Step 2 */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 group-hover:scale-110 transition-transform">2</div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-bold text-purple-400 uppercase mb-1">{t.igM2}</h4>
                    <span className="text-[9px] font-mono text-purple-500/50 border border-purple-500/20 px-1.5 rounded">H3, H4</span>
                  </div>
                  <p className="text-xs text-text2">{t.igM2Sub}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md z-10 group-hover:scale-110 transition-transform">3</div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-bold text-amber-400 uppercase mb-1">{t.igM3}</h4>
                    <span className="text-[9px] font-mono text-amber-500/50 border border-amber-500/20 px-1.5 rounded">H5 Gate</span>
                  </div>
                  <p className="text-xs text-text2">{t.igM3Sub}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-surface2/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={16} className="text-green-500" />
                <span className="text-xs font-bold uppercase text-text">{t.igContext}</span>
              </div>
              <p className="text-[11px] text-text2">
                Tour vs Solo • International vs Local • Time Pressure
              </p>
            </div>

          </div>
        </section>

        {/* Barriers (The Wall) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500"><Ban size={20} /></div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.igBarriers}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            <InfoCard
              icon={<ShieldAlert size={20} />}
              title={t.igB1}
              sub={t.igB1Sub}
              color="red"
              type="barrier"
              codeCount="28%"
              hypothesis="R_NoBuy"
              insight={lang === 'vi' ? "Rào cản lớn nhất: Mất niềm tin vào xuất xứ & giá cả." : "Biggest barrier: Loss of trust in origin & price."}
            />
            <InfoCard
              icon={<Package size={20} />}
              title={t.igB2}
              sub={t.igB2Sub}
              color="amber"
              type="barrier"
              codeCount="28%"
              hypothesis="R_NoBuy"
              insight={lang === 'vi' ? "Rào cản vật lý: Kích thước, vận chuyển, hư hỏng." : "Physical barrier: Size, transport, damage."}
            />
            <InfoCard
              icon={<Info size={20} />}
              title={t.igB3}
              sub={t.igB3Sub}
              color="slate"
              type="barrier"
              codeCount="28%"
              hypothesis="R_NoBuy"
              insight={lang === 'vi' ? "Khoảng trống thông tin: Khách không hiểu -> Không mua." : "Information gap: Don't understand -> Don't buy."}
            />
          </div>
        </section>

      </div>

      {/* Footer Note */}
      <div className="text-center text-[10px] text-text3 uppercase tracking-widest opacity-50">
        E-SOR-C Model - 2026 Research Findings
      </div>

    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [tab, setTab] = useState<'intro' | 'dashboard' | 'simulator' | 'formulas' | 'infographic'>('intro');
  const [lang, setLang] = useState<Lang>('vi');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Theme toggle effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'vi' ? 'en' : 'vi');

  const [exporting, setExporting] = useState(false);

  const exportPNG = async () => {
    setExporting(true);
    try {
      const { default: html2canvas } = await import('https://esm.sh/html2canvas@1.4.1' as any);
      const main = document.querySelector('main');
      if (!main) return;
      const canvas = await html2canvas(main as HTMLElement, {
        backgroundColor: theme === 'dark' ? '#0a0e1a' : '#f8fafc',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `esorc-dashboard-${tab}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      setExporting(false);
    }
  };

  const exportPrint = () => window.print();

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen pb-12 font-sans bg-bg text-text transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 border-b bg-bg/80 border-border backdrop-blur-xl md:px-10" role="banner">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-text transition-colors">{t.title}</h1>
          <p className="mt-1 text-[10px] md:text-xs text-text2">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Export */}
          <div className="hidden md:flex items-center gap-1 bg-surface2 p-1 rounded-lg border border-border">
            <button onClick={exportPNG} disabled={exporting} aria-label={t.exportPNG} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-surface text-text2 hover:text-text transition-all text-xs font-medium disabled:opacity-50">
              <Download size={14} /> <span className="hidden lg:inline">{t.exportPNG}</span>
            </button>
            <div className="w-px h-4 bg-border"></div>
            <button onClick={exportPrint} aria-label={t.exportPrint} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-surface text-text2 hover:text-text transition-all text-xs font-medium">
              <Printer size={14} /> <span className="hidden lg:inline">{t.exportPrint}</span>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 bg-surface2 p-1 rounded-lg border border-border">
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded-md hover:bg-surface text-text2 hover:text-text transition-all">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="w-px h-4 bg-border"></div>
            <button onClick={toggleLang} aria-label="Toggle Language" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-surface text-text2 hover:text-text transition-all text-xs font-bold">
              <Globe size={14} /> {lang.toUpperCase()}
            </button>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex gap-1 bg-surface2 p-1 rounded-lg border border-border" role="tablist">
            <button
              onClick={() => setTab('intro')}
              aria-selected={tab === 'intro'}
              role="tab"
              id="tab-intro"
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'intro' ? 'bg-green-600 text-white shadow-sm' : 'text-text3 hover:text-text2'}`}
            >
              <span className="flex items-center gap-1.5"><Info size={14} /> {t.tabIntro}</span>
            </button>
            <button
              onClick={() => setTab('dashboard')}
              aria-selected={tab === 'dashboard'}
              role="tab"
              id="tab-dashboard"
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-text3 hover:text-text2'}`}
            >
              {t.tabDashboard}
            </button>
            <button
              onClick={() => setTab('simulator')}
              aria-selected={tab === 'simulator'}
              role="tab"
              id="tab-simulator"
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'simulator' ? 'bg-purple-600 text-white shadow-sm' : 'text-text3 hover:text-text2'}`}
            >
              {t.tabSimulator}
            </button>
            <button
              onClick={() => setTab('formulas')}
              aria-selected={tab === 'formulas'}
              role="tab"
              id="tab-formulas"
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'formulas' ? 'bg-teal-600 text-white shadow-sm' : 'text-text3 hover:text-text2'}`}
            >
              <span className="flex items-center gap-1.5"><Calculator size={14} /> {t.tabFormulas}</span>
            </button>
            <button
              onClick={() => setTab('infographic')}
              aria-selected={tab === 'infographic'}
              role="tab"
              id="tab-infographic"
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'infographic' ? 'bg-pink-600 text-white shadow-sm' : 'text-text3 hover:text-text2'}`}
            >
              <span className="flex items-center gap-1.5"><LayoutTemplate size={14} /> {t.tabInfographic}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Tabs */}
      <nav className="flex md:hidden sticky top-[73px] z-40 bg-bg border-b border-border p-2 gap-2" role="tablist">
        <button onClick={() => setTab('intro')} aria-selected={tab === 'intro'} role="tab" id="tab-intro-mobile" className={`flex-1 py-2 text-xs font-bold rounded-md border ${tab === 'intro' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-surface border-border text-text3'}`}><Info size={14} className="mx-auto mb-1" />{t.tabIntro}</button>
        <button onClick={() => setTab('dashboard')} aria-selected={tab === 'dashboard'} role="tab" id="tab-dashboard-mobile" className={`flex-1 py-2 text-xs font-bold rounded-md border ${tab === 'dashboard' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-surface border-border text-text3'}`}>{t.tabDashboard}</button>
        <button onClick={() => setTab('simulator')} aria-selected={tab === 'simulator'} role="tab" id="tab-simulator-mobile" className={`flex-1 py-2 text-xs font-bold rounded-md border ${tab === 'simulator' ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-surface border-border text-text3'}`}>{t.tabSimulator}</button>
        <button onClick={() => setTab('formulas')} aria-selected={tab === 'formulas'} role="tab" id="tab-formulas-mobile" className={`flex-1 py-2 text-xs font-bold rounded-md border ${tab === 'formulas' ? 'bg-teal-500/10 border-teal-500 text-teal-400' : 'bg-surface border-border text-text3'}`}><Calculator size={14} className="mx-auto mb-1" />{t.tabFormulas}</button>
        <button onClick={() => setTab('infographic')} aria-selected={tab === 'infographic'} role="tab" id="tab-infographic-mobile" className={`flex-1 py-2 text-xs font-bold rounded-md border ${tab === 'infographic' ? 'bg-pink-500/10 border-pink-500 text-pink-400' : 'bg-surface border-border text-text3'}`}><LayoutTemplate size={14} className="mx-auto mb-1" />{t.tabInfographic}</button>
      </nav>

      <main className="max-w-[1400px] mx-auto p-5 md:p-10 relative" role="main">
        <ErrorBoundary>
          <div style={{ display: tab === 'intro' ? 'block' : 'none' }} role="tabpanel" aria-labelledby="tab-intro">
            <IntroView lang={lang} onStart={() => setTab('dashboard')} />
          </div>
          <div style={{ display: tab === 'dashboard' ? 'block' : 'none' }} role="tabpanel" aria-labelledby="tab-dashboard">
            <DashboardView lang={lang} />
          </div>
          <div style={{ display: tab === 'simulator' ? 'block' : 'none' }} role="tabpanel" aria-labelledby="tab-simulator">
            <SimulatorView lang={lang} />
          </div>
          <div style={{ display: tab === 'formulas' ? 'block' : 'none' }} role="tabpanel" aria-labelledby="tab-formulas">
            <FormulasView lang={lang} />
          </div>
          <div style={{ display: tab === 'infographic' ? 'block' : 'none' }} role="tabpanel" aria-labelledby="tab-infographic">
            <InfographicView lang={lang} />
          </div>
        </ErrorBoundary>
      </main>

      <footer className="pt-8 pb-12 mt-12 text-center border-t border-border" role="contentinfo">
        <p className="text-xs text-text3">{t.footer}</p>
      </footer>
    </div>
  );
};

export default App;
