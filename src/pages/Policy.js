import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus pt-4">
        <div className="col-md-10">
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>

          <p className="text-justify">
            At E-commerce, we value the privacy and security of our users'
            personal information. This Privacy Policy outlines how we collect,
            use, disclose, and protect the information you provide when using
            our e-commerce app. By using our app, you consent to the terms and
            practices described in this Privacy Policy.
          </p>
          <p className="text-justify">
            Information Collection: We collect certain personal information that
            you voluntarily provide to us, including but not limited to your
            name, email address, phone number, shipping address, and payment
            details. We may also collect non-personal information such as device
            information, IP address, and app usage data.
          </p>
          <p className="text-justify">
            Information Usage: We use the collected information to process your
            orders, provide customer support, improve our app, personalize your
            experience, and communicate with you about promotions and updates.
            We may also use the data for analytics purposes to enhance our app's
            functionality and user experience.
          </p>
          <p className="text-justify">
            Information Sharing: We may share your personal information with
            trusted third-party service providers who assist us in delivering
            our services, such as payment processors, delivery partners, and
            customer support providers. These third parties are bound by
            confidentiality agreements and are prohibited from using your
            information for any other purpose.
          </p>
          <p className="text-justify">
            Security: We implement industry-standard security measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction. However, please be aware
            that no method of transmission over the internet or electronic
            storage is completely secure.
          </p>
          <p className="text-justify">
            Cookies and Tracking Technologies: We may use cookies and similar
            tracking technologies to enhance your app experience, analyze usage
            patterns, and deliver targeted advertisements. You can adjust your
            device settings to manage or disable cookies if you prefer.
          </p>
          <p className="text-justify">
            Third-Party Links: Our app may contain links to third-party websites
            or services. We are not responsible for the privacy practices or
            content of these external sites. We encourage you to review their
            privacy policies before providing any personal information.
          </p>
          <p className="text-justify">
            Children's Privacy: Our app is not intended for use by individuals
            under the age of 13. We do not knowingly collect personal
            information from children. If we become aware that we have
            inadvertently collected information from a child, we will promptly
            delete it.
          </p>
          <p className="text-justify">
            Changes to the Privacy Policy: We reserve the right to update this
            Privacy Policy at any time. Any changes will be posted within the
            app, and your continued use of the app signifies your acceptance of
            those changes.
          </p>
          <p className="text-justify">
            If you have any questions or concerns regarding our Privacy Policy,
            please contact us at [Contact Information]. We are committed to
            protecting your privacy and providing a secure and enjoyable
            shopping experience.
          </p>
          <p>Effective Date: [Date]</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
