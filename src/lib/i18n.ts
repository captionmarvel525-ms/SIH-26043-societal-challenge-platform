// Basic English / Tamil / Hindi UI translation layer.
//
// Scope note: only *interface chrome* is translated — navigation, headings,
// labels, buttons, table headers, filter options and status/category badges.
// Stored report content (titles, descriptions, AI summaries, timelines),
// legal prose, district names, partner organisation names and alert() messages
// intentionally stay in English: the data layer is single-language.

export type Lang = "en" | "ta" | "hi";

export type LanguageOption = { code: Lang; label: string; short: string };

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ta", label: "தமிழ்", short: "TA" },
  { code: "hi", label: "हिंदी", short: "HI" },
];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "ta" || value === "hi";
}

// Flat key → string dictionaries. English doubles as the fallback.
export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    // ---- top ribbon / platform bar ----
    "bar.network": "CIVICFORCE · Smart India Hackathon (SIH-26043) Societal Action Network",
    "bar.emergency": "Emergency Civic Desk:",
    "bar.adminMode": "🛡️ Administrator Mode",
    "bar.citizenMode": "Public Citizen Mode",

    // ---- header ----
    "header.tagline": "Tamil Nadu Societal Problem & Resolution Engine",
    "nav.home": "Home",
    "nav.challenges": "Browse Challenges",
    "nav.map": "Live District Map",
    "nav.admin": "Admin Queue",
    "header.report": "Report Problem",
    "header.signIn": "Admin Sign-in",
    "header.signOut": "Sign Out",
    "header.themeToDark": "Switch to night mode",
    "header.themeToLight": "Switch to day mode",
    "header.language": "Language",

    // ---- footer ----
    "footer.network": "· Tamil Nadu Societal Action Network (SIH-26043)",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.register": "Public Register",
    "footer.rights": "© 2026 CIVICFORCE Platform",

    // ---- home ----
    "home.heroBadge": "Action-Driven Civic Tech Platform",
    "home.h1a": "Mobilizing Solutions for",
    "home.h1b": "Societal Challenges",
    "home.hero.p1":
      "CIVICFORCE connects citizen-reported societal issues directly with leading universities, corporate industry R&D, and municipal departments. Type your location to automatically point the live map and track verifiable resolution.",
    "home.ctaReport": "Report a Problem (Auto-pointing Map)",
    "home.ctaBrowse": "Browse Challenge Register",
    "home.ctaMap": "Live District Map",
    "home.pipeline.h2": "How Societal Problems Travel to Resolution",
    "home.pipeline.p":
      "4 transparent stages connecting citizens, AI classification, and expert partner institutions.",
    "home.step1.title": "Citizen Submits",
    "home.step1.body":
      "Type your location — map automatically points to it. No category choice needed.",
    "home.step2.title": "Automated AI Triage",
    "home.step2.body":
      "AI tags category, calculates urgency & matches university or industry partner.",
    "home.step3.title": "Admin Assignment",
    "home.step3.body":
      "Official reviewer confirms classification and assigns to expert partner.",
    "home.step4.title": "Public Live Timeline",
    "home.step4.body":
      "Citizens track real-time resolution with private contact shielding.",
    "home.stat.total": "Total Challenges in DB",
    "home.stat.resolved": "Problems Resolved",
    "home.stat.districts": "Active Districts",
    "home.stat.rate": "Triage Resolution Rate",
    "home.recent.h2": "Recent Societal Challenges",
    "home.recent.p": "Live citizen reports from across Tamil Nadu",
    "home.recent.viewAll": "View All Reports →",

    // ---- report page / form ----
    "report.h1": "Report a Societal Challenge",
    "report.intro.a": "Enter where the issue is. The live map will",
    "report.intro.strong": "automatically point directly to your location",
    "report.intro.b": "without you having to hunt or click manually.",
    "report.f.title": "Problem Title",
    "report.f.titlePh":
      "e.g. Major water pipeline burst flooding school road junction",
    "report.f.description": "Detailed Description",
    "report.f.descriptionPh":
      "Describe the size of damage, how long it has persisted, and the direct danger to safety, traffic, or water supply...",
    "report.f.district": "District (Tamil Nadu)",
    "report.f.districtPh": "-- Choose District (Map will auto-center) --",
    "report.f.pincode": "Pincode (6-digit)",
    "report.f.pincodePh": "e.g. 600018",
    "report.f.locality": "Enter Location of Issue (Map Auto-points Here)",
    "report.f.localityPh":
      "Type area or street name (e.g. Anna Salai, Ukkadam, Srirangam, Gandhipuram, Periyar Bus Stand)...",
    "report.f.tryClicking": "Try clicking:",
    "report.f.pinned": "📍 Automatically Pinned to:",
    "report.f.map": "Live Interactive Map",
    "report.f.mapHelp":
      "The map automatically glides to the location as you type. You can also drag the pin to adjust.",
    "report.f.photos": "Attach Photographs (Up to 3, max 5MB)",
    "report.f.photosCta": "Click to attach photo evidence",
    "report.f.photo": "Photo",
    "report.f.photoCount": "{n} of 3 photos added",
    "report.f.aiNotice": "🤖 Automated AI Triage:",
    "report.f.aiNoticeBody":
      "Category selection is not required. Our AI engine automatically classifies the problem category, urgency level, and suggested partner type upon submission.",
    "report.f.contact": "Optional Citizen Contact",
    "report.f.confidential": "🔒 Strictly Confidential",
    "report.f.name": "Full Name (optional)",
    "report.f.phone": "Phone Number (optional)",
    "report.f.email": "Email Address (optional)",
    "report.f.contactNote":
      "Your contact details are never shown on public reports. Only authorized reviewers can view them.",
    "report.f.submit": "🚀 Submit Report & Run AI Triage",
    "report.f.cancel": "Cancel",

    // ---- challenges register ----
    "ch.h1": "Public Challenge Register",
    "ch.p": "Browse and search societal challenges submitted across Tamil Nadu",
    "ch.searchPh": "Search title, description, or landmark...",
    "ch.allDistricts": "All Districts",
    "ch.allCategories": "All Categories",
    "ch.allStatuses": "All Statuses",
    "ch.reset": "Reset Filters",
    "ch.empty": "No reports match your filters",

    // ---- challenge detail ----
    "detail.back": "← Back to All Reports",
    "detail.notFound": "No challenge found for tracking ID",
    "detail.notFoundP": "The report may have been removed, or the tracking link is incorrect.",
    "detail.copy": "🔗 Copy Tracking Link",
    "detail.description": "Problem Description",
    "detail.district": "District:",
    "detail.location": "Location:",
    "detail.coords": "Pinned Coordinates:",
    "detail.pincode": "Pincode:",
    "detail.submitted": "Submitted:",
    "detail.noneSpecified": "None specified",
    "detail.ai": "AI Triage Assessment",
    "detail.aiSuggested": "AI Suggested",
    "detail.partner": "Assigned Resolution Partner",
    "detail.timeline": "Status Timeline",

    // ---- live map ----
    "map.h1": "Live Interactive Tamil Nadu Map",
    "map.p":
      "Fully operational live OpenStreetMap rendering active incident pins and district clusters. Click any pin to inspect the report.",
    "map.pins": "Pins:",
    "map.normalPin": "Normal Incident",
    "map.urgentPin": "High Urgency Incident",
    "map.clusterPin": "District Cluster",
    "map.attribution": "Map data ©",
    "map.attributionAfter": "contributors",
    "map.centers": "Quick District Centers (Click to Smooth Zoom)",
    "map.reportCount": "{n} reports",
    "map.reportCountOne": "{n} report",
    "map.viewChallenge": "View Full Challenge →",

    // ---- login ----
    "login.h1": "Official Admin Sign-in",
    "login.p": "CIVICFORCE Reviewer Command Queue",
    "login.error": "❌ Access Denied: Incorrect official email or password.",
    "login.email": "Administrator Official Email",
    "login.password": "Password",
    "login.creds": "🔑 Admin Credentials:",
    "login.emailLabel": "Email:",
    "login.passwordLabel": "Password:",
    "login.submit": "Verify Password & Unlock Queue →",

    // ---- admin queue ----
    "admin.badge": "Verified Official Admin Session",
    "admin.h1": "Admin Review Queue",
    "admin.loggedInAs": "Logged in as",
    "admin.coordinator": "State Coordinator (Admin)",
    "admin.signOut": "Sign Out",
    "admin.allQueue": "All Queue",
    "admin.thId": "ID",
    "admin.thTitle": "Problem Title",
    "admin.thDistrict": "District",
    "admin.thCategory": "AI Category",
    "admin.thUrgency": "Urgency",
    "admin.thStatus": "Status",
    "admin.thContact": "Citizen Contact (Confidential)",
    "admin.thAction": "Action",
    "admin.anonymous": "Anonymous",
    "admin.review": "Review →",

    // ---- admin review ----
    "review.back": "← Back to Admin Queue",
    "review.notFound": "Report not found",
    "review.confidential": "🔒 Confidential Citizen Contact (Admin Eyes Only)",
    "review.protected": "Protected",
    "review.citizen": "Citizen:",
    "review.phone": "Phone:",
    "review.email": "Email:",
    "review.notGiven": "Not given",
    "review.h2": "🛠️ AI Triage Correction & Partner Assignment",
    "review.category": "Category",
    "review.urgencyPriority": "Urgency Priority",
    "review.summary": "AI Summary (Editable)",
    "review.partner": "Assign Resolution Partner",
    "review.noPartner": "-- No partner assigned yet --",
    "review.status": "Status",
    "review.timelineUpdate": "Public Timeline Update",
    "review.timelinePh": "e.g. Field inspection completed. Repair scheduled within 48 hours.",
    "review.save": "💾 Save Changes & Update Timeline",
    "review.cancel": "Cancel",
    "review.grpGov": "Government Offices",
    "review.grpUni": "Universities & Research Institutes",
    "review.grpCsr": "Industry & Corporate CSR",

    // ---- legal pages ----
    "privacy.h1": "Privacy Policy",
    "privacy.updated":
      "Last updated: October 2026 · CIVICFORCE Tamil Nadu Societal Action Network",
    "terms.h1": "Terms of Service",
    "terms.updated":
      "Last updated: October 2026 · CIVICFORCE Tamil Nadu Societal Action Network",
    "common.returnHome": "← Return Home",

    // ---- urgency ----
    "urg.high": "High Urgency",
    "urg.normal": "Normal",
    "urg.normalPriority": "Normal Priority",
    "urg.highPriority": "⚡ High Urgency",
    "urg.highShort": "⚡ High",

    // ---- categories ----
    "cat.roads": "Roads & footpaths",
    "cat.water": "Water & drainage",
    "cat.lighting": "Street lighting",
    "cat.waste": "Waste & sanitation",
    "cat.spaces": "Public spaces",
    "cat.other": "Other",

    // ---- statuses ----
    "status.new": "New",
    "status.underReview": "Under review",
    "status.assigned": "Assigned",
    "status.inProgress": "In progress",
    "status.resolved": "Resolved",
    "status.rejected": "Rejected",
  },

  ta: {
    "bar.network": "CIVICFORCE · ஸ்மார்ட் இந்தியா ஹேக்கத்தான் (SIH-26043) சமூகச் செயல் வலையமைப்பு",
    "bar.emergency": "அவசர குடிமை உதவி மையம்:",
    "bar.adminMode": "🛡️ நிர்வாகி பயன்முறை",
    "bar.citizenMode": "பொதுக் குடிமகன் பயன்முறை",

    "header.tagline": "தமிழ்நாடு சமூகப் பிரச்சினை மற்றும் தீர்வு இயந்திரம்",
    "nav.home": "முகப்பு",
    "nav.challenges": "சவால்களை உலாவு",
    "nav.map": "நேரடி மாவட்ட வரைபடம்",
    "nav.admin": "நிர்வாக வரிசை",
    "header.report": "பிரச்சினையைப் புகாரளி",
    "header.signIn": "நிர்வாகி உள்நுழைவு",
    "header.signOut": "வெளியேறு",
    "header.themeToDark": "இரவுப் பயன்முறைக்கு மாறு",
    "header.themeToLight": "பகற்பயன்முறைக்கு மாறு",
    "header.language": "மொழி",

    "footer.network": "· தமிழ்நாடு சமூகச் செயல் வலையமைப்பு (SIH-26043)",
    "footer.privacy": "தனியுரிமைக் கொள்கை",
    "footer.terms": "சேவை விதிமுறைகள்",
    "footer.register": "பொதுப் பதிவேடு",
    "footer.rights": "© 2026 CIVICFORCE தளம்",

    "home.heroBadge": "செயலை நோக்கிய குடிமைத் தொழில்நுட்பத் தளம்",
    "home.h1a": "தமிழ்நாட்டின் சமூகச் சவால்களுக்கு",
    "home.h1b": "தீர்வுகளை ஒருங்கிணைத்தல்",
    "home.hero.p1":
      "CIVICFORCE, குடிமக்கள் புகாரளிக்கும் சமூகப் பிரச்சினைகளை முன்னணி பல்கலைக்கழகங்கள், நிறுவன ஆராய்ச்சி மையங்கள் மற்றும் நகராட்சித் துறைகளுடன் நேரடியாக இணைக்கிறது. நேரடி வரைபடம் தானாகச் சுட்டும் வகையில் உங்கள் இடத்தின் பெயரை உள்ளிடுங்கள்.",
    "home.ctaReport": "பிரச்சினையைப் புகாரளி (தானியங்கி வரைபடம்)",
    "home.ctaBrowse": "சவால் பதிவேட்டை உலாவு",
    "home.ctaMap": "நேரடி மாவட்ட வரைபடம்",
    "home.pipeline.h2": "சமூகப் பிரச்சினைகள் தீர்வை நோக்கி எவ்வாறு நகர்கின்றன",
    "home.pipeline.p":
      "குடிமக்கள், AI வகைப்பாடு மற்றும் நிபுணர் கூட்டாளர் நிறுவனங்களை இணைக்கும் 4 வெளிப்படையான நிலைகள்.",
    "home.step1.title": "குடிமகன் சமர்ப்பிக்கிறார்",
    "home.step1.body":
      "உங்கள் இடத்தை உள்ளிடுங்கள் — வரைபடம் தானாகச் சுட்டும். வகையைத் தேர்ந்தெடுக்கத் தேவையில்லை.",
    "home.step2.title": "தானியங்கி AI வகைப்பாடு",
    "home.step2.body":
      "AI வகையைக் குறியிட்டு, அவசர அளவைக் கணக்கிட்டு, பல்கலைக்கழகம் அல்லது தொழில் கூட்டாளரைப் பொருத்துகிறது.",
    "home.step3.title": "நிர்வாக ஒதுக்கீடு",
    "home.step3.body":
      "அதிகாரப்பூர்வ மதிப்பாய்வாளர் வகைப்பாட்டை உறுதிப்படுத்தி நிபுணர் கூட்டாளருக்கு ஒதுக்குகிறார்.",
    "home.step4.title": "பொது நேரடி காலவரிசை",
    "home.step4.body":
      "குடிமக்கள் தனிப்பட்ட தொடர்புத் தகவல் பாதுகாப்புடன் நேரடித் தீர்வை கண்காணிக்கின்றனர்.",
    "home.stat.total": "பதிவேட்டில் உள்ள மொத்த சவால்கள்",
    "home.stat.resolved": "தீர்க்கப்பட்ட பிரச்சினைகள்",
    "home.stat.districts": "செயலில் உள்ள மாவட்டங்கள்",
    "home.stat.rate": "வகைப்பாட்டுத் தீர்வு விகிதம்",
    "home.recent.h2": "சமீபத்திய சமூகச் சவால்கள்",
    "home.recent.p": "தமிழ்நாடு முழுவதிலுமிருந்து நேரடிக் குடிமகன் புகார்கள்",
    "home.recent.viewAll": "அனைத்து புகார்களையும் பார்க்க →",

    "report.h1": "சமூகச் சவாலைப் புகாரளி",
    "report.intro.a": "பிரச்சினை எங்குள்ளது என்பதை உள்ளிடுங்கள். நேரடி வரைபடம்",
    "report.intro.strong": "உங்கள் இடத்தைத் தானாகச் சுட்டும்",
    "report.intro.b": "நீங்கள் தேடவோ கைமுறையாகக் கிளிக் செய்யவோ தேவை இல்லை.",
    "report.f.title": "பிரச்சினைத் தலைப்பு",
    "report.f.titlePh":
      "எ.கா. பள்ளிச் சாலை சந்திப்பில் பெரிய குடிநீர் குழாய் வெடித்து வெள்ளம்",
    "report.f.description": "விரிவான விவரம்",
    "report.f.descriptionPh":
      "சேதத்தின் அளவு, எவ்வளவு காலமாக நீடிக்கிறது, பாதுகாப்பு, போக்குவரத்து அல்லது குடிநீர் விநியோகத்திற்கு உள்ள நேரடி ஆபத்து ஆகியவற்றை விவரிக்கவும்...",
    "report.f.district": "மாவட்டம் (தமிழ்நாடு)",
    "report.f.districtPh": "-- மாவட்டத்தைத் தேர்ந்தெடுக்கவும் (வரைபடம் தானாக மையப்படுத்தும்) --",
    "report.f.pincode": "அஞ்சல் குறியீடு (6 இலக்கம்)",
    "report.f.pincodePh": "எ.கா. 600018",
    "report.f.locality": "பிரச்சினை உள்ள இடத்தை உள்ளிடுங்கள் (வரைபடம் தானாகச் சுட்டும்)",
    "report.f.localityPh":
      "பகுதி அல்லது தெரு பெயரை உள்ளிடுங்கள் (எ.கா. Anna Salai, Ukkadam, Srirangam, Gandhipuram, Periyar Bus Stand)...",
    "report.f.tryClicking": "முயற்சித்துப் பாருங்கள்:",
    "report.f.pinned": "📍 தானாகப் பொருத்தப்பட்ட இடம்:",
    "report.f.map": "நேரடி ஊடாடும் வரைபடம்",
    "report.f.mapHelp":
      "நீங்கள் தட்டச்சு செய்யும்போது வரைபடம் தானாக அந்த இடத்திற்குச் செல்லும். பின்னை இழுத்தும் சரிசெய்யலாம்.",
    "report.f.photos": "புகைப்படங்களை இணைக்கவும் (அதிகபட்சம் 3, 5MB வரை)",
    "report.f.photosCta": "புகைப்படச் சான்றை இணைக்க கிளிக் செய்யவும்",
    "report.f.photo": "புகைப்படம்",
    "report.f.photoCount": "{n} / 3 புகைப்படங்கள் சேர்க்கப்பட்டன",
    "report.f.aiNotice": "🤖 தானியங்கி AI வகைப்பாடு:",
    "report.f.aiNoticeBody":
      "வகையைத் தேர்ந்தெடுக்கத் தேவையில்லை. சமர்ப்பிக்கும்போது எங்கள் AI இயந்திரம் பிரச்சினை வகை, அவசர அளவு மற்றும் பரிந்துரைக்கப்பட்ட கூட்டாளர் வகையைத் தானாக வகைப்படுத்தும்.",
    "report.f.contact": "விருப்பப்பட்ட குடிமகன் தொடர்பு",
    "report.f.confidential": "🔒 முற்றிலும் ரகசியம்",
    "report.f.name": "முழுப் பெயர் (விருப்பம்)",
    "report.f.phone": "தொலைபேசி எண் (விருப்பம்)",
    "report.f.email": "மின்னஞ்சல் முகவரி (விருப்பம்)",
    "report.f.contactNote":
      "உங்கள் தொடர்புத் தகவல்கள் பொதுப் புகார்களில் ஒருபோதும் காட்டப்படாது. அதிகாரம் பெற்ற மதிப்பாய்வாளர்கள் மட்டுமே அவற்றைப் பார்க்க முடியும்.",
    "report.f.submit": "🚀 புகாரைச் சமர்ப்பித்து AI வகைப்பாட்டை இயக்கு",
    "report.f.cancel": "ரத்து செய்",

    "ch.h1": "பொதுச் சவால் பதிவேடு",
    "ch.p": "தமிழ்நாடு முழுவதும் சமர்ப்பிக்கப்பட்ட சமூகச் சவால்களை உலாவி தேடுங்கள்",
    "ch.searchPh": "தலைப்பு, விவரம் அல்லது அடையாளத்தைத் தேடுங்கள்...",
    "ch.allDistricts": "அனைத்து மாவட்டங்கள்",
    "ch.allCategories": "அனைத்து வகைகள்",
    "ch.allStatuses": "அனைத்து நிலைகள்",
    "ch.reset": "வடிகட்டிகளை மீட்டமை",
    "ch.empty": "உங்கள் வடிகட்டிகளுக்குப் பொருந்தும் புகார்கள் இல்லை",

    "detail.back": "← அனைத்து புகார்களுக்கும் திரும்பு",
    "detail.notFound": "கண்காணிப்பு ID-க்கு சவால் எதுவும் கிடைக்கவில்லை",
    "detail.notFoundP": "புகார் நீக்கப்பட்டிருக்கலாம் அல்லது கண்காணிப்பு இணைப்பு தவறாக இருக்கலாம்.",
    "detail.copy": "🔗 கண்காணிப்பு இணைப்பை நகலெடு",
    "detail.description": "பிரச்சினை விவரம்",
    "detail.district": "மாவட்டம்:",
    "detail.location": "இடம்:",
    "detail.coords": "பொருத்தப்பட்ட ஆயத்தொலைவுகள்:",
    "detail.pincode": "அஞ்சல் குறியீடு:",
    "detail.submitted": "சமர்ப்பிக்கப்பட்டது:",
    "detail.noneSpecified": "குறிப்பிடப்படவில்லை",
    "detail.ai": "AI வகைப்பாட்டு மதிப்பீடு",
    "detail.aiSuggested": "AI பரிந்துரை",
    "detail.partner": "ஒதுக்கப்பட்ட தீர்வுக் கூட்டாளர்",
    "detail.timeline": "நிலைக் காலவரிசை",

    "map.h1": "நேரடி ஊடாடும் தமிழ்நாடு வரைபடம்",
    "map.p":
      "செயலில் உள்ள சம்பவப் பின்கள் மற்றும் மாவட்டக் குழுக்களைக் காட்டும் முழுமையாக இயங்கும் நேரடி OpenStreetMap. புகாரைப் பார்க்க எந்தப் பின்னையும் கிளிக் செய்யவும்.",
    "map.pins": "பின்கள்:",
    "map.normalPin": "சாதாரண சம்பவம்",
    "map.urgentPin": "அதி அவசர சம்பவம்",
    "map.clusterPin": "மாவட்டக் குழு",
    "map.attribution": "வரைபடத் தரவு ©",
    "map.attributionAfter": "பங்களிப்பாளர்கள்",
    "map.centers": "விரைவு மாவட்ட மையங்கள் (மென்மையாக ஜூம் செய்ய கிளிக் செய்யவும்)",
    "map.reportCount": "{n} புகார்கள்",
    "map.reportCountOne": "{n} புகார்",
    "map.viewChallenge": "முழுச் சவாலைப் பார்க்க →",

    "login.h1": "அதிகாரப்பூர்வ நிர்வாகி உள்நுழைவு",
    "login.p": "CIVICFORCE மதிப்பாய்வாளர் கட்டளை வரிசை",
    "login.error": "❌ அணுகல் மறுக்கப்பட்டது: அதிகாரப்பூர்வ மின்னஞ்சல் அல்லது கடவுச்சொல் தவறு.",
    "login.email": "நிர்வாகி அதிகாரப்பூர்வ மின்னஞ்சல்",
    "login.password": "கடவுச்சொல்",
    "login.creds": "🔑 நிர்வாகி சான்றுகள்:",
    "login.emailLabel": "மின்னஞ்சல்:",
    "login.passwordLabel": "கடவுச்சொல்:",
    "login.submit": "கடவுச்சொல்லைச் சரிபார்த்து வரிசையைத் திற →",

    "admin.badge": "சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ நிர்வாக அமர்வு",
    "admin.h1": "நிர்வாக மதிப்பாய்வு வரிசை",
    "admin.loggedInAs": "உள்நுழைந்தவர்",
    "admin.coordinator": "மாநில ஒருங்கிணைப்பாளர் (நிர்வாகி)",
    "admin.signOut": "வெளியேறு",
    "admin.allQueue": "முழு வரிசை",
    "admin.thId": "ID",
    "admin.thTitle": "பிரச்சினைத் தலைப்பு",
    "admin.thDistrict": "மாவட்டம்",
    "admin.thCategory": "AI வகை",
    "admin.thUrgency": "அவசரம்",
    "admin.thStatus": "நிலை",
    "admin.thContact": "குடிமகன் தொடர்பு (ரகசியம்)",
    "admin.thAction": "செயல்",
    "admin.anonymous": "அநாமதேயம்",
    "admin.review": "மதிப்பாய்வு →",

    "review.back": "← நிர்வாக வரிசைக்குத் திரும்பு",
    "review.notFound": "புகார் கிடைக்கவில்லை",
    "review.confidential": "🔒 ரகசிய குடிமகன் தொடர்பு (நிர்வாகிகளுக்கு மட்டும்)",
    "review.protected": "பாதுகாக்கப்பட்டது",
    "review.citizen": "குடிமகன்:",
    "review.phone": "தொலைபேசி:",
    "review.email": "மின்னஞ்சல்:",
    "review.notGiven": "வழங்கப்படவில்லை",
    "review.h2": "🛠️ AI வகைப்பாட்டுத் திருத்தம் & கூட்டாளர் ஒதுக்கீடு",
    "review.category": "வகை",
    "review.urgencyPriority": "அவசர முன்னுரிமை",
    "review.summary": "AI சுருக்கம் (திருத்தக்கூடியது)",
    "review.partner": "தீர்வுக் கூட்டாளரை ஒதுக்கு",
    "review.noPartner": "-- இன்னும் கூட்டாளர் ஒதுக்கப்படவில்லை --",
    "review.status": "நிலை",
    "review.timelineUpdate": "பொது காலவரிசைப் புதுப்பிப்பு",
    "review.timelinePh": "எ.கா. கள ஆய்வு முடிந்தது. 48 மணி நேரத்தில் பழுது நீக்கம் திட்டமிடப்பட்டுள்ளது.",
    "review.save": "💾 மாற்றங்களைச் சேமித்து காலவரிசையைப் புதுப்பி",
    "review.cancel": "ரத்து செய்",
    "review.grpGov": "அரசு அலுவலகங்கள்",
    "review.grpUni": "பல்கலைக்கழகங்கள் & ஆராய்ச்சி நிறுவனங்கள்",
    "review.grpCsr": "தொழில் & நிறுவன CSR",

    "privacy.h1": "தனியுரிமைக் கொள்கை",
    "privacy.updated":
      "கடைசி புதுப்பிப்பு: அக்டோபர் 2026 · CIVICFORCE தமிழ்நாடு சமூகச் செயல் வலையமைப்பு",
    "terms.h1": "சேவை விதிமுறைகள்",
    "terms.updated":
      "கடைசி புதுப்பிப்பு: அக்டோபர் 2026 · CIVICFORCE தமிழ்நாடு சமூகச் செயல் வலையமைப்பு",
    "common.returnHome": "← முகப்பிற்குத் திரும்பு",

    "urg.high": "அதி அவசரம்",
    "urg.normal": "சாதாரணம்",
    "urg.normalPriority": "சாதாரண முன்னுரிமை",
    "urg.highPriority": "⚡ அதி அவசரம்",
    "urg.highShort": "⚡ அதிகம்",

    "cat.roads": "சாலைகள் & நடைபாதைகள்",
    "cat.water": "நீர் & வடிகால்",
    "cat.lighting": "தெரு விளக்குகள்",
    "cat.waste": "கழிவு & சுகாதாரம்",
    "cat.spaces": "பொது இடங்கள்",
    "cat.other": "மற்றவை",

    "status.new": "புதியது",
    "status.underReview": "மதிப்பாய்வில்",
    "status.assigned": "ஒதுக்கப்பட்டது",
    "status.inProgress": "நடைபெறுகிறது",
    "status.resolved": "தீர்க்கப்பட்டது",
    "status.rejected": "நிராகரிக்கப்பட்டது",
  },

  hi: {
    "bar.network": "CIVICFORCE · स्मार्ट इंडिया हैकाथॉन (SIH-26043) सामाजिक कार्य नेटवर्क",
    "bar.emergency": "आपातकालीन नागरिक डेस्क:",
    "bar.adminMode": "🛡️ व्यवस्थापक मोड",
    "bar.citizenMode": "सार्वजनिक नागरिक मोड",

    "header.tagline": "तमिलनाडु सामाजिक समस्या और समाधान इंजन",
    "nav.home": "होम",
    "nav.challenges": "चुनौतियाँ देखें",
    "nav.map": "लाइव जिला मानचित्र",
    "nav.admin": "प्रशासनिक कतार",
    "header.report": "समस्या की रिपोर्ट करें",
    "header.signIn": "एडमिन साइन-इन",
    "header.signOut": "साइन आउट",
    "header.themeToDark": "रात मोड पर स्विच करें",
    "header.themeToLight": "दिन मोड पर स्विच करें",
    "header.language": "भाषा",

    "footer.network": "· तमिलनाडु सामाजिक कार्य नेटवर्क (SIH-26043)",
    "footer.privacy": "गोपनीयता नीति",
    "footer.terms": "सेवा की शर्तें",
    "footer.register": "सार्वजनिक रजिस्टर",
    "footer.rights": "© 2026 CIVICFORCE प्लेटफ़ॉर्म",

    "home.heroBadge": "कार्रवाई-आधारित सिविक टेक प्लेटफ़ॉर्म",
    "home.h1a": "तमिलनाडु की सामाजिक चुनौतियों के लिए",
    "home.h1b": "समाधान जुटाना",
    "home.hero.p1":
      "CIVICFORCE नागरिकों द्वारा दर्ज सामाजिक समस्याओं को सीधे प्रमुख विश्वविद्यालयों, कॉर्पोरेट उद्योग अनुसंधान और नगरपालिका विभागों से जोड़ता है। लाइव मानचित्र को स्वतः इंगित करने के लिए अपना स्थान टाइप करें।",
    "home.ctaReport": "समस्या की रिपोर्ट करें (स्वतः-इंगित मानचित्र)",
    "home.ctaBrowse": "चुनौती रजिस्टर देखें",
    "home.ctaMap": "लाइव जिला मानचित्र",
    "home.pipeline.h2": "सामाजिक समस्याएँ समाधान तक कैसे पहुँचती हैं",
    "home.pipeline.p":
      "नागरिकों, AI वर्गीकरण और विशेषज्ञ साझेदार संस्थानों को जोड़ने वाले 4 पारदर्शी चरण।",
    "home.step1.title": "नागरिक जमा करता है",
    "home.step1.body":
      "अपना स्थान टाइप करें — मानचित्र स्वतः उस पर इंगित करेगा। श्रेणी चुनने की आवश्यकता नहीं।",
    "home.step2.title": "स्वचालित AI ट्राइज",
    "home.step2.body":
      "AI श्रेणी टैग करता है, तात्कालिकता आँकता है और विश्वविद्यालय या उद्योग साझेदार मिलाता है।",
    "home.step3.title": "प्रशासनिक असाइनमेंट",
    "home.step3.body":
      "आधिकारिक समीक्षक वर्गीकरण की पुष्टि करता है और विशेषज्ञ साझेदार को सौंपता है।",
    "home.step4.title": "सार्वजनिक लाइव टाइमलाइन",
    "home.step4.body":
      "नागरिक निजी संपर्क सुरक्षा के साथ वास्तविक समय में समाधान ट्रैक करते हैं।",
    "home.stat.total": "डेटाबेस में कुल चुनौतियाँ",
    "home.stat.resolved": "हल की गई समस्याएँ",
    "home.stat.districts": "सक्रिय जिले",
    "home.stat.rate": "ट्राइज समाधान दर",
    "home.recent.h2": "हाल की सामाजिक चुनौतियाँ",
    "home.recent.p": "तमिलनाडु भर से लाइव नागरिक रिपोर्टें",
    "home.recent.viewAll": "सभी रिपोर्टें देखें →",

    "report.h1": "सामाजिक चुनौती की रिपोर्ट करें",
    "report.intro.a": "बताएँ कि समस्या कहाँ है। लाइव मानचित्र",
    "report.intro.strong": "स्वतः सीधे आपके स्थान पर इंगित करेगा",
    "report.intro.b": "आपको खोजने या मैन्युअल रूप से क्लिक करने की आवश्यकता नहीं है।",
    "report.f.title": "समस्या शीर्षक",
    "report.f.titlePh":
      "जैसे स्कूल रोड चौराहे पर बड़ी पानी पाइप फटने से बाढ़",
    "report.f.description": "विस्तृत विवरण",
    "report.f.descriptionPh":
      "क्षति का आकार, समस्या कितने समय से है, और सुरक्षा, यातायात या जलापूर्ति को सीधा खतरा — वर्णन करें...",
    "report.f.district": "जिला (तमिलनाडु)",
    "report.f.districtPh": "-- जिला चुनें (मानचित्र स्वतः केंद्रित होगा) --",
    "report.f.pincode": "पिनकोड (6 अंक)",
    "report.f.pincodePh": "जैसे 600018",
    "report.f.locality": "समस्या का स्थान दर्ज करें (मानचित्र स्वतः इंगित करेगा)",
    "report.f.localityPh":
      "क्षेत्र या सड़क का नाम टाइप करें (जैसे Anna Salai, Ukkadam, Srirangam, Gandhipuram, Periyar Bus Stand)...",
    "report.f.tryClicking": "आज़माकर देखें:",
    "report.f.pinned": "📍 स्वतः पिन किया गया:",
    "report.f.map": "लाइव इंटरैक्टिव मानचित्र",
    "report.f.mapHelp":
      "टाइप करते ही मानचित्र स्वतः उस स्थान पर चला जाता है। आप पिन को खींचकर भी समायोजित कर सकते हैं।",
    "report.f.photos": "फ़ोटो संलग्न करें (अधिकतम 3, 5MB तक)",
    "report.f.photosCta": "फ़ोटो प्रमाण संलग्न करने के लिए क्लिक करें",
    "report.f.photo": "फ़ोटो",
    "report.f.photoCount": "{n} / 3 फ़ोटो जोड़े गए",
    "report.f.aiNotice": "🤖 स्वचालित AI ट्राइज:",
    "report.f.aiNoticeBody":
      "श्रेणी चुनने की आवश्यकता नहीं है। जमा करने पर हमारा AI इंजन समस्या की श्रेणी, तात्कालिकता स्तर और सुझाए गए साझेदार प्रकार को स्वतः वर्गीकृत करता है।",
    "report.f.contact": "वैकल्पिक नागरिक संपर्क",
    "report.f.confidential": "🔒 पूर्णतः गोपनीय",
    "report.f.name": "पूरा नाम (वैकल्पिक)",
    "report.f.phone": "फ़ोन नंबर (वैकल्पिक)",
    "report.f.email": "ईमेल पता (वैकल्पिक)",
    "report.f.contactNote":
      "आपके संपर्क विवरण सार्वजनिक रिपोर्ट में कभी नहीं दिखाए जाते। केवल अधिकृत समीक्षक ही उन्हें देख सकते हैं।",
    "report.f.submit": "🚀 रिपोर्ट जमा करें और AI ट्राइज चलाएँ",
    "report.f.cancel": "रद्द करें",

    "ch.h1": "सार्वजनिक चुनौती रजिस्टर",
    "ch.p": "तमिलनाडु भर में दर्ज सामाजिक चुनौतियाँ देखें और खोजें",
    "ch.searchPh": "शीर्षक, विवरण या लैंडमार्क खोजें...",
    "ch.allDistricts": "सभी जिले",
    "ch.allCategories": "सभी श्रेणियाँ",
    "ch.allStatuses": "सभी स्थितियाँ",
    "ch.reset": "फ़िल्टर रीसेट करें",
    "ch.empty": "आपके फ़िल्टर से मेल खाती कोई रिपोर्ट नहीं",

    "detail.back": "← सभी रिपोर्टों पर वापस जाएँ",
    "detail.notFound": "ट्रैकिंग ID के लिए कोई चुनौती नहीं मिली",
    "detail.notFoundP": "रिपोर्ट हटाई गई हो सकती है, या ट्रैकिंग लिंक गलत है।",
    "detail.copy": "🔗 ट्रैकिंग लिंक कॉपी करें",
    "detail.description": "समस्या विवरण",
    "detail.district": "जिला:",
    "detail.location": "स्थान:",
    "detail.coords": "पिन किए गए निर्देशांक:",
    "detail.pincode": "पिनकोड:",
    "detail.submitted": "जमा किया गया:",
    "detail.noneSpecified": "उल्लेख नहीं",
    "detail.ai": "AI ट्राइज मूल्यांकन",
    "detail.aiSuggested": "AI सुझाव",
    "detail.partner": "असाइन किया गया समाधान साझेदार",
    "detail.timeline": "स्थिति टाइमलाइन",

    "map.h1": "लाइव इंटरैक्टिव तमिलनाडु मानचित्र",
    "map.p":
      "सक्रिय घटना पिन और जिला क्लस्टर दिखाने वाला पूर्णतः कार्यशील लाइव OpenStreetMap। रिपोर्ट देखने के लिए कोई भी पिन क्लिक करें।",
    "map.pins": "पिन:",
    "map.normalPin": "सामान्य घटना",
    "map.urgentPin": "उच्च तात्कालिकता घटना",
    "map.clusterPin": "जिला क्लस्टर",
    "map.attribution": "मानचित्र डेटा ©",
    "map.attributionAfter": "योगदानकर्ता",
    "map.centers": "त्वरित जिला केंद्र (स्मूथ ज़ूम के लिए क्लिक करें)",
    "map.reportCount": "{n} रिपोर्टें",
    "map.reportCountOne": "{n} रिपोर्ट",
    "map.viewChallenge": "पूरी चुनौती देखें →",

    "login.h1": "आधिकारिक एडमिन साइन-इन",
    "login.p": "CIVICFORCE समीक्षक कमांड कतार",
    "login.error": "❌ पहुँच अस्वीकृत: आधिकारिक ईमेल या पासवर्ड गलत।",
    "login.email": "व्यवस्थापक आधिकारिक ईमेल",
    "login.password": "पासवर्ड",
    "login.creds": "🔑 एडमिन क्रेडेंशियल:",
    "login.emailLabel": "ईमेल:",
    "login.passwordLabel": "पासवर्ड:",
    "login.submit": "पासवर्ड सत्यापित करें और कतार अनलॉक करें →",

    "admin.badge": "सत्यापित आधिकारिक व्यवस्थापक सत्र",
    "admin.h1": "प्रशासनिक समीक्षा कतार",
    "admin.loggedInAs": "इस रूप में लॉगिन",
    "admin.coordinator": "राज्य समन्वयक (एडमिन)",
    "admin.signOut": "साइन आउट",
    "admin.allQueue": "पूरी कतार",
    "admin.thId": "ID",
    "admin.thTitle": "समस्या शीर्षक",
    "admin.thDistrict": "जिला",
    "admin.thCategory": "AI श्रेणी",
    "admin.thUrgency": "तात्कालिकता",
    "admin.thStatus": "स्थिति",
    "admin.thContact": "नागरिक संपर्क (गोपनीय)",
    "admin.thAction": "क्रिया",
    "admin.anonymous": "अनाम",
    "admin.review": "समीक्षा →",

    "review.back": "← प्रशासनिक कतार पर वापस जाएँ",
    "review.notFound": "रिपोर्ट नहीं मिली",
    "review.confidential": "🔒 गोपनीय नागरिक संपर्क (केवल एडमिन के लिए)",
    "review.protected": "संरक्षित",
    "review.citizen": "नागरिक:",
    "review.phone": "फ़ोन:",
    "review.email": "ईमेल:",
    "review.notGiven": "नहीं दिया गया",
    "review.h2": "🛠️ AI ट्राइज सुधार और साझेदार असाइनमेंट",
    "review.category": "श्रेणी",
    "review.urgencyPriority": "तात्कालिकता प्राथमिकता",
    "review.summary": "AI सारांश (संपादन योग्य)",
    "review.partner": "समाधान साझेदार असाइन करें",
    "review.noPartner": "-- अभी कोई साझेदार असाइन नहीं --",
    "review.status": "स्थिति",
    "review.timelineUpdate": "सार्वजनिक टाइमलाइन अपडेट",
    "review.timelinePh": "जैसे फ़ील्ड निरीक्षण पूरा हुआ। मरम्मत 48 घंटों में निर्धारित।",
    "review.save": "💾 परिवर्तन सहेजें और टाइमलाइन अपडेट करें",
    "review.cancel": "रद्द करें",
    "review.grpGov": "सरकारी कार्यालय",
    "review.grpUni": "विश्वविद्यालय और अनुसंधान संस्थान",
    "review.grpCsr": "उद्योग और कॉर्पोरेट CSR",

    "privacy.h1": "गोपनीयता नीति",
    "privacy.updated":
      "अंतिम अपडेट: अक्टूबर 2026 · CIVICFORCE तमिलनाडु सामाजिक कार्य नेटवर्क",
    "terms.h1": "सेवा की शर्तें",
    "terms.updated":
      "अंतिम अपडेट: अक्टूबर 2026 · CIVICFORCE तमिलनाडु सामाजिक कार्य नेटवर्क",
    "common.returnHome": "← मुखपृष्ठ पर वापस जाएँ",

    "urg.high": "उच्च तात्कालिकता",
    "urg.normal": "सामान्य",
    "urg.normalPriority": "सामान्य प्राथमिकता",
    "urg.highPriority": "⚡ उच्च तात्कालिकता",
    "urg.highShort": "⚡ उच्च",

    "cat.roads": "सड़कें और फुटपाथ",
    "cat.water": "जल और जलनिकास",
    "cat.lighting": "स्ट्रीट लाइटिंग",
    "cat.waste": "कचरा और स्वच्छता",
    "cat.spaces": "सार्वजनिक स्थान",
    "cat.other": "अन्य",

    "status.new": "नया",
    "status.underReview": "समीक्षा में",
    "status.assigned": "असाइन किया गया",
    "status.inProgress": "प्रगति में",
    "status.resolved": "हल किया गया",
    "status.rejected": "अस्वीकृत",
  },
};

// Look a key up, falling back to English and finally to the raw key.
export function translate(lang: Lang, key: string): string {
  if (!key) return "";
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

// Interpolate the {n} placeholder used by count labels.
export function fill(template: string, n: number | string): string {
  return template.replace("{n}", String(n));
}

const STATUS_KEYS: Record<string, string> = {
  New: "status.new",
  "Under review": "status.underReview",
  Assigned: "status.assigned",
  "In progress": "status.inProgress",
  Resolved: "status.resolved",
  Rejected: "status.rejected",
};

const CATEGORY_KEYS: Record<string, string> = {
  "Roads & footpaths": "cat.roads",
  "Water & drainage": "cat.water",
  "Street lighting": "cat.lighting",
  "Waste & sanitation": "cat.waste",
  "Public spaces": "cat.spaces",
  Other: "cat.other",
};

// Stored data stays in English; these map it to display keys so the UI can
// translate statuses and categories without touching the data layer.
export function statusKey(status: string): string {
  return STATUS_KEYS[status] ?? "";
}

export function categoryKey(category: string): string {
  return CATEGORY_KEYS[category] ?? "";
}

export const PARTNER_GROUP_KEYS = ["review.grpGov", "review.grpUni", "review.grpCsr"];
