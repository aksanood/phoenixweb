import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import {ProfileInformationService} from "shared/services/profile-information.service";
import {Profile} from "shared/models/profile";
import { ShowcaseService } from 'shared/services/showcase.service';
import {Product} from "shared/models/products";
import {ProductService} from "shared/services/product.service";
import {BlogPost} from "shared/models/blog-post";
import {BlogService} from "shared/services/blog.service";
import {Tutorial} from "shared/models/tutorial";
import {TutorialService} from "shared/services/tutorial.service";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {


  profile: any = {};
  skills;
  interests;
  socialLinks;
  workInfo: any[] = [];
  education: any[] = [];
  id;

  showcaseItems: any[];
  products: Product[] = [];
  blogPosts: BlogPost[] = [];
  tutorials: Tutorial[] = [];

  profileSubscription: Subscription;
  showcaseItemsSubscription: Subscription;
  productsSubscription: Subscription;
  blogPostSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileInformationService,
              private showcaseService: ShowcaseService,
              private productService: ProductService,
              private blogService: BlogService,
              private tutorialService: TutorialService) {

    this.route.data.subscribe(data => {
      this.profile = data['profile'];
      console.log(this.profile);
      this.id = this.profile.$key;
      this.socialLinks = this.profile.externalLinks;

      if (this.profile.skillsAndInterests){
        this.skills = this.profile.skillsAndInterests.skills;
        this.interests = this.profile.skillsAndInterests.interests;
      }

      for (let i in this.profile.workInfo) {
        this.workInfo.push(this.profile.workInfo[i]);
      }
      for (let i in this.profile.education) {
        this.education.push(this.profile.education[i]);
      }


    })

    //this.id = this.route.snapshot.paramMap.get('id');
    //if (this.id) this.profileSubscription = this.profileService.getProfileByID(this.id)
    //  .subscribe(profile => {
    //    this.profile = profile;
    //    this.socialLinks = profile.externalLinks;

    //    profileService.getSkills(this.id).subscribe(skills => {
    //      this.skills = skills;
    //    });

    //    profileService.getInterests(this.id).subscribe(interests => {
    //      if (interests) this.interests = interests.$value;
    //    });

    //    profileService.getWorkInfoById(this.id).subscribe(workInfo => {
    //      this.workInfo = workInfo;
    //      console.log(this.workInfo);
    //    });

    //    profileService.getEducationById(this.id).subscribe(education => {
    //      this.education = education;
    //    });
    //  });

    if (this.id) this.showcaseItemsSubscription = this.showcaseService.getItemsById(this.id).subscribe(items => {
      this.showcaseItems = items;
    });

    if (this.id) this.productsSubscription = this.profileService.getProducts(this.id).subscribe(products => {
      products.forEach(p => {
        productService.get(p.id).subscribe(product => {
          this.products.push(product);
        });
      });
    });

    if (this.id) this.blogPostSubscription = this.profileService.getBlogPosts(this.id).subscribe(posts => {
      posts.forEach(p => {
        blogService.getById(p.id).subscribe(blog => {
          this.blogPosts.push(blog);
        });
      });
    });

    if (this.id) this.blogPostSubscription = this.profileService.getTutorials(this.id).subscribe(tutorials => {
      tutorials.forEach(t => {
        tutorialService.getById(t.id).subscribe(tutorial => {
          this.tutorials.push(tutorial);
        });
      });
    });

  }

  ngOnInit() {
  }

}
