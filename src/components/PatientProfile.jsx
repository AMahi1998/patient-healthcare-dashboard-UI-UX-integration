import JessicaImage from "../images/Jessica.png";
import birthIcon from "../images/BirthIcon.svg";
import femaleIcon from "../images/FemaleIcon.svg";
import maleIcon from "../images/MaleIcon.svg";
import phoneIcon from "../images/PhoneIcon.svg";
import emergencyContactIcon from "../images/emergency-contact-icon.svg";
import insuranceIcon from "../images/InsuranceIcon.svg";

export default function PatientProfile() {
  return (
    <div className="bg-white p-3 rounded-xl shadow flex-shrink-0" style={{ maxHeight: '160px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div className="text-center mb-2 flex-shrink-0">
        <img
          src={JessicaImage}
          alt="Jessica Taylor"
          className="w-12 h-12 rounded-full mx-auto border-2 border-gray-100"
        />
        <h3 style={{ 
          marginTop: '8px', 
          fontWeight: '700', 
          color: '#1F2937', 
          fontSize: '14px' 
        }}>Jessica Taylor</h3>
      </div>

      <div className="space-y-0.5 text-xs text-gray-700 overflow-y-auto flex-1 custom-scrollbar" style={{ minHeight: 0, scrollbarWidth: 'thin', scrollbarColor: '#D1D5DB #F3F4F6' }}>
        <div className="flex items-center gap-2 pb-0.5 border-b border-gray-200">
          <img 
            src={birthIcon}
            alt="DOB"
            style={{ width: '12px', height: '12px', flexShrink: 0 }}
          />
          <div className="min-w-0">
            <p className="text-gray-500 text-xs leading-none">DOB</p>
            <p className="font-medium text-xs leading-none truncate">Aug 23, 1996</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pb-0.5 border-b border-gray-200">
          <img 
            src={femaleIcon}
            alt="Gender"
            style={{ width: '12px', height: '12px', flexShrink: 0 }}
          />
          <div>
            <p className="text-gray-500 text-xs leading-none">Gender</p>
            <p className="font-medium text-xs leading-none">Female</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pb-0.5 border-b border-gray-200">
          <img 
            src={phoneIcon}
            alt="Contact"
            style={{ width: '12px', height: '12px', flexShrink: 0 }}
          />
          <div>
            <p className="text-gray-500 text-xs leading-none">Contact</p>
            <p className="font-medium text-xs leading-none truncate">(415) 555-1234</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pb-0.5 border-b border-gray-200">
          <img 
            src={phoneIcon} 
            alt="Emergency Contact"
            style={{ width: '12px', height: '12px', flexShrink: 0 }}
          />
          <div>
            <p className="text-gray-500 text-xs leading-none">Emergency</p>
            <p className="font-medium text-xs leading-none truncate">(415) 555-5678</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img 
            src={insuranceIcon} 
            alt="Insurance Provider"
            style={{
              width: '12px',
              height: '12px',
              flexShrink: 0
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-gray-500 text-xs leading-none">Insurance</p>
            <p className="font-medium text-xs leading-none truncate">Sunrise Health</p>
          </div>
        </div>
      </div>
    </div>
  );
}
