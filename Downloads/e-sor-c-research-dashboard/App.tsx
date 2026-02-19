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
  Download, Printer, Heart,
  Users, MessageCircle, Package, MapPin, ShieldAlert, Ban, Info, LayoutTemplate,
  Calculator, Share2, Footprints, Lightbulb
} from 'lucide-react';

import uniLogo from './assets/university_logo.png';

// --- I18N DICTIONARY ---
const TRANSLATIONS = {
  vi: {
    title: "E-SOR-C Research Dashboard",
    subtitle: "Hành vi mua quà lưu niệm tại ĐBSCL — Phan Thị Thúy Phượng",
    tabDashboard: "TỔNG QUAN",
    tabSimulator: "MÔ PHỎNG",
    tabInfographic: "TRỰC QUAN",
    tabFormulas: "CÔNG THỨC",
    exportPNG: "Xuất ảnh",
    exportPrint: "In báo cáo",

    // Infographic
    igTitle: "Tóm Tắt Trực Quan Mô Hình E-SOR-C",
    igSub: "Bản đồ hành trình tâm lý khách hàng tại ĐBSCL",
    igDrivers: "5 Yếu tố Thúc đẩy Mua hàng",
    igBarriers: "3 Rào cản Ngăn Mua hàng",
    igMechanism: "Cơ chế Tâm lý",
    igContext: "Bối cảnh Quyết định",
    igJourneyTitle: "Hành trình Thực tế của Khách",
    igJ1: "Tiếp cận",
    igJ1Sub: "Bước vào không gian trưng bày đậm chất địa phương",
    igJ2: "Kích thích",
    igJ2Sub: "Bắt gặp câu chuyện văn hóa và sự độc đáo",
    igJ3: "Cảm xúc",
    igJ3Sub: "Hứng thú dâng trào, niềm vui xuất hiện",
    igJ4: "Bối cảnh",
    igJ4Sub: "Hướng dẫn viên giới thiệu, người xung quanh xúm vào",
    igJ5: "Hành động",
    igJ5Sub: "Mua ngay và chia sẻ với bạn bè",
    igKeyTitle: "Dữ liệu Nghiên cứu",
    igKey1: "12 Phỏng vấn sâu",
    igKey2: "80 Mã hóa mở",
    igKey3: "10 Giả thuyết",
    igKey4: "3 Nhóm đối tượng",
    igKey5: "6 Tỉnh ĐBSCL",

    igD1: "Kể chuyện",
    igD1Sub: "Câu chuyện văn hóa là linh hồn. Không có câu chuyện = Không có giá trị.",
    igD2: "Hướng dẫn viên",
    igD2Sub: "HDV là chìa khóa mở lòng tin và kích hoạt hành vi mua.",
    igD3: "Bản sắc địa phương",
    igD3Sub: "Sản phẩm phải thể hiện rõ ràng nét đặc trưng của vùng đất.",
    igD4: "Sức lan truyền",
    igD4Sub: "Thấy người khác mua → sợ bỏ lỡ → mua theo.",
    igD5: "Không gian trưng bày",
    igD5Sub: "Trưng bày phải gây ấn tượng ngay từ cái nhìn đầu tiên.",

    igB1: "Mất niềm tin",
    igB1Sub: "Hàng Trung Quốc, giá loạn = chặn đứng mọi giao dịch.",
    igB2: "Khó vận chuyển",
    igB2Sub: "Sợ hải quan, sợ hư hỏng, sợ cồng kềnh.",
    igB3: "Thiếu thông tin",
    igB3Sub: "Không hiểu món này là gì thì sao dám mua?",

    igM1: "Hứng thú tức thì",
    igM1Sub: "Tò mò, phấn khích → mua ngay",
    igM2: "Niềm vui lâu dài",
    igM2Sub: "Ký ức, quà tặng → mua nhiều",
    igM3: "Thái độ & niềm tin",
    igM3Sub: "Bộ lọc cuối cùng → quyết định",

    // Formulas
    fmTitle: "Hệ Thống Công Thức Mô Phỏng E-SOR-C",
    fmSub: "Cơ sở toán học cho mô hình dự báo hành vi mua quà lưu niệm",
    fmOverview: "Tổng quan mô hình",
    fmOverviewDesc: "Mô hình E-SOR-C mở rộng khung lý thuyết S-O-R (Mehrabian & Russell, 1974) bằng cách bổ sung biến Bối cảnh [C] — loại hình du lịch, thời gian tiếp xúc — tạo thành chuỗi: Kích thích → Cảm xúc → Phản ứng, được điều tiết bởi Bối cảnh.",
    fmOrganism: "Tầng Cảm xúc [O] — 3 công thức cốt lõi",
    fmAttTitle: "Thái độ — Bộ lọc niềm tin (Giả thuyết H5)",
    fmAttDesc: "Thái độ đóng vai trò BỘ LỌC: khi điểm niềm tin < 40, mọi kích thích bên ngoài đều bị chặn — khách từ chối mua bất kể sản phẩm hấp dẫn đến đâu.",
    fmAttGate: "Niềm tin < 40 → CHẶN (cổng ≈ 0) · Niềm tin ≥ 70 → MỞ hoàn toàn",
    fmArousalTitle: "Hứng thú tức thì — Phản ứng cảm xúc ngay lập tức",
    fmArousalDesc: "Phản ứng cảm xúc tức thì, thúc đẩy mua sắm ngẫu hứng. Ảnh hưởng xã hội được khuếch đại gấp 2.25× trong bối cảnh tour đoàn so với khách lẻ.",
    fmPleasureTitle: "Niềm vui lâu dài — Cảm xúc bền vững",
    fmPleasureDesc: "Tạo \"giá trị ký ức\" — cảm xúc bền vững hơn hứng thú tức thì, thúc đẩy mua số lượng lớn và mua quà tặng.",
    fmResponse: "Tầng Phản ứng [R] — Xác suất 3 chiều",
    fmRespDesc: "Ba xác suất Mua / Không mua / Chưa quyết định luôn chuẩn hóa tổng = 100%. Trạng thái chưa quyết định được mô hình hóa dựa trên mức thông tin, thời gian tiếp xúc, và thiếu hụt áp lực xã hội.",
    fmBuyTitle: "Điểm mua thô — Xuất phát điểm",
    fmNoBuyTitle: "Điểm phạt từ chối — Các rào cản",
    fmUndecidedTitle: "Chưa quyết định — Trạng thái lưỡng lự",
    fmNormTitle: "Chuẩn hóa 3 chiều",
    fmNormDesc: "Tất cả điểm thô được chia cho tổng → luôn = 100%. Tránh tình trạng Mua + Không mua < 100% với phần dư không giải thích được.",
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
    stStim: "Yếu tố Kích thích [S]",
    stStimSub: "55% tổng mã · 6 nhóm biến",
    stOrg: "Phản ứng Cảm xúc [O]",
    stOrgSub: "23% tổng mã · 3 lớp chức năng",
    stResp: "Hành vi Mua hàng [R]",
    stRespSub: "23% tổng mã · Mua = Không mua",

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
    nbPractical: "Khó vận chuyển",
    nbGap: "Thiếu thông tin",
    nbStruct: "Rào cản cấu trúc",
    nbTrustDesc: "Hàng Trung Quốc · Không chứng minh được xuất xứ · Giá không đồng nhất giữa các điểm bán",
    nbPracticalDesc: "Vận chuyển khó (tranh gạo dễ vỡ) · Lo ngại hải quan · Kích thước/trọng lượng không phù hợp",
    nbGapDesc: "Không ai kể chuyện sản phẩm · Khách không hiểu giá trị · Thiếu thông tin nguồn gốc",
    nbStructDesc: "Chỉ bán sỉ, không bán lẻ · Kênh phân phối hạn chế · Không tiếp cận được khách du lịch",
    nbNote: "Hàng Trung Quốc · Giá không đồng nhất",

    // Simulator
    simQuick: "⚡ Kịch bản nhanh",
    simAdjust: "🎛️ Điều chỉnh biến số",
    simFlow: "🔄 Luồng kích hoạt S → O → R (thời gian thực)",
    simForecast: "📊 Kết quả dự báo",
    simHyp: "🔬 Trạng thái 10 Giả thuyết",
    simNar: "📝 Diễn giải kịch bản",

    // Scenarios
    scIdeal: "🌟 Lý tưởng",
    scNoStory: "📭 Thiếu câu chuyện",
    scChina: "🚫 Hàng Trung Quốc",
    scTour: "🚌 Tour đoàn",
    scSolo: "🎒 Khách lẻ",
    scB2B: "🏢 Chỉ bán sỉ",

    // Sliders
    slStory: "Câu chuyện văn hóa",
    slSocial: "Ảnh hưởng xã hội (HDV)",
    slProduct: "Chất lượng sản phẩm",
    slPlace: "Không gian trưng bày",
    slPrice: "Minh bạch giá cả",
    slPromo: "Kể chuyện quảng bá",
    slAtt: "Niềm tin ban đầu",
    slCtx: "Bối cảnh (0=Đi lẻ, 100=Đi đoàn)",
    slTime: "Thời gian tiếp xúc (phút)",

    // Diagram / Flow
    dgStim: "Kích thích",
    dgStimSub: "điểm kích thích trung bình",
    dgArousal: "Hứng thú tức thì",
    dgArousalSub: "Mức độ hứng thú",
    dgGate: "Cổng niềm tin (H5)",
    dgGateBlocked: "BỊ CHẶN",
    dgGateOpen: "MỞ",
    dgGatePartial: "MỞ MỘT PHẦN",
    dgBuy: "Xác suất Mua",
    dgNoBuy: "Xác suất Không mua",
    dgProbBuy: "Xác suất mua",
    dgProbNoBuy: "Xác suất không mua",
    dgCult: "Văn hóa",
    dgCultSub: "Câu chuyện văn hóa",
    dgPleasure: "Niềm vui lâu dài",
    dgPleasureSub: "Cảm xúc bền vững",
    dgAttGate: "Cổng niềm tin",
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
    narTrustDesc: "Bộ lọc niềm tin đang chặn mọi kích thích bên ngoài. Cần minh bạch giá và chứng minh xuất xứ.",
    narGap: "Thiếu câu chuyện sản phẩm.",
    narGapDesc: "Khách không hiểu giá trị sản phẩm nên mức độ hứng thú thấp. Cần kể chuyện văn hóa.",
    narTour: "Hiệu ứng đoàn tour.",
    narTourDesc: "HDV kích hoạt tâm lý sợ bỏ lỡ mạnh mẽ. Hiệu ứng lan truyền trong đoàn hoạt động tốt.",
    narSolo: "Khách lẻ tự túc.",
    narSoloDesc: "Không có HDV → ảnh hưởng xã hội yếu. Quyết định phụ thuộc vào câu chuyện văn hóa và chất lượng sản phẩm.",
    narBal: "Kịch bản cân bằng.",
    narBalDesc: "Kết quả phụ thuộc vào sự điều chỉnh tinh tế của từng biến số.",



    // Codebook tab
    tabCodebook: "MÃ HÓA",
    cbTitle: "Bảng Mã Hóa Đầy Đủ — 80 Mã S-O-R",
    cbSub: "Nguồn gốc từng biến số trong mô hình E-SOR-C · Dựa trên 12 phỏng vấn sâu · 3 nhóm đối tượng",
    cbSearch: "Tìm kiếm mã hoặc chủ đề...",
    cbFilterAll: "Tất cả",
    cbCode: "Mã",
    cbGroup: "Nhóm",
    cbTopic: "Chủ đề",
    cbDefinition: "Định nghĩa & Chỉ báo nhận diện",
    cbSource: "Nguồn PV",
    cbTotal: "tổng số mã",
    cbGroupS: "[S] Kích thích",
    cbGroupO: "[O] Cảm xúc",
    cbGroupR: "[R] Hành vi",
    cbSubProduct: "S_Product — Đặc điểm sản phẩm",
    cbSubPrice: "S_Price — Giá cả & Giá trị cảm nhận",
    cbSubPlace: "S_Place — Không gian & Kênh phân phối",
    cbSubPromo: "S_Promotion — Xúc tiến & Truyền thông",
    cbSubSocial: "S_Social — Ảnh hưởng xã hội",
    cbSubCultural: "S_Cultural — Yếu tố văn hóa địa phương",
    cbSubPleasure: "O_Pleasure — Cảm xúc dương tính",
    cbSubArousal: "O_Arousal — Kích thích & Hứng thú",
    cbSubAttitude: "O_Attitude — Thái độ & Nhận thức",
    cbSubBuy: "R_Buy — Hành vi mua",
    cbSubNoBuy: "R_NoBuy — Hành vi không mua",
    cbSubRecommend: "R_Recommend — Giới thiệu & Tái mua",

    // Intro tab
    tabIntro: "GIỚI THIỆU",
    inHero: "Tại sao có người mua, có người không?",
    inHeroSub: "Nghiên cứu 12 phỏng vấn sâu tại 6 tỉnh ĐBSCL tìm ra câu trả lời.",
    inHeroDesc: "Hai du khách cùng đứng trước một sản phẩm — một người móc ví ngay, người kia lắc đầu bỏ đi. Điều gì tạo ra sự khác biệt đó? Mô hình E-SOR-C giải thích cơ chế tâm lý đằng sau quyết định mua quà lưu\u00A0niệm.",
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

    // Infographic redesign extras
    igFlowTitle: "Luồng quyết định mua hàng",
    igFlowSub: "Từ kích thích bên ngoài đến hành động cuối cùng",
    igFlowS: "Kích thích",
    igFlowSDesc: "Câu chuyện · Sản phẩm · Không gian · Giá cả",
    igFlowO: "Cảm xúc",
    igFlowODesc: "Hứng thú · Niềm vui · Niềm tin",
    igFlowGate: "Cổng niềm tin",
    igFlowGateDesc: "Niềm tin < 40 → chặn hoàn toàn",
    igFlowR: "Hành động",
    igFlowBuy: "Mua",
    igFlowNoBuy: "Không mua",
    igFlowUndecided: "Chưa quyết định",
    igAmplTitle: "Phát hiện độc đáo",
    igAmplStat: "×2,25",
    igAmplDesc: "Tour đoàn khuếch đại hiệu ứng xã hội gấp 2,25 lần so với khách đi lẻ",
    igAmplDetail: "Chỉ cần 5–7 người dừng lại → cả đoàn xúm vào",
    igTrustTitle: "Câu chuyện là chìa khóa",
    igTrustStat: "55%",
    igTrustDesc: "số mã hóa thuộc nhóm kích thích — câu chuyện văn hóa dẫn đầu",
    igTrustDetail: "\"Không phải người ta không có tiền. Người ta không biết cái đó là gì.\"",
    igGateTitle: "Niềm tin là cánh cửa",
    igGateStat: "< 40",
    igGateDesc: "điểm niềm tin → chặn mọi nỗ lực marketing, dù sản phẩm hấp dẫn đến đâu",
    igGateDetail: "\"Nhìn thấy hàng Trung Quốc là tôi dứt khoát không mua, dù nó đẹp cỡ nào.\"",
    igContextDetail: "Tour đoàn · Khách quốc tế · Thời gian tiếp xúc",
    igInsightTitle: "3 Con số cần nhớ",

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



    // Codebook tab
    tabCodebook: "CODEBOOK",
    cbTitle: "Full Codebook — 80 S-O-R Codes",
    cbSub: "Origin of every variable in the E-SOR-C model · Based on 12 in-depth interviews · 3 respondent groups",
    cbSearch: "Search code or topic...",
    cbFilterAll: "All",
    cbCode: "Code",
    cbGroup: "Group",
    cbTopic: "Topic",
    cbDefinition: "Definition & Indicators",
    cbSource: "Source",
    cbTotal: "total codes",
    cbGroupS: "[S] Stimulus",
    cbGroupO: "[O] Organism",
    cbGroupR: "[R] Response",
    cbSubProduct: "S_Product — Product Characteristics",
    cbSubPrice: "S_Price — Price & Perceived Value",
    cbSubPlace: "S_Place — Space & Distribution",
    cbSubPromo: "S_Promotion — Promotion & Communication",
    cbSubSocial: "S_Social — Social Influence",
    cbSubCultural: "S_Cultural — Local Cultural Factors",
    cbSubPleasure: "O_Pleasure — Positive Emotion",
    cbSubArousal: "O_Arousal — Excitement & Interest",
    cbSubAttitude: "O_Attitude — Attitude & Perception",
    cbSubBuy: "R_Buy — Buying Behavior",
    cbSubNoBuy: "R_NoBuy — Non-buying Behavior",
    cbSubRecommend: "R_Recommend — Recommend & Repurchase",

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

    // Infographic redesign extras
    igFlowTitle: "Purchase Decision Flow",
    igFlowSub: "From external stimulus to final action",
    igFlowS: "Stimulus",
    igFlowSDesc: "Story · Product · Space · Price",
    igFlowO: "Organism",
    igFlowODesc: "Arousal · Pleasure · Attitude",
    igFlowGate: "Trust Gate",
    igFlowGateDesc: "Attitude < 40 → complete block",
    igFlowR: "Response",
    igFlowBuy: "Buy",
    igFlowNoBuy: "No Buy",
    igFlowUndecided: "Undecided",
    igAmplTitle: "Key Finding",
    igAmplStat: "×2.25",
    igAmplDesc: "Tour group amplifies social influence 2.25× compared to solo travelers",
    igAmplDetail: "Just 5–7 people stop to buy → the whole group joins in",
    igTrustTitle: "Story is the Key",
    igTrustStat: "55%",
    igTrustDesc: "of all codes belong to stimulus — cultural storytelling leads",
    igTrustDetail: "\"It's not that they don't have money. They don't know what it is.\"",
    igGateTitle: "Trust is the Door",
    igGateStat: "< 40",
    igGateDesc: "trust score → blocks all marketing effort, no matter how attractive the product",
    igGateDetail: "\"The moment I see it's made in China, I put it down. No matter how pretty.\"",
    igContextDetail: "Tour group · International visitors · Contact time",
    igInsightTitle: "3 Numbers to Remember",

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
  // ViewBox: 1200 × 640. Three zones: S(10–255), O(265–785), R(795–1110). Bottom row: H8 note + O_Attitude + [C] Context
  // x/y helpers map SVG coords → % for HTML node positioning
  const xp = (v: number) => `${(v / 1200) * 100}%`;
  const yp = (v: number) => `${(v / 640) * 100}%`;

  const Node = ({ l, t, w, h, bg, border, title, sub, titleColor, subColor, dashed = false }: any) => {
    const isHexBg = bg.startsWith('#');
    const isHexBorder = border.startsWith('#');
    return (
      <div
        className={`absolute z-20 flex flex-col items-center justify-center rounded-xl border-2 shadow-sm transition-transform hover:scale-105 ${dashed ? 'border-dashed' : ''} ${!isHexBg ? bg : ''} ${!isHexBorder ? border : ''}`}
        style={{
          left: xp(l), top: yp(t), width: xp(w), height: yp(h),
          backgroundColor: isHexBg ? bg : undefined,
          borderColor: isHexBorder ? border : undefined,
        }}
      >
        <div className={`font-bold text-sm sm:text-base text-center leading-tight px-2 ${titleColor}`} style={{ color: titleColor.startsWith('#') ? titleColor : undefined }}>{title}</div>
        <div className={`text-[9px] sm:text-[11px] text-center mt-1 leading-tight px-2 ${subColor}`} style={{ color: subColor.startsWith('#') ? subColor : undefined }}>{sub}</div>
      </div>
    );
  };

  return (
    <div className="relative w-full select-none bg-surface2/30 rounded-xl border border-border overflow-hidden" style={{ aspectRatio: '1200/640', minHeight: 420 }}>
      {/* ── SVG: background zones + all connectors ── */}
      <svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full z-[5] pointer-events-none">
        <defs>
          <marker id="arr-pu"  markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#a855f7"/></marker>
          <marker id="arr-cy"  markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#06b6d4"/></marker>
          <marker id="arr-gr"  markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/></marker>
          <marker id="arr-am"  markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker>
          <marker id="arr-re"  markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/></marker>
          <marker id="arr-te"  markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#14b8a6"/></marker>
          <marker id="arr-sl"  markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker>
        </defs>

        {/* ── Zone backgrounds ── */}
        {/* S zone: x 10–255, full height minus bottom row */}
        <rect x="10"  y="25" width="245" height="440" rx="14" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,4" opacity="0.4"/>
        <text x="132" y="47" textAnchor="middle" fill="#60a5fa" fontWeight="800" fontSize="13" letterSpacing="2">STIMULUS [S]</text>

        {/* O zone: x 265–785, full height minus bottom row */}
        <rect x="265" y="25" width="520" height="440" rx="14" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,4" opacity="0.4"/>
        <text x="525" y="47" textAnchor="middle" fill="#c084fc" fontWeight="800" fontSize="13" letterSpacing="2">ORGANISM [O]</text>

        {/* R zone: x 795–1110 */}
        <rect x="795" y="25" width="315" height="440" rx="14" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="5,4" opacity="0.4"/>
        <text x="952" y="47" textAnchor="middle" fill="#4ade80" fontWeight="800" fontSize="13" letterSpacing="2">RESPONSE [R]</text>

        {/* ── Bottom row separator label ── */}
        <text x="600" y="488" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic" opacity="0.7">Moderators &amp; context</text>
        <line x1="10" y1="477" x2="1190" y2="477" stroke="#334155" strokeWidth="1" strokeDasharray="3,4" opacity="0.5"/>

        {/* ══════════════════════════════════════════
            S → O  connections
        ══════════════════════════════════════════ */}

        {/* S_Product → O_Arousal (no label, faint) */}
        <path d="M255,100 C310,100 310,110 380,110" fill="none" stroke="#a855f7" strokeWidth="1.8" markerEnd="url(#arr-pu)" opacity="0.4"/>

        {/* S_Social → O_Arousal  H6 */}
        <path d="M255,200 C310,200 310,115 380,115" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arr-pu)" opacity="0.75"/>
        <rect x="258" y="147" width="30" height="18" rx="3" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5"/>
        <text x="273" y="160" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="700">H6</text>

        {/* S_Cultural → O_Arousal  H1 */}
        <path d="M255,300 C310,300 310,120 380,120" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arr-pu)" opacity="0.75"/>
        <rect x="258" y="240" width="30" height="18" rx="3" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5"/>
        <text x="273" y="253" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="700">H1</text>

        {/* S_Cultural → O_Pleasure  H3 */}
        <path d="M255,300 C310,300 310,230 380,230" fill="none" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arr-cy)" opacity="0.75"/>
        <rect x="278" y="278" width="30" height="18" rx="3" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5"/>
        <text x="293" y="291" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="700">H3</text>

        {/* S_Place/Price → O_Arousal (faint atmospheric) */}
        <path d="M255,400 C310,400 310,130 380,130" fill="none" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arr-pu)" opacity="0.3"/>

        {/* ══════════════════════════════════════════
            H8: Thiếu câu chuyện → O_Attitude giảm
            Path: S_Cultural right edge → RIGHT side, down to O_Attitude
            Keeps entirely to the RIGHT of S zone so nothing is covered
        ══════════════════════════════════════════ */}
        <path d="M255,300 L255,540 L430,540 L430,530" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="6,3" markerEnd="url(#arr-am)" opacity="0.8"/>
        {/* H8 label floats at right-edge of S zone, below S_Cultural */}
        <rect x="258" y="355" width="90" height="40" rx="5" fill="#1c1003" stroke="#f59e0b" strokeWidth="1.5" opacity="0.95"/>
        <text x="303" y="371" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="700">H8</text>
        <text x="303" y="385" textAnchor="middle" fill="#fbbf24" fontSize="9" fontStyle="italic">Thiếu story → Att.↓</text>

        {/* ══════════════════════════════════════════
            O → R  connections
        ══════════════════════════════════════════ */}

        {/* O_Arousal → R_Buy  H2 */}
        <path d="M580,110 L795,105" fill="none" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arr-gr)"/>
        <rect x="666" y="95" width="32" height="20" rx="4" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5"/>
        <text x="682" y="109" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="700">H2</text>

        {/* O_Pleasure → R_Buy  H4 */}
        <path d="M580,230 L795,120" fill="none" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arr-gr)"/>
        <rect x="666" y="163" width="32" height="20" rx="4" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5"/>
        <text x="682" y="177" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="700">H4</text>

        {/* ══════════════════════════════════════════
            H5: O_Attitude (bottom row) → R_NoBuy
            Clear straight diagonal, label above the line
        ══════════════════════════════════════════ */}
        <path d="M580,515 L795,260" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="6,4" markerEnd="url(#arr-re)" opacity="0.9"/>
        <rect x="644" y="370" width="90" height="20" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5"/>
        <text x="689" y="384" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700">H5 · Gate→Block</text>

        {/* ══════════════════════════════════════════
            H7: [C] Context (bottom row) modulates H6
            Dashed vertical from [C] Context up to arrow intersection
            × symbol at intersection point on S_Social→O_Arousal path
        ══════════════════════════════════════════ */}
        {/* [C] Context centre ≈ x=720, y=515. H6 path passes near x=305,y=155 */}
        <path d="M720,495 L720,155" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7"/>
        <circle cx="720" cy="155" r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5"/>
        <text x="720" y="159" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="800">×</text>
        <rect x="694" y="300" width="52" height="34" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" opacity="0.9"/>
        <text x="720" y="314" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="700">H7</text>
        <text x="720" y="328" textAnchor="middle" fill="#94a3b8" fontSize="9">Tour ×2.25</text>

        {/* ══════════════════════════════════════════
            H9: R_Buy → R_Recommend  (right bracket)
        ══════════════════════════════════════════ */}
        <path d="M1110,105 L1140,105 L1140,390 L1110,390" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr-te)"/>
        <rect x="1118" y="235" width="34" height="18" rx="4" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5"/>
        <text x="1135" y="248" textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="700">H9</text>

        {/* ══════════════════════════════════════════
            H10: R_Recommend → S_Social  (top feedback arc)
            Visible cyan-gray dashed arc along very top
        ══════════════════════════════════════════ */}
        <path d="M952,370 L952,14 L132,14 L132,58" fill="none" stroke="#64748b" strokeWidth="1.8" strokeDasharray="7,4" markerEnd="url(#arr-sl)" opacity="0.75"/>
        <rect x="420" y="3" width="264" height="19" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
        <text x="552" y="16" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">H10: R_Recommend → S_Social (vòng lặp)</text>
      </svg>

      {/* ── HTML Nodes ── */}

      {/* S column — 4 nodes, evenly spaced top area */}
      <Node l={18}  t={58}  w={237} h={72} bg="bg-surface dark:bg-[#0f172a]" border="border-blue-500" title="S_Product"    titleColor="text-blue-300"  sub="Đặc điểm sản phẩm · 16 mã"     subColor="text-blue-500"/>
      <Node l={18}  t={158} w={237} h={72} bg="bg-surface dark:bg-[#0f172a]" border="border-blue-500" title="S_Social"     titleColor="text-blue-300"  sub="Ảnh hưởng xã hội · 5 mã"       subColor="text-blue-500"/>
      <Node l={18}  t={258} w={237} h={72} bg="bg-surface dark:bg-[#0f172a]" border="border-blue-500" title="S_Cultural"   titleColor="text-blue-300"  sub="Bản sắc văn hóa · 7 mã"        subColor="text-blue-500"/>
      <Node l={18}  t={358} w={237} h={72} bg="bg-surface dark:bg-[#0f172a]" border="border-blue-500" title="S_Place/Price" titleColor="text-blue-300" sub="Không gian · Giá · Promo"        subColor="text-blue-500"/>

      {/* O column — Arousal + Pleasure (top), Attitude moved to BOTTOM ROW */}
      <Node l={380} t={68}  w={200} h={72} bg="#2e1065" border="#a855f7" title="O_Arousal"  titleColor="#e9d5ff" sub="Hứng thú tức thì"    subColor="#c084fc"/>
      <Node l={380} t={188} w={200} h={72} bg="#083344" border="#06b6d4" title="O_Pleasure" titleColor="#a5f3fc" sub="Cảm xúc lâu dài"     subColor="#67e8f9"/>

      {/* O_Attitude — bottom row, left of [C] Context */}
      <Node l={280} t={490} w={220} h={72} bg="#431407" border="#f59e0b" dashed={true} title="O_Attitude" titleColor="#fdba74" sub="BỘ LỌC / CỔNG NIỀM TIN"   subColor="#fb923c"/>

      {/* [C] Context — bottom row, centre */}
      <Node l={560} t={490} w={210} h={72} bg="bg-surface dark:bg-[#0f172a]" border="#64748b" dashed={true} title="[C] Context" titleColor="text-text2" sub="Tour đoàn / Đi lẻ · Thời gian" subColor="text-text3"/>

      {/* R column — 3 nodes */}
      <Node l={800} t={68}  w={225} h={72} bg="#052e16" border="#22c55e" title="R_Buy"       titleColor="#86efac" sub="Mua xung · Mua nhiều · Lan truyền" subColor="#4ade80"/>
      <Node l={800} t={218} w={225} h={72} bg="#450a0a" border="#ef4444" title="R_NoBuy"     titleColor="#fca5a5" sub="Mất tin · Khó vận chuyển · Không rõ" subColor="#f87171"/>
      <Node l={800} t={368} w={225} h={72} bg="#042f2e" border="#14b8a6" title="R_Recommend" titleColor="#5eead4" sub="SNS · WOM · Khách quay lại"          subColor="#2dd4bf"/>
    </div>
  );
};


