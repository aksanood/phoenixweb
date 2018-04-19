
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ProfileInformationService} from "shared/services/profile-information.service";
import {ProductService} from "shared/services/product.service";
import {BlogService} from "shared/services/blog.service";
import {TutorialService} from "shared/services/tutorial.service";
import {ShowcaseService} from "shared/services/showcase.service";

@Injectable()
export class ProfileViewResolve implements  Resolve<any> {

  profile: any = {};
  id;
  constructor(private profileService: ProfileInformationService,
              private productService: ProductService,
              private blogService: BlogService,
              private tutorialService: TutorialService,
              private showcaseService: ShowcaseService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    this.id = route.paramMap.get('id');
    this.profile =  this.profileService.getProfileByID(this.id).take(1);
    this.showcaseService.getItemsById(this.id).take(1).subscribe(items => {
      console.log(items);
    });
    console.log(this.profile);
    return this.profile;


  }
}
