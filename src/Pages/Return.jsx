import img from "../assets/refund.png"

const Refund = () =>{
    return(
        <>
         <section className="relative h-[300px] w-full overflow-hidden 2xl:h-[580px] sm:h-[340px] md:h-[370px] lg:h-[400px] xl:h-[420px]">
                {/* Banner Image */}
                <img
                  src={img}
                  alt="Migration"
                  className="absolute inset-0 h-full w-full object-cover"
                />
        
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(89.92deg,#FFFFFF_0.06%,rgba(255,255,255,0)_48.4%)]" />
        
                {/* Banner Content */}
                <div className="relative z-10 mx-auto flex h-full w-full max-w-[1256px] flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-10">
                  {/* Breadcrumb */}
                  <p className="mb-2 text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px]">
                    <span className="text-sky-500">Home &gt; </span>
                    <span className="text-cyan-800 font-medium">Cancellation & Refund Policy</span>
                  </p>
        
                  {/* Banner Heading */}
                  <h1 className="mt-4 w-[450px]  text-[38px] font-semibold leading-[1.1] text-[#669980] sm:mt-6 sm:text-[44px] md:mt-8 md:text-[52px] lg:mt-10 lg:text-[60px]">
                    Cancellation & Refund Policy
                  </h1>
                </div>
              </section>
          <main className="mx-auto mb-75 w-full max-w-[1256px] px-5 py-8 text-sm leading-relaxed text-[#0085a3] sm:px-8 sm:py-10 sm:text-[15px] md:px-12 md:text-base lg:px-10 lg:text-[17px]">
            <article className="w-full max-w-full break-words text-justify">
             <p className="mt-3">
              At Grow More Global Immigration Private Limited, a sister concern of Growmore & Associates Pty Ltd, we are committed to providing trustworthy, transparent and professional services based on each client's needs.  
             </p>
             <p className="mt-3">
              Our goal is to help clients understand their visa options and navigate the relevant processes with clarity. We offer consultation and visa processing services for various countries, covering student, dependent, visitor, work and other migration-related visas. 
             </p>
             <p className="font-bold mt-3">
              Consultation Services 
             </p>
             <p className="mt-3">
              Our consultation services are designed to help clients understand their visa options, eligibility and potential pathways based on their individual circumstances. There are different packages that include: 
             </p>
             <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Counselling and guidance on available visa pathways by expert visa counsellor </li>
              <li>Consultation with a Registered Migration Agent, where applicable </li>
              <li>Consultation with Mr. Krunal Nayak, where applicable </li>
              <li>Review of relevant documents and assessment of visa eligibility </li>
             </ul>
             <p className="mt-3">
               The exact types of services included will depend on the consultation package selected by the client, so make sure to get information about which services are involved before making payment. The packages mainly available are as follows: 
             </p>
             <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Consultation with Mr Krunal Nayak: AUD 250 </li>
              <li>Consultation with a Registered Migration Agent (RMA): AUD 150 </li>
              <li>Urgent Consultation: AUD 500 </li>
             </ul>
             <p className="mt-3 font-bold">Appointment Cancellation and Rescheduling </p>
             <p className="mt-3">Clients may reschedule their consultation up to two times without an additional fee, provided each request is received more than 24 hours before the scheduled appointment. </p>
             <p className="mt-3">To cancel or reschedule an appointment, clients must email study@growmore.one at least 24 hours before the scheduled time. A confirmation email will be sent once the request has been reviewed and processed. </p>
             <p className="mt-3">Rescheduling within 24 hours of the appointment will generally not be permitted. Exceptions may be considered in cases of medical emergencies or other exceptional circumstances, at the Company's discretion and subject to applicable law. </p>
            <p className="mt-3 font-bold">Consultation Refund Policy </p>
            <p className="mt-3">Consultation refunds are subject to the following conditions: </p>
             <ul className="mt-3 list-disc space-y-2 pl-6">
  <li>
    <span className="font-bold">Cancellation at least 24 hours before the appointment:</span>Clients may receive a refund of 50% of the consultation fee paid.
  </li>
   <li>
    <span className="font-bold">Ineligibility following an assessment:</span>If a client is assessed as ineligible for the relevant visa pathway, a 50% refund will be provided in accordance with the applicable consultation terms. 
  </li>
   <li>
    <span className="font-bold">Eligible clients who choose not to proceed: </span>No refund will be provided if a client is found eligible but decides not to continue with the services. 
  </li>
   <li>
    <span className="font-bold">Cancellation within 24 hours: </span>Refunds will generally not be provided. Exceptions may be considered for medical emergencies or other exceptional circumstances, subject to applicable law. 
  </li>
  </ul>
  <p className="mt-3">Approved refunds will be returned to the original payment method or account, wherever practicable. Refund processing may take up to 10 working days after approval. </p>
  <p className="mt-3 font-bold">Visa Processing Services</p>
  <p className="mt-3">Our visa processing services cover assistance with applications for student, dependent, visitor, work and other migration-related visas across various countries. The fees we take for processing any of your visas are non-refundable once payment has been made. </p>
  <p className="mt-3">By proceeding with payment, clients acknowledge this condition, subject to any rights that cannot lawfully be excluded under applicable law. This policy applies where a client subsequently decides not to proceed, changes their plans, withdraws their application or is dissatisfied with the outcome of a visa application. Processing any payment with us does not guarantee a successful visa outcome, as the final decision comes from the relevant immigration authority. </p>
  <p className="mt-3">Please note that government application charges, skills assessment fees, medical examination costs, translation charges and any other third-party expenses are separate from our professional fees. </p>
  <p className="mt-3">For questions regarding consultation bookings, cancellations, refunds or visa processing services, please contact us: </p>
           <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Email: study@growmore.one </li>
            <li>Phone: +91 90818 99668 / +91 90818 99669 </li>
           </ul>
           <p className="mt-3">
           Please include your name, payment reference and relevant service details when submitting a cancellation or refund request. 
           </p>
            </article>
          </main>
        </>
    )
}
export default Refund;