// --- MODEL EXPLAINER ---

// Small H-badge chip, same visual as diagram labels
const HBadge = ({ id, color }: { id: string; color: string }) => (
  <span className={`inline-flex items-center justify-center text-[9px] font-extrabold px-1.5 py-0.5 rounded leading-none ${color}`}>
    {id}
  </span>
);

const ModelExplainer = ({ lang }: { lang: Lang }) => {
  const isVi = lang === 'vi';

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 border-b border-border flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0"><Lightbulb size={18} /></div>
        <div>
          <h2 className="text-sm font-extrabold tracking-widest uppercase text-text">
            {isVi ? 'Đọc mô hình trong 60 giây' : 'Read the Model in 60 Seconds'}
          </h2>
          <p className="text-[11px] text-text3 mt-0.5">
            {isVi ? 'Minimap của sơ đồ E-SOR-C · màu sắc đồng nhất · giả thuyết đúng chỗ' : 'Minimap of the E-SOR-C diagram · matching colors · hypotheses in place'}
          </p>
        </div>
      </div>

      <div className="p-5 lg:p-6">
        {/* ═══════════════════════════════════════════════════════
            LAYOUT: flow column (left) + callout column (right)
        ════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* ── LEFT: vertical S → O → R flow ── */}
          <div className="flex-1 min-w-0">

            {/* ── [S] Stimulus ── */}
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[18px] font-black text-blue-300 leading-none w-6 shrink-0">[S]</span>
                <span className="text-[13px] font-extrabold text-blue-200">
                  {isVi ? 'Kích thích từ bên ngoài' : 'External Stimulus'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: isVi ? 'Câu chuyện HDV' : 'Guide story',       sub: isVi ? 'S_Cultural · H1 H3' : 'S_Cultural · H1 H3',    hs: [{ id:'H1', c:'bg-purple-500/20 text-purple-300' },{ id:'H3', c:'bg-cyan-500/20 text-cyan-300' }] },
                  { name: isVi ? 'Ảnh hưởng đoàn' : 'Social influence', sub: isVi ? 'S_Social · H6' : 'S_Social · H6',              hs: [{ id:'H6', c:'bg-purple-500/20 text-purple-300' }] },
                  { name: isVi ? 'Sản phẩm trưng bày' : 'Product display', sub: isVi ? 'S_Product' : 'S_Product',                  hs: [] },
                  { name: isVi ? 'Không gian · Giá' : 'Space · Price',  sub: isVi ? 'S_Place / S_Price' : 'S_Place / S_Price',      hs: [] },
                ].map(n => (
                  <div key={n.name} className="rounded-lg bg-blue-500/8 border border-blue-500/15 px-3 py-2">
                    <p className="text-[11px] font-bold text-blue-200 leading-snug">{n.name}</p>
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      <span className="text-[9px] text-blue-400/70">{n.sub.split('·')[0].trim()}</span>
                      {n.hs.map(h => <HBadge key={h.id} id={h.id} color={h.c} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Arrow S→O with H-badges ── */}
            <div className="flex items-center gap-2 py-1.5 pl-5">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-3 bg-border" />
                <div className="text-text3 text-base leading-none">↓</div>
              </div>
              <div className="flex gap-1 flex-wrap">
                <HBadge id="H1" color="bg-purple-500/20 text-purple-300" />
                <HBadge id="H3" color="bg-cyan-500/20 text-cyan-300" />
                <HBadge id="H6" color="bg-purple-500/20 text-purple-300" />
                <HBadge id="H8" color="bg-amber-500/20 text-amber-300" />
              </div>
              <span className="text-[10px] text-text3 italic">
                {isVi ? 'S_Cultural → O_Arousal / O_Attitude' : 'S_Cultural → O_Arousal / O_Attitude'}
              </span>
            </div>

            {/* ── [O] Organism ── */}
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[18px] font-black text-purple-300 leading-none w-6 shrink-0">[O]</span>
                <span className="text-[13px] font-extrabold text-purple-200">
                  {isVi ? 'Cảm xúc & bộ lọc bên trong' : 'Inner Emotions & Filter'}
                </span>
              </div>
              <div className="space-y-2">
                {/* O_Arousal + O_Pleasure side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-2.5">
                    <p className="text-[10px] font-extrabold text-purple-300 mb-0.5">O_Arousal</p>
                    <p className="text-[11px] text-text2">{isVi ? 'Hứng thú tức thì — muốn cầm lên ngay' : 'Instant excitement — urge to pick it up'}</p>
                  </div>
                  <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-2.5">
                    <p className="text-[10px] font-extrabold text-cyan-300 mb-0.5">O_Pleasure</p>
                    <p className="text-[11px] text-text2">{isVi ? 'Cảm xúc lâu dài — muốn giữ làm kỷ niệm' : 'Lasting feeling — wants to keep it'}</p>
                  </div>
                </div>
                {/* O_Attitude — gate, full width, amber */}
                <div className="rounded-lg bg-amber-500/8 border border-amber-500/25 border-dashed px-3 py-2.5 flex items-center gap-3">
                  <div className="shrink-0">
                    <p className="text-[10px] font-extrabold text-amber-300">O_Attitude</p>
                    <div className="flex gap-1 mt-0.5">
                      <HBadge id="H5" color="bg-red-500/20 text-red-300" />
                      <HBadge id="H8" color="bg-amber-500/20 text-amber-300" />
                    </div>
                  </div>
                  <div className="flex-1 border-l border-amber-500/20 pl-3">
                    <p className="text-[11px] text-amber-100/80 leading-snug">
                      {isVi
                        ? 'Niềm tin — cánh cửa duy nhất. Nếu tụt dưới ngưỡng 40 → H5 kích hoạt → chặn hoàn toàn, không mua dù giá tốt.'
                        : 'Trust — the only gate. Falls below 40 → H5 activates → total block, no buy even at a good price.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Arrow O→R with H-badges, branching ── */}
            <div className="flex items-center gap-2 py-1.5 pl-5">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-3 bg-border" />
                <div className="text-text3 text-base leading-none">↓</div>
              </div>
              <div className="flex gap-1 flex-wrap">
                <HBadge id="H2" color="bg-green-500/20 text-green-300" />
                <HBadge id="H4" color="bg-cyan-500/20 text-cyan-300" />
                <HBadge id="H5" color="bg-red-500/20 text-red-300" />
              </div>
              <span className="text-[10px] text-text3 italic">
                {isVi ? 'O_Arousal/Pleasure → R_Buy · O_Attitude↓ → R_NoBuy' : 'O_Arousal/Pleasure → R_Buy · O_Attitude↓ → R_NoBuy'}
              </span>
            </div>

            {/* ── [R] Response — 2 parallel branches ── */}
            <div className="rounded-xl border border-border bg-surface2/30 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[18px] font-black text-text2 leading-none w-6 shrink-0">[R]</span>
                <span className="text-[13px] font-extrabold text-text">
                  {isVi ? 'Hành vi — 2 nhánh song song' : 'Response — 2 parallel branches'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* R_Buy */}
                <div className="rounded-lg bg-green-500/8 border border-green-500/25 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 text-base leading-none">✅</span>
                    <p className="text-[11px] font-extrabold text-green-300">R_Buy</p>
                    <div className="flex gap-1 ml-auto">
                      <HBadge id="H2" color="bg-green-500/20 text-green-300" />
                      <HBadge id="H4" color="bg-cyan-500/20 text-cyan-300" />
                      <HBadge id="H9" color="bg-teal-500/20 text-teal-300" />
                    </div>
                  </div>
                  <p className="text-[11px] text-text2 leading-relaxed">
                    {isVi
                      ? 'Mua xung · Mua nhiều (5–10 cái) · Đăng mạng → vòng lặp H9–H10'
                      : 'Impulse buy · Buy in bulk (5–10) · Share online → H9–H10 loop'}
                  </p>
                  <p className="text-[10px] text-green-400 font-bold mt-2">~85–95% {isVi ? 'khi HDV + niềm tin ổn' : 'when guide + trust OK'}</p>
                </div>
                {/* R_NoBuy */}
                <div className="rounded-lg bg-red-500/8 border border-red-500/25 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400 text-base leading-none">❌</span>
                    <p className="text-[11px] font-extrabold text-red-300">R_NoBuy</p>
                    <div className="flex gap-1 ml-auto">
                      <HBadge id="H5" color="bg-red-500/20 text-red-300" />
                    </div>
                  </div>
                  <p className="text-[11px] text-text2 leading-relaxed">
                    {isVi
                      ? 'Cửa niềm tin đóng → rời đi · không hỏi thêm · không chia sẻ'
                      : 'Trust gate shut → walks away · no questions · no share'}
                  </p>
                  <p className="text-[10px] text-red-400 font-bold mt-2">~61% {isVi ? 'khi không có HDV / thấy Made in China' : 'no guide / sees Made in China'}</p>
                </div>
              </div>
              {/* R_Recommend */}
              <div className="mt-2 rounded-lg bg-teal-500/5 border border-teal-500/20 px-3 py-2 flex items-center gap-3">
                <div>
                  <p className="text-[10px] font-extrabold text-teal-300 flex items-center gap-1">
                    R_Recommend <HBadge id="H9" color="bg-teal-500/20 text-teal-300" /> <HBadge id="H10" color="bg-slate-500/20 text-slate-300" />
                  </p>
                </div>
                <p className="text-[11px] text-text2 border-l border-teal-500/20 pl-3">
                  {isVi ? 'Sau khi mua: đăng Facebook / kể bạn bè → tạo S_Social cho đoàn kế tiếp (vòng lặp H10)' : 'After buying: posts / tells friends → creates S_Social for next tour (H10 loop)'}
                </p>
              </div>
            </div>

            {/* ── [C] Context moderator — below, dashed border ── */}
            <div className="mt-3 rounded-xl border border-dashed border-slate-500/30 bg-slate-500/5 px-4 py-3 flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <span className="text-[15px] font-black text-slate-300">⊕ [C]</span>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-extrabold text-slate-200 mb-1">
                  {isVi ? 'Bối cảnh điều tiết — không thuộc S/O/R nhưng khuếch đại tất cả' : 'Context moderator — outside S/O/R but amplifies everything'}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="text-[11px] text-slate-300 flex items-center gap-1">
                    <HBadge id="H7" color="bg-slate-500/25 text-slate-300" />
                    {isVi ? 'Tour đoàn ×2.25 so với đi lẻ' : 'Group tour ×2.25 vs solo'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isVi ? '· Thời gian tiếp xúc · HDV có mặt hay không' : '· Contact time · Guide present or not'}
                  </span>
                </div>
              </div>
            </div>

          </div>{/* end left column */}

          {/* ── RIGHT: key insight cards (desktop sidebar) ── */}
          <div className="lg:w-64 xl:w-72 shrink-0 flex flex-col gap-4">

            {/* Insight 1 */}
            <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 mb-2">
                {isVi ? '💬 Câu chuyện > Giá cả' : '💬 Story beats price'}
              </p>
              <p className="text-[12px] text-text2 leading-relaxed mb-3">
                {isVi
                  ? 'HDV kể "Nông dân làm 3 ngày" → khách Ý với tay lấy trước khi hỏi giá. Không cần discount.'
                  : '"Farmer spends 3 days" → Italian guest reaches before asking price. No discount needed.'}
              </p>
              <blockquote className="border-l-2 border-purple-500/35 pl-2.5">
                <p className="text-[10px] text-purple-200/60 italic">{isVi ? '"Nghe kể xong là muốn mua ngay."' : '"After the story, I just wanted it."'}</p>
              </blockquote>
            </div>

            {/* Insight 2 */}
            <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 mb-2">
                {isVi ? '🏷️ Made in China → cửa đóng' : '🏷️ Made in China → gate shut'}
              </p>
              <p className="text-[12px] text-text2 leading-relaxed mb-3">
                {isVi
                  ? 'H8 làm niềm tin tụt → H5 kích hoạt. Lúc này dù HDV giỏi đến cũng không cứu được quyết định.'
                  : 'H8 drops trust → H5 activates. Even a skilled guide arriving now cannot reverse the decision.'}
              </p>
              <blockquote className="border-l-2 border-red-500/35 pl-2.5">
                <p className="text-[10px] text-red-200/60 italic">{isVi ? '"Thấy là để xuống ngay, không hỏi thêm."' : '"Saw it — put it down, no more questions."'}</p>
              </blockquote>
            </div>

            {/* Insight 3 */}
            <div className="rounded-xl bg-slate-500/5 border border-slate-500/20 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 mb-2">
                {isVi ? '👥 Đoàn là máy nhân × 2.25' : '👥 Group = ×2.25 multiplier'}
              </p>
              <p className="text-[12px] text-text2 leading-relaxed mb-3">
                {isVi
                  ? '1 người dừng → 5 người dừng → cả đoàn 20 người xúm vào. Cùng HDV, cùng sản phẩm — đoàn mua gấp 2.25 lần đi lẻ.'
                  : '1 stops → 5 stop → whole 20-person group crowds in. Same guide, same product — group buys 2.25× more than solo.'}
              </p>
              <blockquote className="border-l-2 border-slate-500/35 pl-2.5">
                <p className="text-[10px] text-slate-200/60 italic">{isVi ? '"Thấy người ta mua là mình cũng muốn mua theo."' : '"Seeing everyone buying made me want to buy too."'}</p>
              </blockquote>
            </div>

            {/* ⚡ Paradox */}
            <div className="rounded-xl bg-amber-500/5 border border-amber-500/25 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 mb-2">⚡ {isVi ? 'Nghịch lý' : 'The paradox'}</p>
              <p className="text-[12px] text-text2 leading-relaxed mb-2.5">
                {isVi
                  ? 'Người ta không mua vì không biết sản phẩm là gì — không phải vì đắt.'
                  : 'They don\'t buy because they don\'t understand the product — not because it\'s expensive.'}
              </p>
              <blockquote className="border-l-2 border-amber-500/40 pl-2.5 mb-2">
                <p className="text-[10px] text-amber-200/70 italic">
                  {isVi ? '"Không phải không có tiền. Không biết cái đó là cái gì."' : '"Not that they can\'t afford it. They don\'t know what it is."'}
                </p>
                <footer className="text-[9px] text-amber-400 font-semibold mt-0.5">— HDV Trần Minh Luyện</footer>
              </blockquote>
              <p className="text-[11px] font-bold text-amber-400">
                {isVi ? '→ Kể chuyện = đòn bẩy ROI cao nhất' : '→ Storytelling = highest-ROI lever'}
              </p>
            </div>

          </div>{/* end right column */}

        </div>{/* end flex row */}
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
        <p className="text-sm text-text2 leading-relaxed max-w-2xl mx-auto text-balance">{t.inHeroDesc}</p>
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
    {
      id: 'H1',
      rel: isVi ? 'Câu chuyện văn hóa → Hứng thú (+)' : 'Cultural story → Arousal (+)',
      formula: isVi ? 'Câu chuyện văn hóa × 0.85 → Hứng thú' : 'Cultural Story × 0.85 → Arousal',
      note: isVi ? 'Nghe câu chuyện hay → khách bắt đầu hứng thú ngay lập tức' : 'Hearing a good story → immediate excitement spike',
      color: 'blue'
    },
    {
      id: 'H2',
      rel: isVi ? 'Hứng thú tức thì → Mua ngay (+)' : 'Arousal → Impulse Buy (+)',
      formula: isVi ? 'Hứng thú × 0.9 → Xác suất mua ngẫu hứng' : 'Arousal × 0.9 → Impulse buy probability',
      note: isVi ? 'Hứng thú càng cao → khách móc ví càng nhanh, không cần suy nghĩ lâu' : 'Higher arousal → faster wallet-opening, less deliberation',
      color: 'purple'
    },
    {
      id: 'H3',
      rel: isVi ? 'Câu chuyện văn hóa → Niềm vui lâu dài (+)' : 'Cultural story → Lasting Pleasure (+)',
      formula: isVi ? 'Văn hóa × 0.75 + Sản phẩm × 0.25 → Niềm vui' : 'Culture × 0.75 + Product × 0.25 → Pleasure',
      note: isVi ? 'Sản phẩm mang bản sắc địa phương tạo ký ức — khách muốn mua để kỷ niệm' : 'Locally-rooted products create memories — buying as keepsake',
      color: 'blue'
    },
    {
      id: 'H4',
      rel: isVi ? 'Niềm vui lâu dài → Mua nhiều (+)' : 'Lasting Pleasure → Volume Purchase (+)',
      formula: isVi ? 'Niềm vui × 0.85 → Số lượng mua' : 'Pleasure × 0.85 → Purchase volume',
      note: isVi ? 'Cảm xúc bền vững → mua số lượng lớn, mua làm quà cho người thân' : 'Sustained emotion → bulk purchase, gifting behavior',
      color: 'purple'
    },
    {
      id: 'H5',
      rel: isVi ? 'Niềm tin điều tiết toàn bộ quyết định' : 'Trust moderates all decisions',
      formula: isVi ? 'Cổng = Niềm tin ÷ 100  (từ 0.0 đến 1.0)' : 'Gate = Trust ÷ 100  (0.0 to 1.0)',
      note: isVi ? 'Cổng kiểm soát: Niềm tin < 40 → chặn hoàn toàn dù kích thích mạnh đến đâu' : 'Trust gatekeeper: < 40 → fully blocked regardless of stimuli',
      color: 'amber'
    },
    {
      id: 'H6',
      rel: isVi ? 'Ảnh hưởng xã hội → Hứng thú (+)' : 'Social influence → Arousal (+)',
      formula: isVi ? 'Đi đoàn: ×1.3 · Đi lẻ: ×0.7' : 'Tour: ×1.3 · Solo: ×0.7',
      note: isVi ? 'HDV và người xung quanh khuếch đại cảm xúc — mạnh hơn khi đi tour' : 'Guide & crowd amplify emotion — stronger in tour context',
      color: 'blue'
    },
    {
      id: 'H7',
      rel: isVi ? 'Bối cảnh tour/lẻ khuếch đại xã hội' : 'Tour/solo context amplifies social',
      formula: isVi ? 'Tour đoàn: × 1.4 · Khách lẻ: × 0.5' : 'Tour group: × 1.4 · Solo: × 0.5',
      note: isVi ? 'Tổng hệ số khuếch đại: 1.4 ÷ 0.5 = 2.8× — tour đoàn mạnh gấp 2.8 lần' : 'Total multiplier: 1.4 ÷ 0.5 = 2.8× — tour context is 2.8× stronger',
      color: 'amber'
    },
    {
      id: 'H8',
      rel: isVi ? 'Thiếu câu chuyện → Mất niềm tin → Không mua' : 'No storytelling → Trust drop → No buy',
      formula: isVi ? 'Rủi ro = (100 − Kể chuyện) × 0.8' : 'Risk score = (100 − Storytelling) × 0.8',
      note: isVi ? 'Không ai giải thích sản phẩm là gì → khách nghi ngờ → bỏ đi' : 'No product explanation → doubt → walk away',
      color: 'red'
    },
    {
      id: 'H9',
      rel: isVi ? 'Mua hàng → Giới thiệu bạn bè (+)' : 'Purchase → Word-of-mouth (+)',
      formula: isVi ? 'Hứng thú × 0.7 → Xác suất chia sẻ' : 'Arousal × 0.7 → Sharing probability',
      note: isVi ? 'Khách hứng thú mua xong → quay ra kéo bạn đồng hành cùng xem' : 'Excited buyer → pulls travel companions over to see',
      color: 'green'
    },
    {
      id: 'H10',
      rel: isVi ? 'Hiệu ứng lan truyền trong đoàn' : 'In-group contagion effect',
      formula: isVi ? 'Hứng thú × 0.5 × (hệ số đoàn/lẻ)' : 'Arousal × 0.5 × (tour/solo factor)',
      note: isVi ? '5–7 người mua → cả đoàn xúm vào: phản ứng mua "lây" như domino' : '5–7 buyers → whole group joins: buying behavior spreads like domino',
      color: 'teal'
    },
  ];

  const SCENARIOS_TABLE = [
    {
      name: isVi ? '🌟 Lý tưởng' : '🌟 Ideal',
      key: isVi ? 'Câu chuyện hay · HDV giỏi · Sản phẩm chất lượng · Khách tin tưởng · Tour đoàn' : 'Great story · Skilled guide · Quality product · High trust · Tour group',
      buy: '~95%', noBuy: '~0%', und: '~5%'
    },
    {
      name: isVi ? '📭 Thiếu câu chuyện' : '📭 No Story',
      key: isVi ? 'Không ai kể chuyện · Khách không hiểu sản phẩm · Không có lý do để mua' : 'No storytelling · Customers don\'t understand product · No reason to buy',
      buy: '~27%', noBuy: '~44%', und: '~29%'
    },
    {
      name: isVi ? '🚫 Hàng Trung Quốc' : '🚫 Counterfeit Goods',
      key: isVi ? 'Mất niềm tin hoàn toàn · Dù câu chuyện hay, khách vẫn từ chối' : 'Complete trust breakdown · Even good stories can\'t overcome it',
      buy: '~14%', noBuy: '~61%', und: '~25%'
    },
    {
      name: isVi ? '🚌 Tour đoàn' : '🚌 Tour Group',
      key: isVi ? 'HDV nhiệt tình · Đoàn đông · Hiệu ứng lan truyền mạnh · Áp lực xã hội tích cực' : 'Enthusiastic guide · Large group · Strong contagion effect · Positive social pressure',
      buy: '~69%', noBuy: '~12%', und: '~19%'
    },
    {
      name: isVi ? '🎒 Khách lẻ' : '🎒 Solo Traveler',
      key: isVi ? 'Tự quyết định · Không có HDV · Phụ thuộc vào câu chuyện và chất lượng sản phẩm' : 'Self-directed · No guide · Depends on story quality and product',
      buy: '~64%', noBuy: '~0%', und: '~36%'
    },
    {
      name: isVi ? '🏢 Chỉ bán sỉ' : '🏢 Wholesale Only',
      key: isVi ? 'Không bán lẻ cho khách du lịch · Kênh phân phối sai mục tiêu · Khó tiếp cận' : 'Doesn\'t sell retail to tourists · Wrong distribution channel · Hard to access',
      buy: '~49%', noBuy: '~15%', und: '~36%'
    },
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

        <div className="overflow-x-auto mb-6 rounded-xl border border-border bg-surface">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface2/60">
                <th className="py-2.5 px-4 text-left text-text3 font-bold uppercase">{t.fmCondition}</th>
                <th className="py-2.5 px-3 text-center text-text3 font-bold uppercase">{t.fmPenalty}</th>
                <th className="py-2.5 px-4 text-left text-text3 font-bold uppercase">{isVi ? 'Ý nghĩa thực tế' : 'What it means'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr className="hover:bg-red-500/5">
                <td className="py-2.5 px-4 font-medium text-amber-300">{isVi ? 'Niềm tin rất thấp (dưới 40)' : 'Very low trust (below 40)'}</td>
                <td className="py-2.5 px-3 text-center font-black text-red-400">+60</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Thấy hàng Trung Quốc, giá loạn → đặt xuống ngay, không thương lượng' : 'Fake goods or chaotic pricing → put it down immediately, no negotiation'}</td>
              </tr>
              <tr className="hover:bg-amber-500/5">
                <td className="py-2.5 px-4 font-medium text-amber-400">{isVi ? 'Niềm tin thấp (40–54)' : 'Low trust (40–54)'}</td>
                <td className="py-2.5 px-3 text-center font-black text-amber-400">+25</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Còn nghi ngờ về xuất xứ hoặc giá cả → do dự, hỏi nhiều rồi bỏ đi' : 'Doubtful about origin or price → hesitates, asks questions, often leaves'}</td>
              </tr>
              <tr className="hover:bg-amber-500/5">
                <td className="py-2.5 px-4 font-medium text-amber-300">{isVi ? 'Niềm tin trung bình (55–69)' : 'Moderate trust (55–69)'}</td>
                <td className="py-2.5 px-3 text-center font-bold text-amber-300">+8</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Chưa hoàn toàn tin tưởng nhưng vẫn cân nhắc mua' : 'Not fully convinced but still considering purchase'}</td>
              </tr>
              <tr className="hover:bg-blue-500/5">
                <td className="py-2.5 px-4 font-medium text-blue-300">{isVi ? 'Không có câu chuyện nào (dưới 30)' : 'No cultural story (below 30)'}</td>
                <td className="py-2.5 px-3 text-center font-black text-red-400">+30</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Khách không hiểu sản phẩm là gì → không thấy giá trị → không mua' : 'Customer doesn\'t understand what it is → no perceived value → no buy'}</td>
              </tr>
              <tr className="hover:bg-blue-500/5">
                <td className="py-2.5 px-4 font-medium text-blue-400">{isVi ? 'Câu chuyện văn hóa yếu (30–49)' : 'Weak cultural story (30–49)'}</td>
                <td className="py-2.5 px-3 text-center font-bold text-amber-400">+12</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Câu chuyện sơ sài, không đủ hấp dẫn để tạo ra cảm xúc' : 'Story too thin to generate emotional engagement'}</td>
              </tr>
              <tr className="hover:bg-purple-500/5">
                <td className="py-2.5 px-4 font-medium text-purple-300">{isVi ? 'Giá không minh bạch (dưới 40)' : 'Price opacity (below 40)'}</td>
                <td className="py-2.5 px-3 text-center font-black text-red-400">+20</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Giá không niêm yết hoặc mỗi nơi một giá → khách sợ bị lừa → không dám mua' : 'No price tag or inconsistent pricing → fear of being cheated → won\'t buy'}</td>
              </tr>
              <tr className="hover:bg-purple-500/5">
                <td className="py-2.5 px-4 font-medium text-purple-400">{isVi ? 'Giá chưa rõ ràng (40–54)' : 'Unclear pricing (40–54)'}</td>
                <td className="py-2.5 px-3 text-center font-bold text-amber-300">+5</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Giá hơi mập mờ, khách hơi phân vân nhưng không đến mức bỏ đi' : 'Slightly unclear pricing, minor hesitation but won\'t necessarily leave'}</td>
              </tr>
              <tr className="hover:bg-red-500/5">
                <td className="py-2.5 px-4 font-medium text-red-300">{isVi ? 'Không có HDV hoặc kể chuyện (dưới 30)' : 'No guide or storytelling (below 30)'}</td>
                <td className="py-2.5 px-3 text-center font-black text-red-400">+25</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'Không ai hướng dẫn, không ai kể chuyện → mất niềm tin nghiêm trọng (H8)' : 'No guide, no story → severe trust drop — the H8 effect'}</td>
              </tr>
              <tr className="hover:bg-red-500/5">
                <td className="py-2.5 px-4 font-medium text-red-400">{isVi ? 'Kể chuyện yếu (30–49)' : 'Weak storytelling (30–49)'}</td>
                <td className="py-2.5 px-3 text-center font-bold text-amber-400">+10</td>
                <td className="py-2.5 px-4 text-text3">{isVi ? 'HDV giới thiệu sơ sài → thiếu thuyết phục, khách nghe mà không cảm' : 'Shallow guide introduction → unconvincing, customer hears but doesn\'t feel'}</td>
              </tr>
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
      <div className="text-center text-[10px] text-text3 uppercase tracking-widest opacity-40">
        {t.footer}
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

// ─── CODEBOOK DATA ──────────────────────────────────────────────────────────
const CODEBOOK_DATA = [
  // ── S_Product (16 codes) ──
  { id: 'SP-01', group: 'S', sub: 'S_Product', topic: 'Sản phẩm đồng nhất giữa các tỉnh', topicEn: 'Homogeneous products across provinces', def: 'Quà lưu niệm ĐBSCL thiếu tính đặc trưng riêng từng tỉnh, sản phẩm tương đồng giữa các điểm đến; khách không phân biệt được xuất xứ.', quote: '"Đến đây mua, đến kia mua, mua ở đâu cũng vậy hết"', src: 'HDV, CG' },
  { id: 'SP-02', group: 'S', sub: 'S_Product', topic: 'Bao bì, mẫu mã kém', topicEn: 'Poor packaging & design', def: 'Bao bì và thiết kế sản phẩm chưa đạt tiêu chuẩn thẩm mỹ cao cấp, chưa đủ sức thu hút khách mua quà biếu tặng.', quote: '"Mẫu mã chưa ấn tượng, chưa xứng tầm quà tặng"', src: 'CG' },
  { id: 'SP-03', group: 'S', sub: 'S_Product', topic: 'Thiếu phân khúc cao cấp', topicEn: 'Missing premium segment', def: 'Vắng bóng sản phẩm quà lưu niệm phân khúc cao cấp (premium/luxury gift), thiếu lựa chọn cho khách có nhu cầu tặng quà sang trọng.', quote: '"Không có gì để cảm thấy xứng đáng với tầm quà cao cấp"', src: 'CG' },
  { id: 'SP-04', group: 'S', sub: 'S_Product', topic: 'Nghịch lý Made in China', topicEn: 'Made-in-China paradox', def: 'Sản phẩm mang chủ đề Việt Nam nhưng được sản xuất tại Trung Quốc, làm mất tính xác thực và bản sắc địa phương.', quote: '"Lật ra thấy Made in China là khách đặt xuống không mua nữa"', src: 'HDV' },
  { id: 'SP-05', group: 'S', sub: 'S_Product', topic: 'Hai thái cực thiết kế', topicEn: 'Design extremes', def: 'Thiết kế sản phẩm phân cực: hoặc quá sặc sỡ hoặc quá đơn giản, thiếu điểm hài hòa phù hợp thị hiếu đa dạng.', quote: '"Phải có cái gì đó ở giữa, không phải quá sặc sỡ, không phải quá đơn giản"', src: 'HDV' },
  { id: 'SP-06', group: 'S', sub: 'S_Product', topic: 'Nguyên liệu tự nhiên địa phương', topicEn: 'Local natural materials', def: 'Sản phẩm từ nguyên liệu tự nhiên đặc trưng vùng (dừa, sen, lục bình, mướp) có tiềm năng hấp dẫn vì tính địa phương cao.', quote: '"Sản phẩm địa phương từ dừa, xơ dừa, từ mướp — đồ lưu niệm"', src: 'HDV, HKD' },
  { id: 'SP-07', group: 'S', sub: 'S_Product', topic: 'Tính tiện lợi vận chuyển', topicEn: 'Transport convenience', def: 'Khả năng mang về dễ dàng (nhỏ, nhẹ, không vỡ, bền) là tiêu chí lựa chọn hàng đầu của người mua quà lưu niệm.', quote: '"Khách hay hỏi: có bể không, có để được lâu không"', src: 'HDV' },
  { id: 'SP-08', group: 'S', sub: 'S_Product', topic: 'Nón lá — sản phẩm bán chạy nhất', topicEn: 'Conical hat — best seller', def: 'Nón lá là mặt hàng được khách quốc tế mua nhiều nhất: vừa mang biểu tượng văn hóa, vừa tiện dùng ngay tại chỗ.', quote: '"Khách Tây hay mua nón lá nhất, mua 5–7 cái, cả chục cái về tặng"', src: 'HDV' },
  { id: 'SP-09', group: 'S', sub: 'S_Product', topic: 'Artisan cá nhân hóa', topicEn: 'Personalized artisan products', def: 'Sản phẩm thủ công được cá nhân hóa (khắc tên, vẽ theo yêu cầu) bán tốt tại phân khúc khách sạn 4–5 sao và doanh nghiệp.', quote: '"Khách sạn đặt tranh nhỏ tặng khách VIP — bán được giá hơn vì unique"', src: 'HKD' },
  { id: 'SP-10', group: 'S', sub: 'S_Product', topic: 'Xu hướng eco-friendly', topicEn: 'Eco-friendly trend', def: 'Sản phẩm thân thiện môi trường đang được người mua ở mọi độ tuổi quan tâm và hỏi mua tại cơ sở sản xuất.', quote: '"Từ bạn trẻ đến người lớn tuổi đều hỏi đồ nào làm bằng tự nhiên"', src: 'HKD' },
  { id: 'SP-11', group: 'S', sub: 'S_Product', topic: 'Thiếu nhãn mác, chứng nhận', topicEn: 'Missing labels & certifications', def: 'Sản phẩm thiếu nhãn mác, thông tin xuất xứ, quy trình sản xuất và chứng nhận chất lượng, khiến khách không có cơ sở đánh giá.', quote: '"Không có chữ dấu hay dấu ấn gì để khách nước ngoài họ biết"', src: 'HDV, CG' },
  { id: 'SP-12', group: 'S', sub: 'S_Product', topic: 'Artisan vs đại trà', topicEn: 'Artisan vs mass-produced', def: 'Phân biệt sản xuất thủ công nghề nhân (unique, chất lượng cao, giá trị cao) và sản xuất hàng loạt (giá rẻ, kém đặc sắc).', quote: '"Làm thủ công thì mỗi cái một khác — giá trị mà máy không làm được"', src: 'HKD' },
  { id: 'SP-13', group: 'S', sub: 'S_Product', topic: 'Tiềm năng văn hóa chưa khai thác', topicEn: 'Untapped cultural potential', def: 'Một số sản phẩm văn hóa vật thể (chiếu Định Yên, áo bà ba) có tiềm năng lớn trở thành quà lưu niệm nhưng chưa được phát triển.', quote: '"Chiếu Định Yên nổi tiếng như vậy nhưng không ai làm thành quà để bán"', src: 'HDV' },
  { id: 'SP-14', group: 'S', sub: 'S_Product', topic: 'Quà thực phẩm được ưa chuộng hơn', topicEn: 'Food souvenirs preferred by locals', def: 'Khách nội địa ưa mua đồ ăn/thực phẩm đặc sản (kẹo dừa Bến Tre, bánh pía Sóc Trăng) hơn thủ công mỹ nghệ.', quote: '"Khách mình hay mua đồ ăn hơn, mang về biểu thấy hợp lý"', src: 'HDV' },
  { id: 'SP-15', group: 'S', sub: 'S_Product', topic: 'Hình ảnh miền Tây trên sản phẩm', topicEn: 'Mekong imagery on products', def: 'Sản phẩm gợi hình ảnh đặc trưng miền Tây (chim cò, sông nước, áo bà ba) thu hút và được khách quốc tế sẵn sàng mua.', quote: '"Túi xách có hình chim cò theo kiểu miền Tây — khách Tây thích và dễ mua"', src: 'HDV' },
  { id: 'SP-16', group: 'S', sub: 'S_Product', topic: 'Vắng bóng quà lưu niệm nhiều tỉnh', topicEn: 'Souvenir gaps across provinces', def: 'Nhiều tỉnh ĐBSCL gần như không có điểm bán quà lưu niệm chuyên biệt, thiếu hụt cung ứng nghiêm trọng.', quote: '"Nhiều tỉnh đi gần như không thấy chỗ nào bán quà lưu niệm hết"', src: 'HDV' },

  // ── S_Price (3 codes) ──
  { id: 'SPr-01', group: 'S', sub: 'S_Price', topic: 'Giá không đồng nhất', topicEn: 'Inconsistent pricing', def: 'Giá cả thiếu nhất quán giữa các quầy kế nhau gây hoang mang, mất niềm tin vào người bán và chuỗi bán lẻ.', quote: '"Hai quầy kế nhau bán cùng hàng giá khác nhau, khách không dám mua"', src: 'HDV, CG' },
  { id: 'SPr-02', group: 'S', sub: 'S_Price', topic: 'Giá không phải rào cản (quốc tế)', topicEn: 'Price not a barrier for intl tourists', def: 'Với khách nước ngoài, mức giá sản phẩm quà lưu niệm ĐBSCL không phải yếu tố ngăn cản mua do chênh lệch thu nhập.', quote: '"Vài đồng đến 50 đồng — không quá cao so với thu nhập khách Tây"', src: 'HDV' },
  { id: 'SPr-03', group: 'S', sub: 'S_Price', topic: 'Thiếu storytelling mới là rào cản', topicEn: 'Lack of story is the real barrier', def: 'Không phải mức giá mà chính sự thiếu thông tin và câu chuyện về sản phẩm là nguyên nhân thực sự khiến khách không mua.', quote: '"Không phải không có tiền — không biết cái đó là gì, có gì đặc biệt"', src: 'HDV' },

  // ── S_Place (8 codes) ──
  { id: 'SPl-01', group: 'S', sub: 'S_Place', topic: 'Trưng bày lộn xộn như tạp hóa', topicEn: 'Cluttered display like a grocery', def: 'Không gian trưng bày thiếu đầu tư, lộn xộn, không phân loại, không có điểm nhấn — giống cửa hàng tạp hóa hơn điểm bán quà.', quote: '"Trưng bày như cái tạp hóa, cái gì cũng có, để lung tung, không có gì nổi bật"', src: 'HDV, CG' },
  { id: 'SPl-02', group: 'S', sub: 'S_Place', topic: 'Thiếu shop quà chuyên biệt', topicEn: 'No dedicated souvenir shops', def: 'Không có cửa hàng quà lưu niệm chuyên biệt tại nhiều tỉnh ĐBSCL, khách không biết đi đâu để mua.', quote: '"Nhiều tỉnh không có chỗ bán quà lưu niệm riêng"', src: 'HDV' },
  { id: 'SPl-03', group: 'S', sub: 'S_Place', topic: 'Bày chung với quầy thực ăn', topicEn: 'Mixed with food stalls', def: 'Quà lưu niệm không có không gian riêng, thường trưng bày lẫn với quầy đồ ăn thức uống, gây nhầm lẫn.', quote: '"Quà lưu niệm với đồ ăn để chung hết, không biết đâu là khu quà"', src: 'HDV' },
  { id: 'SPl-04', group: 'S', sub: 'S_Place', topic: 'Thiếu phân loại và nhãn dán', topicEn: 'No categorization or labeling', def: 'Không có phân loại hàng hóa, không có nhãn dán, không có thuyết minh sản phẩm, khách tự mò mẫm.', quote: '"Không có nhãn dán, không giới thiệu cái này làm bằng gì — hoàn toàn là không có"', src: 'HDV' },
  { id: 'SPl-05', group: 'S', sub: 'S_Place', topic: 'Thời gian dừng tham quan ngắn', topicEn: 'Short dwell time', def: 'Khách chỉ dừng lại tại điểm bán trong thời gian rất ngắn, đòi hỏi trưng bày phải tạo ấn tượng ngay lập tức.', quote: '"Khách lướt qua rất nhanh, không ở đến vài ba tiếng để tìm hiểu"', src: 'HDV' },
  { id: 'SPl-06', group: 'S', sub: 'S_Place', topic: 'Gallery tranh đồng quê thu hút khách', topicEn: 'Rural art gallery attracts tourists', def: 'Gallery tranh phong cảnh đồng quê quy mô nhỏ tại điểm tham quan có khả năng thu hút sự chú ý của khách quốc tế.', quote: '"Gallery nhỏ giới thiệu tranh cảnh đồng quê — khách nước ngoài lại thích"', src: 'HDV' },
  { id: 'SPl-07', group: 'S', sub: 'S_Place', topic: 'Mô hình bán sỉ — không bán lẻ', topicEn: 'Wholesale only — no retail', def: 'Cơ sở sản xuất chỉ bán sỉ cho đại lý, không bán lẻ cho du khách, tạo khoảng cách cung–cầu thực sự.', quote: '"Bán sỉ cho đại lý thôi, khách du lịch hỏi mua một cái thì không bán"', src: 'HKD' },
  { id: 'SPl-08', group: 'S', sub: 'S_Place', topic: 'Cần kênh online và hội chợ', topicEn: 'Need online & trade fair channels', def: 'Nhu cầu mở rộng qua kênh bán online và tham gia hội chợ thương mại để tiếp cận khách hàng mới.', quote: '"Phải lên mạng, phải đi hội chợ — ngồi đây chờ khách thì không có ai vào"', src: 'HKD' },

  // ── S_Promotion (5 codes) ──
  { id: 'SPro-01', group: 'S', sub: 'S_Promotion', topic: 'HDV là yếu tố chuyển đổi mua', topicEn: 'Guide is the conversion factor', def: 'Lời giới thiệu của HDV là yếu tố chuyển đổi ý định mua quan trọng nhất trong bối cảnh tour du lịch có tổ chức.', quote: '"Chỉ khi HDV nhiệt tình giới thiệu thì khách thích thú hơn và sẽ mua"', src: 'HDV' },
  { id: 'SPro-02', group: 'S', sub: 'S_Promotion', topic: 'Thiếu storytelling — rào cản lớn nhất', topicEn: 'No storytelling — biggest barrier', def: 'Thiếu câu chuyện về nguồn gốc, quy trình sản xuất và ý nghĩa văn hóa của sản phẩm là rào cản quan trọng nhất ngăn cản hành vi mua.', quote: '"Không phải người ta không có tiền mua đâu. Người ta không mua vì người ta không biết cái đó là cái gì."', src: 'HDV, CG' },
  { id: 'SPro-03', group: 'S', sub: 'S_Promotion', topic: 'Cần chứng nhận chất lượng', topicEn: 'Quality certification needed', def: 'Chứng nhận "Hàng Việt Nam chất lượng cao" hoặc nhãn an toàn tăng niềm tin và giảm rào cản mua.', quote: '"Có nhãn HVNCLC thì khách mua không cần suy nghĩ nhiều"', src: 'HDV' },
  { id: 'SPro-04', group: 'S', sub: 'S_Promotion', topic: 'Mạng xã hội là động lực mua', topicEn: 'Social media as purchase driver', def: 'Mong muốn có nội dung ảnh đẹp để đăng mạng xã hội là một động lực mua sản phẩm đặc sắc.', quote: '"Mua không chỉ để dùng — mua để chụp hình đăng lên mạng"', src: 'HDV' },
  { id: 'SPro-05', group: 'S', sub: 'S_Promotion', topic: 'Hỗ trợ hội chợ thương mại', topicEn: 'Trade fair support', def: 'Sự hỗ trợ từ nhà nước để tham gia hội chợ là kênh quảng bá B2B quan trọng nhất với cơ sở sản xuất nhỏ.', quote: '"Nhà nước hỗ trợ đi hội chợ, được cấp gian hàng — cách quảng bá tốt nhất"', src: 'HKD' },

  // ── S_Social (5 codes) ──
  { id: 'SSo-01', group: 'S', sub: 'S_Social', topic: 'Lời giới thiệu người bán', topicEn: 'Seller introduction', def: 'Lời giới thiệu trực tiếp của người bán hàng là yếu tố then chốt giúp khách chuyển từ phân vân sang quyết định mua.', quote: '"Người bán biết cách kể chuyện thì khách chắc chắn sẽ mua"', src: 'HDV' },
  { id: 'SSo-02', group: 'S', sub: 'S_Social', topic: 'HDV là cầu nối', topicEn: 'Guide as bridge', def: 'HDV đóng vai trò cầu nối quan trọng giữa khách du lịch và sản phẩm/văn hóa địa phương, ảnh hưởng trực tiếp đến quyết định mua.', quote: '"HDV thích và giới thiệu cái gì hay thì khách cũng theo. Mình là cái cầu nối đó."', src: 'HDV' },
  { id: 'SSo-03', group: 'S', sub: 'S_Social', topic: 'FOMO trong nhóm du lịch', topicEn: 'Group FOMO effect', def: 'Hiệu ứng sợ bỏ lỡ (FOMO) khi thấy người cùng nhóm quan tâm đến sản phẩm, kéo người khác lại xem và có thể mua theo.', quote: '"Thấy người ta cầm lên xem là mình cũng muốn biết cái đó là gì"', src: 'HDV' },
  { id: 'SSo-04', group: 'S', sub: 'S_Social', topic: 'Hiệu ứng dây chuyền', topicEn: 'Chain reaction effect', def: 'Hiệu ứng lan truyền hành vi trong đoàn: một người dừng lại mua tạo chuỗi kích thích cho nhiều người khác mua theo.', quote: '"Chỉ cần 5–7 khách dừng lại mua thôi là đã khác rồi"', src: 'HDV' },
  { id: 'SSo-05', group: 'S', sub: 'S_Social', topic: 'Đoàn doanh nghiệp mua tập thể', topicEn: 'Corporate group bulk buying', def: 'Đoàn team-building doanh nghiệp có hành vi mua đồng loạt cùng một loại sản phẩm, tạo doanh thu lớn trong thời gian ngắn.', quote: '"Đoàn công ty hay mua cùng loại hàng về tặng nhau — mua cả đoàn"', src: 'HDV' },

  // ── S_Cultural (7 codes) ──
  { id: 'SCu-01', group: 'S', sub: 'S_Cultural', topic: 'Câu chuyện làng quê miệt vườn', topicEn: 'Rural Mekong storytelling', def: 'Câu chuyện và hình ảnh về vùng làng quê, miệt vườn sông nước ĐBSCL là điểm hút mạnh đặc biệt với khách nước ngoài.', quote: '"Khách nước ngoài thích câu chuyện làng quê — hiện đại thì ở Sài Gòn họ mua rồi"', src: 'HDV' },
  { id: 'SCu-02', group: 'S', sub: 'S_Cultural', topic: '"Hồn" quà lưu niệm', topicEn: 'Soul of the souvenir', def: 'Giá trị văn hóa tinh thần ("hồn") của sản phẩm — khả năng đại diện cho bản sắc địa phương — tạo nên sự khác biệt với hàng hóa thông thường.', quote: '"Quà lưu niệm phải có hồn, thể hiện được nơi người ta đã đến"', src: 'HDV' },
  { id: 'SCu-03', group: 'S', sub: 'S_Cultural', topic: 'Quyền lực mềm / ngoại giao nhân dân', topicEn: 'Soft power / people diplomacy', def: 'Quà lưu niệm như công cụ ngoại giao nhân dân, lan tỏa hình ảnh và văn hóa Việt Nam qua mạng lưới người thân của khách.', quote: '"Mang về nước kể chuyện bạn bè — đó là cách quảng bá Việt Nam miễn phí"', src: 'HDV' },
  { id: 'SCu-04', group: 'S', sub: 'S_Cultural', topic: 'Đa tộc người ĐBSCL — tài sản chưa khai thác', topicEn: 'Multi-ethnic heritage untapped', def: 'Sự đa dạng văn hóa của các tộc người ĐBSCL (Kinh, Hoa, Khmer, Chăm) là tài nguyên độc đáo chưa được chuyển hóa thành quà lưu niệm.', quote: '"ĐBSCL có nhiều tộc người — kho báu nhưng chưa ai làm thành quà lưu niệm"', src: 'CG' },
  { id: 'SCu-05', group: 'S', sub: 'S_Cultural', topic: 'Câu chuyện đặc sản chưa được kể', topicEn: 'Untold local specialty stories', def: 'Câu chuyện nguồn gốc, lịch sử và ý nghĩa của các đặc sản địa phương (bánh pía, kẹo dừa...) chưa được truyền đạt đến khách.', quote: '"Nguồn gốc bánh pía ở Sóc Trăng không ai kể — người ta chỉ biết nó ngon thôi"', src: 'HDV' },
  { id: 'SCu-06', group: 'S', sub: 'S_Cultural', topic: 'Nguy cơ mai một nghề thủ công', topicEn: 'Craft heritage at risk', def: 'Nghề thủ công truyền thống đang có nguy cơ mai một do thiếu người kế thừa và thu nhập không ổn định, đe dọa chuỗi cung ứng.', quote: '"Con cháu không ai chịu học — sợ sau này không còn ai làm"', src: 'HKD' },
  { id: 'SCu-07', group: 'S', sub: 'S_Cultural', topic: 'Thương hiệu địa phương per tỉnh', topicEn: 'Province-specific local brand', def: 'Thương hiệu tự nhiên gắn kết đặc sản với tên tỉnh (bánh pía = Sóc Trăng) là tài sản cần phát huy và bảo vệ.', quote: '"Nói bánh pía là người ta biết Sóc Trăng — thương hiệu tự nhiên"', src: 'HDV' },

  // ── O_Pleasure (4 codes) ──
  { id: 'OP-01', group: 'O', sub: 'O_Pleasure', topic: '"Vật chất hóa ký ức" (academic framing)', topicEn: 'Memory materialization', def: 'Khái niệm học thuật về quà lưu niệm: là vật thể hóa ký ức của chuyến đi, mỗi lần nhìn vào kích hoạt lại trải nghiệm đã qua.', quote: '"Quà lưu niệm là hiện vật hóa ký ức của chuyến đi"', src: 'CG' },
  { id: 'OP-02', group: 'O', sub: 'O_Pleasure', topic: 'Thích thú tiếp xúc sản phẩm thủ công', topicEn: 'Delight in touching handcraft', def: 'Cảm xúc thích thú, vui vẻ khi lần đầu tiếp xúc với sản phẩm thủ công lạ lẫm — giai đoạn khởi đầu cho quyết định mua.', quote: '"Khách cầm lên, thấy lạ lẫm, họ cười, họ thử — phản ứng đó phải nắm bắt ngay"', src: 'HDV' },
  { id: 'OP-03', group: 'O', sub: 'O_Pleasure', topic: 'Niềm vui gifting', topicEn: 'Gifting joy', def: 'Niềm vui được tặng quà cho nhiều người thân, bạn bè là động lực thúc đẩy hành vi mua số lượng lớn.', quote: '"Có nhiều người mua một lần 5–7 cái, cả chục cái về tặng bạn bè"', src: 'HDV' },
  { id: 'OP-04', group: 'O', sub: 'O_Pleasure', topic: 'Quà lưu niệm = ký ức du lịch', topicEn: 'Souvenir = travel memory', def: 'Động lực mua cốt lõi: mua quà lưu niệm để lưu giữ ký ức chuyến đi — được xác nhận bởi cả 3 nhóm phỏng vấn.', quote: '"Ai đi chơi về cũng muốn có gì đó để nhìn vào nhớ lại chuyến đi"', src: 'HDV, CG, HKD' },

  // ── O_Arousal (4 codes) ──
  { id: 'OA-01', group: 'O', sub: 'O_Arousal', topic: 'FOMO — tò mò nhóm', topicEn: 'FOMO — group curiosity', def: 'Trạng thái tò mò và sợ bỏ lỡ khi thấy người cùng nhóm quan tâm đến sản phẩm, kéo người quan sát lại xem theo.', quote: '"Thấy người ta cầm lên xem là mình cũng muốn biết cái đó là gì"', src: 'HDV' },
  { id: 'OA-02', group: 'O', sub: 'O_Arousal', topic: 'Hứng thú cao độ từ câu chuyện sản phẩm', topicEn: 'High arousal from product story', def: 'Trạng thái hứng thú cao độ khi được nghe câu chuyện độc đáo về sản phẩm, thường dẫn trực tiếp đến hành vi mua tức thì.', quote: '"Extremely interesting! — khách á thốt lên sau khi nghe chuyện bánh giữ nhiệt dừa rồi mua ngay"', src: 'HDV' },
  { id: 'OA-03', group: 'O', sub: 'O_Arousal', topic: 'Tò mò khám phá sản phẩm lạ', topicEn: 'Curiosity about unfamiliar items', def: 'Hứng thú muốn khám phá sản phẩm chưa quen, biểu hiện qua hành động cầm lên thử — cửa sổ thời gian quan trọng để chuyển đổi.', quote: '"Khách cầm gì gì chơi, thấy lạ thì thử — không hiểu công năng ra sao"', src: 'HDV' },
  { id: 'OA-04', group: 'O', sub: 'O_Arousal', topic: 'Kích thích qua mạng xã hội', topicEn: 'Social media arousal', def: 'Mong muốn có ảnh đẹp để đăng mạng xã hội tạo ra trạng thái kích thích, thúc đẩy mua sản phẩm có tính thị giác cao.', quote: '"Đi du lịch không chụp ảnh đăng mạng thì như chưa đi"', src: 'HDV' },

  // ── O_Attitude (10 codes) ──
  { id: 'OAt-01', group: 'O', sub: 'O_Attitude', topic: 'Nghi ngờ vì Made in China', topicEn: 'Distrust due to Made in China', def: 'Thái độ nghi ngờ và mất niềm tin tức thì khi phát hiện sản phẩm mang chủ đề Việt Nam lại sản xuất tại Trung Quốc.', quote: '"Khách lật ra thấy Made in China là họ đặt xuống liền, họ không mua nữa đâu"', src: 'HDV' },
  { id: 'OAt-02', group: 'O', sub: 'O_Attitude', topic: 'Lo ngại hải quan nước ngoài', topicEn: 'Foreign customs concern', def: 'Thái độ lo lắng về quy định hải quan nhập khẩu khi mang sản phẩm về nước — rào cản tâm lý lớn với khách quốc tế.', quote: '"Họ lan man không biết có hợp chuẩn để mang về không"', src: 'HDV' },
  { id: 'OAt-03', group: 'O', sub: 'O_Attitude', topic: 'Lo ngại độ ẩm hủy hoại sản phẩm', topicEn: 'Humidity damage concern', def: 'Khách miền Bắc lo ngại độ ẩm cao của ĐBSCL và trong quá trình vận chuyển sẽ làm hỏng sản phẩm (tranh gạo, gỗ...).', quote: '"Khách Bắc sợ tranh gạo bị ẩm, bị mốc khi mang về miền Bắc"', src: 'HKD' },
  { id: 'OAt-04', group: 'O', sub: 'O_Attitude', topic: 'Khách trung niên mua nhiều hơn', topicEn: 'Middle-aged tourists buy more', def: 'Khách ở độ tuổi trung niên (40–50+) có thái độ mua hàng tích cực và sẵn sàng chi tiêu nhiều hơn so với giới trẻ.', quote: '"Khách lớn tuổi 40–50+ mua nhiều hơn. Giới trẻ thì chụp hình là chính"', src: 'HDV' },
  { id: 'OAt-05', group: 'O', sub: 'O_Attitude', topic: 'Khách Tây ưa hình ảnh làng quê', topicEn: 'Western tourists prefer rural imagery', def: 'Khách quốc tế tìm kiếm sự khác biệt khi đến ĐBSCL, không ưa sản phẩm hiện đại vì đã có sẵn ở nước họ.', quote: '"Khách Tây đến đây tìm cái khác với ở nhà — hiện đại thì ở Sài Gòn mua rồi"', src: 'HDV' },
  { id: 'OAt-06', group: 'O', sub: 'O_Attitude', topic: 'Đánh giá cao chứng nhận an toàn', topicEn: 'Positive attitude toward safety certs', def: 'Khách nước ngoài đặc biệt đánh giá cao và sẵn sàng mua hơn khi sản phẩm có chứng nhận an toàn, không hóa chất.', quote: '"Làm rõ không hóa chất, an toàn thì họ sẽ cởi mở và mua nhiều hơn"', src: 'HDV' },
  { id: 'OAt-07', group: 'O', sub: 'O_Attitude', topic: 'Mất tin vì giá không nhất quán', topicEn: 'Trust loss from inconsistent prices', def: 'Giá không đồng nhất giữa các quầy tạo ra thái độ tiêu cực, mất niềm tin vào sự minh bạch của người bán.', quote: '"Hai quầy giá khác nhau — khách không biết tin ai, thôi không mua luôn"', src: 'HDV' },
  { id: 'OAt-08', group: 'O', sub: 'O_Attitude', topic: 'Nhận thức thiếu bản sắc riêng', topicEn: 'Perception of no local identity', def: 'Nhận thức của người mua rằng quà lưu niệm ĐBSCL thiếu bản sắc riêng từng tỉnh, không đại diện được địa phương.', quote: '"Tiền Giang hay Vĩnh Long mua cũng y chang nhau — không biết đặc trưng là gì"', src: 'HDV, CG' },
  { id: 'OAt-09', group: 'O', sub: 'O_Attitude', topic: 'Tích cực với sản phẩm eco-friendly', topicEn: 'Positive attitude toward eco products', def: 'Thái độ tích cực, sẵn lòng mua và chi tiêu cao hơn cho sản phẩm thân thiện môi trường và nguyên liệu tự nhiên.', quote: '"Mọi độ tuổi đều hỏi đồ nào làm bằng tự nhiên"', src: 'HKD' },
  { id: 'OAt-10', group: 'O', sub: 'O_Attitude', topic: 'Khách doanh nghiệp > khách lẻ', topicEn: 'Corporate clients > individual tourists', def: 'Nhận thức của cơ sở sản xuất: khách doanh nghiệp có khả năng chi tiêu và mua số lượng lớn hơn khách lẻ du lịch.', quote: '"Khách lẻ mua ít, ngại giá. Công ty đặt thì mua cả trăm cái"', src: 'HKD' },

  // ── R_Buy (7 codes) ──
  { id: 'RB-01', group: 'R', sub: 'R_Buy', topic: 'Mua ngay sau storytelling', topicEn: 'Impulse buy after story', def: 'Hành vi mua tức thì ngay sau khi được HDV hoặc người bán kể câu chuyện thú vị về sản phẩm — phản ứng impulse rõ nhất.', quote: '"Extremely interesting! — mua ngay sau khi nghe chuyện bánh dừa"', src: 'HDV' },
  { id: 'RB-02', group: 'R', sub: 'R_Buy', topic: 'Mua tập thể đoàn doanh nghiệp', topicEn: 'Corporate group purchase', def: 'Hành vi mua đồng loạt của cả đoàn team-building, thường là cùng một loại sản phẩm biểu tượng (khăn rằn, nón lá...).', quote: '"Đoàn công ty mua khăn rằn về tặng nhau — mua cả đoàn"', src: 'HDV' },
  { id: 'RB-03', group: 'R', sub: 'R_Buy', topic: 'Mua gifting số lượng lớn', topicEn: 'Bulk gifting purchase', def: 'Mua nhiều cùng một loại sản phẩm để về tặng người thân, bạn bè — hành vi gifting volume lớn tại một lần mua.', quote: '"Nón lá mua một lần 5–7 cái, cả chục cái về tặng bạn bè"', src: 'HDV' },
  { id: 'RB-04', group: 'R', sub: 'R_Buy', topic: 'Mua artisan cá nhân hóa', topicEn: 'Personalized artisan purchase', def: 'Mua sản phẩm thủ công được cá nhân hóa với giá cao qua kênh khách sạn cao cấp hoặc đặt hàng doanh nghiệp.', quote: '"Khách sạn 4–5 sao đặt tranh nhỏ tặng khách VIP — bán được giá hơn"', src: 'HKD' },
  { id: 'RB-05', group: 'R', sub: 'R_Buy', topic: 'Mua theo hiệu ứng dây chuyền', topicEn: 'Chain-reaction buying', def: 'Hành vi mua được lan truyền trong đoàn khi thấy người cùng nhóm dừng lại mua — không cần thêm kích thích từ người bán.', quote: '"5–7 khách dừng mua ở cả đoàn kéo đến mua tiếp theo"', src: 'HDV' },
  { id: 'RB-06', group: 'R', sub: 'R_Buy', topic: 'Mua sản phẩm eco-friendly', topicEn: 'Eco-friendly purchase', def: 'Hành vi mua sản phẩm thân thiện môi trường như là lựa chọn có ý thức phù hợp với xu hướng tiêu dùng xanh.', quote: '"Khách hỏi đồ tự nhiên và mua eco-friendly nhiều"', src: 'HKD' },
  { id: 'RB-07', group: 'R', sub: 'R_Buy', topic: 'Mua và dùng ngay tại chỗ', topicEn: 'Buy and use on the spot', def: 'Mua sản phẩm có thể sử dụng ngay tại điểm tham quan — nón lá đội trên ghe, quạt trên sông — tăng giá trị trải nghiệm.', quote: '"Nón lá đội được luôn trên ghe — khách mua và dùng ngay"', src: 'HDV' },

  // ── R_NoBuy (7 codes) ──
  { id: 'RNB-01', group: 'R', sub: 'R_NoBuy', topic: 'Không mua vì không hiểu sản phẩm', topicEn: 'No buy: product not understood', def: 'Không mua vì không biết sản phẩm là gì, dùng để làm gì — khoảng trống thông tin loại bỏ cả Arousal lẫn Pleasure.', quote: '"Cầm gì gì chơi — không hiểu công năng ra sao, thôi bỏ xuống"', src: 'HDV' },
  { id: 'RNB-02', group: 'R', sub: 'R_NoBuy', topic: 'Không mua vì lo hải quan', topicEn: 'No buy: customs concern', def: 'Không mua sản phẩm (đồ gỗ, thực phẩm...) vì lo ngại không qua được kiểm tra hải quan của nước nhà.', quote: '"Thấy đồ gỗ không có xác nhận hợp chuẩn — họ không mua"', src: 'HDV' },
  { id: 'RNB-03', group: 'R', sub: 'R_NoBuy', topic: 'Không mua vì thiếu chứng nhận an toàn', topicEn: 'No buy: missing safety cert', def: 'Không mua sản phẩm dùng cho cơ thể (xà bông, kem...) vì thiếu chứng nhận an toàn vệ sinh.', quote: '"Xà bông không có chứng chỉ — họ không dám mua"', src: 'HDV' },
  { id: 'RNB-04', group: 'R', sub: 'R_NoBuy', topic: 'Không mua vì giá không minh bạch', topicEn: 'No buy: price not transparent', def: 'Không mua vì phát hiện giá không đồng nhất giữa các quầy kế nhau, gây mất niềm tin vào toàn bộ chuỗi bán hàng.', quote: '"Hai quầy giá khác nhau — không biết tin ai, thôi không mua luôn"', src: 'HDV' },
  { id: 'RNB-05', group: 'R', sub: 'R_NoBuy', topic: 'Không mua vì sản phẩm na ná', topicEn: 'No buy: generic products', def: 'Không mua vì sản phẩm giống nhau ở khắp nơi, không có lý do đặc biệt để mua tại địa phương đó.', quote: '"Tiền Giang hay Vĩnh Long mua cũng y chang — không có đặc trưng để mua"', src: 'HDV, CG' },
  { id: 'RNB-06', group: 'R', sub: 'R_NoBuy', topic: 'Không mua được vì kênh bán sỉ', topicEn: 'No buy: wholesale only channel', def: 'Không thể mua vì cơ sở sản xuất chỉ bán sỉ cho đại lý, không có kênh bán lẻ trực tiếp cho du khách.', quote: '"Khách du lịch hỏi mua một cái — không bán lẻ"', src: 'HKD' },
  { id: 'RNB-07', group: 'R', sub: 'R_NoBuy', topic: 'Không mua vì lo hư hỏng', topicEn: 'No buy: damage concern', def: 'Không mua vì lo ngại sản phẩm nhạy cảm (tranh gạo, giấy...) sẽ bị hỏng do độ ẩm trong quá trình vận chuyển.', quote: '"Khách Bắc sợ tranh gạo bị ẩm, bị mốc — không mua"', src: 'HKD' },

  // ── R_Recommend (4 codes) ──
  { id: 'RRec-01', group: 'R', sub: 'R_Recommend', topic: 'Chụp ảnh chia sẻ mạng xã hội', topicEn: 'Photo sharing on social media', def: 'Chụp ảnh và chia sẻ sản phẩm lên mạng xã hội sau khi mua, tạo hiệu ứng lan tỏa viral đến mạng lưới bạn bè.', quote: '"Mua để chụp hình đăng lên mạng — bạn bè thấy rồi cũng muốn"', src: 'HDV' },
  { id: 'RRec-02', group: 'R', sub: 'R_Recommend', topic: 'Mua nhiều để tặng — word of mouth', topicEn: 'Bulk buying for gifting — WOM', def: 'Mua số lượng lớn về tặng người thân, bạn bè — sản phẩm lan tỏa đến người không trực tiếp tham gia tour.', quote: '"Mua 5–7 cái nón lá về tặng bạn bè — họ lại hỏi mua ở đâu"', src: 'HDV' },
  { id: 'RRec-03', group: 'R', sub: 'R_Recommend', topic: 'HDV tái giới thiệu điểm bán', topicEn: 'Guide re-recommends to next groups', def: 'HDV ghi nhớ và chủ động giới thiệu điểm bán tốt cho các đoàn khách tiếp theo — kênh word-of-mouth B2B đặc thù.', quote: '"Chỗ nào bán tốt là nhớ, đoàn sau đến dẫn đến chỗ đó"', src: 'HDV' },
  { id: 'RRec-04', group: 'R', sub: 'R_Recommend', topic: 'Quay lại mua lần sau', topicEn: 'Repeat purchase', def: 'Hành vi quay lại mua lần tiếp theo hoặc dẫn người thân đến nếu sản phẩm và dịch vụ tốt — customer loyalty.', quote: '"Lần đầu mua ưng thì lần sau tìm lại, thậm chí dẫn bạn bè đến"', src: 'CG' },
];

// ─── CODEBOOK VIEW ───────────────────────────────────────────────────────────
const CodebookView = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang];
  const isVi = lang === 'vi';
  const [filter, setFilter] = React.useState<'ALL' | 'S' | 'O' | 'R'>('ALL');
  const [search, setSearch] = React.useState('');

  const SUB_LABELS: Record<string, string> = {
    S_Product: isVi ? t.cbSubProduct : t.cbSubProduct,
    S_Price: isVi ? t.cbSubPrice : t.cbSubPrice,
    S_Place: isVi ? t.cbSubPlace : t.cbSubPlace,
    S_Promotion: isVi ? t.cbSubPromo : t.cbSubPromo,
    S_Social: isVi ? t.cbSubSocial : t.cbSubSocial,
    S_Cultural: isVi ? t.cbSubCultural : t.cbSubCultural,
    O_Pleasure: isVi ? t.cbSubPleasure : t.cbSubPleasure,
    O_Arousal: isVi ? t.cbSubArousal : t.cbSubArousal,
    O_Attitude: isVi ? t.cbSubAttitude : t.cbSubAttitude,
    R_Buy: isVi ? t.cbSubBuy : t.cbSubBuy,
    R_NoBuy: isVi ? t.cbSubNoBuy : t.cbSubNoBuy,
    R_Recommend: isVi ? t.cbSubRecommend : t.cbSubRecommend,
  };

  const GROUP_COLOR: Record<string, string> = {
    S: 'blue', O: 'purple', R: 'green',
  };

  const SUB_COLOR: Record<string, string> = {
    S_Product: 'blue', S_Price: 'sky', S_Place: 'teal', S_Promotion: 'cyan',
    S_Social: 'violet', S_Cultural: 'indigo',
    O_Pleasure: 'pink', O_Arousal: 'purple', O_Attitude: 'amber',
    R_Buy: 'emerald', R_NoBuy: 'red', R_Recommend: 'lime',
  };

  const q = search.toLowerCase();
  const filtered = CODEBOOK_DATA.filter(c => {
    const matchGroup = filter === 'ALL' || c.group === filter;
    const matchSearch = !q || c.id.toLowerCase().includes(q) ||
      c.topic.toLowerCase().includes(q) ||
      c.topicEn.toLowerCase().includes(q) ||
      c.def.toLowerCase().includes(q) ||
      c.sub.toLowerCase().includes(q);
    return matchGroup && matchSearch;
  });

  // Group by sub-category
  const subGroups: Record<string, typeof CODEBOOK_DATA> = {};
  filtered.forEach(c => {
    if (!subGroups[c.sub]) subGroups[c.sub] = [];
    subGroups[c.sub].push(c);
  });

  const countS = CODEBOOK_DATA.filter(c => c.group === 'S').length;
  const countO = CODEBOOK_DATA.filter(c => c.group === 'O').length;
  const countR = CODEBOOK_DATA.filter(c => c.group === 'R').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* Header */}
      <div className="text-center space-y-2 py-5">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">
          {t.cbTitle}
        </h2>
        <p className="text-text2 font-medium text-sm">{t.cbSub}</p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t.cbGroupS, count: countS, pct: '55%', color: 'blue', g: 'S' },
          { label: t.cbGroupO, count: countO, pct: '23%', color: 'purple', g: 'O' },
          { label: t.cbGroupR, count: countR, pct: '23%', color: 'green', g: 'R' },
        ].map(item => (
          <button
            key={item.g}
            onClick={() => setFilter(filter === item.g ? 'ALL' : item.g as 'S' | 'O' | 'R')}
            className={`rounded-xl p-4 text-center border transition-all cursor-pointer
              ${filter === item.g
                ? `bg-${item.color}-500/20 border-${item.color}-500/60`
                : `bg-surface border-${item.color}-500/20 hover:border-${item.color}-500/40`}`}
          >
            <div className={`text-3xl font-black text-${item.color}-400 mb-1`}>{item.count}</div>
            <div className={`text-[10px] font-bold uppercase tracking-wider text-${item.color}-400 mb-0.5`}>{item.label}</div>
            <div className="text-[10px] text-text3">{item.pct} {t.cbTotal}</div>
          </button>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.cbSearch}
          className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-text placeholder:text-text3 focus:outline-none focus:border-indigo-500/50"
        />
        <div className="flex gap-2">
          {(['ALL', 'S', 'O', 'R'] as const).map(g => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all
                ${filter === g
                  ? g === 'ALL' ? 'bg-text text-bg'
                    : g === 'S' ? 'bg-blue-500 text-white'
                      : g === 'O' ? 'bg-purple-500 text-white'
                        : 'bg-green-500 text-white'
                  : 'bg-surface border border-border text-text3 hover:text-text'}`}
            >
              {g === 'ALL' ? t.cbFilterAll : `[${g}]`}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-text3">
        {filtered.length} / {CODEBOOK_DATA.length} {t.cbTotal}
        {search && <span className="ml-2 text-indigo-400">· "{search}"</span>}
      </div>

      {/* Code groups */}
      {Object.entries(subGroups).map(([sub, codes]) => {
        const col = SUB_COLOR[sub] ?? 'slate';
        const gc = GROUP_COLOR[codes[0].group] ?? 'slate';
        return (
          <section key={sub}>
            {/* Sub-group header */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-${gc}-500/10 text-${gc}-400 border border-${gc}-500/20`}>
                {codes[0].group}
              </div>
              <h3 className={`text-sm font-bold text-${col}-400 uppercase tracking-wider`}>
                {SUB_LABELS[sub] ?? sub}
              </h3>
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] text-text3">{codes.length} mã</span>
            </div>

            {/* Code cards */}
            <div className="space-y-2">
              {codes.map(c => (
                <div key={c.id} className={`rounded-xl border bg-surface p-4 border-${col}-500/15 hover:border-${col}-500/35 transition-colors`}>
                  <div className="flex flex-wrap items-start gap-x-3 gap-y-1 mb-2">
                    <span className={`font-black text-sm text-${col}-400 shrink-0 font-mono`}>{c.id}</span>
                    <span className="font-bold text-sm text-text">{isVi ? c.topic : c.topicEn}</span>
                    <span className={`ml-auto text-[10px] font-bold text-text3 bg-surface2 px-2 py-0.5 rounded-full border border-border shrink-0`}>{c.src}</span>
                  </div>
                  <p className="text-xs text-text2 leading-relaxed mb-2">{c.def}</p>
                  <p className={`text-[11px] italic text-${col}-300/80 border-l-2 border-${col}-500/30 pl-3`}>{c.quote}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-text3">
          <Search size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{isVi ? 'Không tìm thấy kết quả phù hợp' : 'No matching codes found'}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-[10px] text-text3 uppercase tracking-widest opacity-40">
        {t.footer}
      </div>
    </div>
  );
};

const InfographicView = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* ── HEADER ── */}
      <div className="text-center space-y-2 py-5">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {t.igTitle}
        </h2>
        <p className="text-text2 font-medium">{t.igSub}</p>
      </div>

      {/* ── ROW 1: Key Numbers + 3 Insight Callouts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Key Numbers bar */}
        <div className="lg:col-span-3 grid grid-cols-5 gap-3 py-5 px-6 bg-slate-900 text-white rounded-2xl shadow-inner">
          {[
            { l: t.igKey1, v: "12", i: <MessageCircle size={14} /> },
            { l: t.igKey2, v: "80", i: <Search size={14} /> },
            { l: t.igKey3, v: "10", i: <Lightbulb size={14} /> },
            { l: t.igKey4, v: "3", i: <Users size={14} /> },
            { l: t.igKey5, v: "6", i: <MapPin size={14} /> },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-1">{item.v}</div>
              <div className="text-[9px] uppercase font-bold tracking-wider opacity-70 flex gap-1 items-center justify-center">
                {item.i} {item.l.replace(/^\d+\s/, '')}
              </div>
            </div>
          ))}
        </div>

        {/* Callout 1 — ×2.25 */}
        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Users size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{t.igAmplTitle}</span>
          </div>
          <div className="text-5xl font-black text-purple-400 leading-none">{t.igAmplStat}</div>
          <p className="text-xs text-text2 leading-relaxed">{t.igAmplDesc}</p>
          <p className="text-[11px] italic text-text3 border-l-2 border-purple-500/40 pl-3">{t.igAmplDetail}</p>
        </div>

        {/* Callout 2 — 55% Story */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-blue-400">
            <BrainCircuit size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{t.igTrustTitle}</span>
          </div>
          <div className="text-5xl font-black text-blue-400 leading-none">{t.igTrustStat}</div>
          <p className="text-xs text-text2 leading-relaxed">{t.igTrustDesc}</p>
          <p className="text-[11px] italic text-text3 border-l-2 border-blue-500/40 pl-3">{t.igTrustDetail}</p>
        </div>

        {/* Callout 3 — <40 Gate */}
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-red-400">
            <ShieldAlert size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{t.igGateTitle}</span>
          </div>
          <div className="text-5xl font-black text-red-400 leading-none">{t.igGateStat}</div>
          <p className="text-xs text-text2 leading-relaxed">{t.igGateDesc}</p>
          <p className="text-[11px] italic text-text3 border-l-2 border-red-500/40 pl-3">{t.igGateDetail}</p>
        </div>
      </div>

      {/* ── ROW 2: S→O→R Flow Diagram ── */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Activity size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.igFlowTitle}</h3>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-text3">{t.igFlowSub}</span>
        </div>

        {/* Flow: always flex — column on mobile, row on md+ */}
        <div className="relative">
          {/* items-stretch makes all 3 blocks the same height */}
          <div className="flex flex-col md:flex-row items-stretch gap-2">

            {/* S Block — justify-center vertically so content sits in the middle */}
            <div className="flex-1 rounded-xl bg-blue-500/10 border border-blue-500/30 p-4 text-center flex flex-col justify-center">
              <div className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">[S]</div>
              <div className="text-base font-bold text-text mb-1">{t.igFlowS}</div>
              <div className="text-[11px] text-text3">{t.igFlowSDesc}</div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
              <ArrowRight size={20} className="text-border rotate-90 md:rotate-0" />
            </div>

            {/* O Block — main content top, gate badge bottom */}
            <div className="flex-1 rounded-xl bg-purple-500/10 border border-purple-500/30 p-4 text-center flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-purple-400 mb-1">[O]</div>
                <div className="text-base font-bold text-text mb-1">{t.igFlowO}</div>
                <div className="text-[11px] text-text3">{t.igFlowODesc}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-500/20">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-400 bg-red-500/10 rounded-full px-2 py-1">
                  <ShieldAlert size={10} /> {t.igFlowGate}
                </div>
                <p className="text-[10px] text-text3 mt-1">{t.igFlowGateDesc}</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
              <ArrowRight size={20} className="text-border rotate-90 md:rotate-0" />
            </div>

            {/* R Block — title top, outcomes bottom (mirrors O layout) */}
            <div className="flex-1 rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-center flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-green-400 mb-1">[R]</div>
                <div className="text-base font-bold text-text mb-1">{t.igFlowR}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-green-500/20 space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 size={12} /> {t.igFlowBuy}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-red-400">
                  <Ban size={12} /> {t.igFlowNoBuy}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-amber-400">
                  <Minus size={12} /> {t.igFlowUndecided}
                </div>
              </div>
            </div>

          </div>

          {/* Context modifier bar */}
          <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface2/50 border border-border">
            <Globe size={15} className="text-teal-500 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-500">[C] {t.igContext}</span>
            <span className="text-xs text-text3">{t.igContextDetail}</span>
          </div>
        </div>
      </section>

      {/* ── ROW 3: Customer Journey ── */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500"><Footprints size={20} /></div>
          <h3 className="text-lg font-bold uppercase tracking-widest text-text">{t.igJourneyTitle}</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="relative px-4">
          <div className="absolute top-8 left-4 right-4 h-0.5 bg-gradient-to-r from-slate-200 via-blue-200 to-green-200 dark:from-slate-800 dark:via-blue-900 dark:to-green-900 -z-10 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { icon: <MapPin size={22} />, title: t.igJ1, sub: t.igJ1Sub, color: 'slate' },
              { icon: <Zap size={22} />, title: t.igJ2, sub: t.igJ2Sub, color: 'blue' },
              { icon: <BrainCircuit size={22} />, title: t.igJ3, sub: t.igJ3Sub, color: 'purple' },
              { icon: <Users size={22} />, title: t.igJ4, sub: t.igJ4Sub, color: 'amber' },
              { icon: <Share2 size={22} />, title: t.igJ5, sub: t.igJ5Sub, color: 'green' },
            ].map((item, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-surface border-4 border-${item.color}-500/20 text-${item.color}-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-${item.color}-500`}>
                  {item.icon}
                </div>
                <h4 className={`text-xs font-bold uppercase mb-1 text-${item.color}-500`}>{item.title}</h4>
                <p className="text-[11px] text-text2 leading-tight">{item.sub}</p>
                {index < 4 && <div className="md:hidden mt-3 text-border"><ArrowRight size={18} className="rotate-90" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROW 4: Drivers + Barriers side by side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Drivers */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Zap size={18} /></div>
            <h3 className="text-base font-bold uppercase tracking-widest text-text">{t.igDrivers}</h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-2">
            {[
              { icon: <BrainCircuit size={16} />, title: t.igD1, sub: t.igD1Sub, pct: 44, color: 'blue', gi: lang === 'vi' ? "Kích thích hứng thú và niềm vui" : "Triggers arousal and pleasure" },
              { icon: <Users size={16} />, title: t.igD2, sub: t.igD2Sub, pct: 31, color: 'purple', gi: lang === 'vi' ? "Khuếch đại cảm xúc ×2,25 trong tour" : "Amplifies emotion ×2.25 in tours" },
              { icon: <Package size={16} />, title: t.igD3, sub: t.igD3Sub, pct: 100, color: 'cyan', gi: lang === 'vi' ? "Điều kiện cần để tạo niềm vui" : "Necessary condition for pleasure" },
              { icon: <MessageCircle size={16} />, title: t.igD4, sub: t.igD4Sub, pct: 31, color: 'amber', gi: lang === 'vi' ? "Tâm lý sợ bỏ lỡ khuếch đại mua" : "Fear-of-missing-out amplifies buying" },
              { icon: <LayoutTemplate size={16} />, title: t.igD5, sub: t.igD5Sub, pct: 50, color: 'teal', gi: lang === 'vi' ? "Ấn tượng đầu tiên quyết định" : "First impression is decisive" },
            ].map((d, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl bg-surface border border-${d.color}-500/15 hover:border-${d.color}-500/40 transition-colors`}>
                <div className={`p-1.5 rounded-lg bg-${d.color}-500/10 text-${d.color}-400 shrink-0 mt-0.5`}>{d.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className={`text-xs font-bold text-${d.color}-400 uppercase`}>{d.title}</span>
                    <span className="text-[9px] font-mono text-text3 shrink-0">{d.pct} {lang === 'vi' ? 'mã' : 'codes'}</span>
                  </div>
                  <p className="text-[11px] text-text3 leading-snug">{d.gi}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Barriers + Mechanism stacked */}
        <div className="space-y-6">

          {/* Barriers */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500"><Ban size={18} /></div>
              <h3 className="text-base font-bold uppercase tracking-widest text-text">{t.igBarriers}</h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-2">
              {[
                { icon: <ShieldAlert size={16} />, title: t.igB1, sub: lang === 'vi' ? "Rào cản lớn nhất — chặn đứng mọi giao dịch" : "Biggest barrier — stops all transactions", color: 'red' },
                { icon: <Package size={16} />, title: t.igB2, sub: lang === 'vi' ? "Sợ hải quan, vỡ vụn, cồng kềnh" : "Customs fear, fragility, bulkiness", color: 'amber' },
                { icon: <Info size={16} />, title: t.igB3, sub: lang === 'vi' ? "Không hiểu = không mua" : "Don't understand = won't buy", color: 'slate' },
              ].map((b, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl bg-surface border border-${b.color}-500/15`}>
                  <div className={`p-1.5 rounded-lg bg-${b.color}-500/10 text-${b.color}-400 shrink-0 mt-0.5`}>{b.icon}</div>
                  <div>
                    <div className={`text-xs font-bold text-${b.color}-400 uppercase mb-0.5`}>{b.title}</div>
                    <p className="text-[11px] text-text3">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mechanism */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><Activity size={18} /></div>
              <h3 className="text-base font-bold uppercase tracking-widest text-text">{t.igMechanism}</h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
              {[
                { n: '1', label: t.igM1, sub: t.igM1Sub, color: 'blue' },
                { n: '2', label: t.igM2, sub: t.igM2Sub, color: 'purple' },
                { n: '3', label: t.igM3, sub: t.igM3Sub, color: 'amber' },
              ].map((m) => (
                <div key={m.n} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full bg-${m.color}-500 text-white flex items-center justify-center font-bold text-xs shrink-0`}>{m.n}</div>
                  <div>
                    <div className={`text-xs font-bold text-${m.color}-400 uppercase mb-0.5`}>{m.label}</div>
                    <p className="text-[11px] text-text3">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="text-center text-[10px] text-text3 uppercase tracking-widest opacity-40">
        {t.footer}
      </div>

    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [tab, setTab] = useState<'intro' | 'dashboard' | 'simulator' | 'formulas' | 'infographic' | 'codebook'>('intro');
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
        <div className="flex items-center gap-3">
          <img
            src={uniLogo}
            alt="University Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full"
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold text-text transition-colors">{t.title}</h1>
            <p className="mt-1 text-[10px] md:text-xs text-text2">{t.subtitle}</p>
          </div>
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
            <button
              onClick={() => setTab('codebook')}
              aria-selected={tab === 'codebook'}
              role="tab"
              id="tab-codebook"
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'codebook' ? 'bg-amber-600 text-white shadow-sm' : 'text-text3 hover:text-text2'}`}
            >
              <span className="flex items-center gap-1.5"><Search size={14} /> {t.tabCodebook}</span>
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
        <button onClick={() => setTab('codebook')} aria-selected={tab === 'codebook'} role="tab" id="tab-codebook-mobile" className={`flex-1 py-2 text-xs font-bold rounded-md border ${tab === 'codebook' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-surface border-border text-text3'}`}><Search size={14} className="mx-auto mb-1" />{t.tabCodebook}</button>
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
          <div style={{ display: tab === 'codebook' ? 'block' : 'none' }} role="tabpanel" aria-labelledby="tab-codebook">
            <CodebookView lang={lang} />
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
