import React from "react";

const TermsAndCondition = () => {
  // --- CONTENT DATA (From Image) ---
  const sections = [
    {
      title: "1. Introduction",
      content: `Welcome to [Your Website/App Name] ("we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website [Your Website URL] and related services.`
    },
    {
      title: "2. Information We Collect",
      content: "We may collect the following types of information:",
      list: [
        "Personal Information: Name, email address, phone number, payment details, etc.",
        "Account Information: Username, password, profile details, etc.",
        "Usage Data: IP address, browser type, pages visited, time spent on pages, etc.",
        "Cookies & Tracking Technologies: We use cookies to enhance user experience and track interactions."
      ]
    },
    {
      title: "3. How We Use Your Information",
      content: "We may use the collected information to:",
      list: [
        "Provide and improve our services.",
        "Process transactions and payments.",
        "Communicate with you regarding support, promotions, or updates.",
        "Personalize user experience.",
        "Ensure security and prevent fraud.",
        "Comply with legal obligations."
      ]
    },
    {
      title: "4. Sharing & Disclosure of Information",
      content: "We do not sell your personal data. However, we may share information with:",
      list: [
        "Service Providers: Third-party vendors for payment processing, hosting, analytics, etc.",
        "Legal Authorities: If required by law or to protect our rights.",
        "Business Transfers: In case of a merger, sale, or acquisition."
      ]
    },
    {
      title: "5. Data Security",
      content: "We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "6. Your Rights & Choices",
      content: "Depending on your location, you may have rights to:",
      list: [
        "Access, update, or delete your personal data.",
        "Opt-out of marketing communications.",
        "Disable cookies via browser settings."
      ]
    },
    {
      title: "7. Third-Party Links & Services",
      content: "Our website may contain links to third-party sites. We are not responsible for their privacy policies or practices."
    },
    {
      title: "8. Children's Privacy",
      content: "Our services are not intended for children under 13 (or relevant age in your jurisdiction). We do not knowingly collect their data."
    }
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
        <div className="border-b border-dashed border-gray-200"></div>
      </div>

      {/* --- CONTENT --- */}
      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold text-gray-800 mb-2">{section.title}</h3>
            
            {section.content && (
              <p className="mb-2 text-justify">{section.content}</p>
            )}

            {section.list && (
              <ul className="list-disc pl-5 space-y-1">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default TermsAndCondition;