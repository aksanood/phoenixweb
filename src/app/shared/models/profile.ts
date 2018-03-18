
export class Profile {
  personalInfo: any;
  address: any;
  socialMedia: any;
  work: any;
  //personal info
  $key: string;
  name: string;
  email: number;
  dob: string;
  about: string;
  picture: string;
  contactNumber: number;
  //address
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postcode: string;
  //current work experiences
  currentPosition: string;
  currentCompany: string;
  startDate: string;
  // Recent work experiences work 1,2,3 3 being the recent and 1 being the first 
  work_1Position: string;
  work_1Company: string;
  work_1StartDate: string;
  work_1EndtDate: string;

  work_2Position: string;
  work_2Company: string;
  work_2StartDate: string;
  work_2EndtDate: string;

  work_3Position: string;
  work_3Company: string;
  work_3StartDate: string;
  work_3EndtDate: string;
  //education
  //urls
  website: string;
  facebook: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  github: string;

  constructor(info: any) {
    this.personalInfo = {
      name: info.name,
      email: info.email,
      dob: info.dob,
      contactNumber: info.contactNumber,
      bio: info.about,
      picture: info.picture
    },
    this.address = {
      addressLine1: info.addressLine1,
      addressLine2: info.addressLine2,
      city: info.city,
      country: info.country,
      postcode: info.postcode
    },
    this.socialMedia = {
      website: info.website,
      facebook: info.facebook,
      twitter: info.twitter,
      youtube: info.youtube,
      linkedin: info.linkedin,
      github: info.github
    },
    this.work = {
      currentPosition : info.currentPosition,
      currentCompany: info.currentCompany,
      startDate: info.startDate,

      work_1Position: info.work_1Position,
      work_1Company: info.work_1Company,
      work_1StartDate: info.work_1StartDate,
      work_1EndtDate: info.work_1EndtDate,

      work_2Position: info.work_2Position,
      work_2Company: info.work_2Company,
      work_2StartDate: info.work_2StartDate,
      work_2EndtDate: info.work_2EndtDate,
      
      work_3Position: info.work_3Position,
      work_3Company: info.work_3Company,
      work_3StartDate: info.work_3StartDate,
      work_3EndtDate: info.work_3EndtDate,
    }
    


  }


}
