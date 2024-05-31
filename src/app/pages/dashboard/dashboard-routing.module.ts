import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicEducationComponent } from './basic-education/basic-education.component';
import { CareerDevelopmentComponent } from './career-development/career-development.component';
import { CulturalArchivesComponent } from './cultural-archives/cultural-archives.component';
import { HigherEducationComponent } from './higher-education/higher-education.component';
import { NewspapperArchivesComponent } from './newspapper-archives/newspapper-archives.component';
import { ResearchComponent } from './research/research.component';
import { LayoutComponent } from './layout/layout.component';
import { AboutComponent } from './aboutSection/about/about.component';
import { DisclaimerComponent } from './aboutSection/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './aboutSection/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './aboutSection/terms-and-condition/terms-and-condition.component';
import { SponserComponent } from './aboutSection/sponser/sponser.component';
import { CodeOfConductComponent } from './guidelines/code-of-conduct/code-of-conduct.component';
import { CopyrightGuideComponent } from './guidelines/copyright-guide/copyright-guide.component';
import { ClubAndCommitteComponent } from './our-services/club-and-committe/club-and-committe.component';
import { DigitalLibraryComponent } from './our-services/digital-library/digital-library.component';
import { MagazinesComponent } from './our-services/magazines/magazines.component';
import { NewsletterComponent } from './our-services/newsletter/newsletter.component';
import { ContactPageComponent } from './contact/contact-page/contact-page.component';
import { SublayoutComponent } from './sublayout/sublayout.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { CarauselDataComponent } from './carausel-data/carausel-data.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    children : [
      {
        path : '',
        component : SublayoutComponent,
        children : [
          {
            path : 'basic_Education',
            component : BasicEducationComponent
          },
          {
            path : 'career_Development',
            component : CareerDevelopmentComponent
          },
          {
            path : 'cultural_Archives',
            component : CulturalArchivesComponent
          },
          {
            path : 'higher_Education',
            component : HigherEducationComponent
          },
          {
            path : 'newsPapper_Archives',
            component : NewspapperArchivesComponent
          },
          {
            path : 'research',
            component : ResearchComponent
          },
        ]
      },
      {
        path : 'subject/:topic/:subject',
        component : SubjectPageComponent
      },
      {
        path : 'subject/:topic',
        component : TopicPageComponent
      },
      {
        path : 'books/:topic',
        component : CarauselDataComponent
      }
    ]
  },
  {
    path : 'about',
    children : [
      {
        path : '',
        component : AboutComponent
      },
      {
        path : 'disclaimer',
        component : DisclaimerComponent
      },
      {
        path : 'privacy',
        component : PrivacyPolicyComponent
      },
      {
        path : 'terms',
        component : TermsAndConditionComponent
      },
      {
        path : 'sponsors',
        component : SponserComponent
      }
    ]


  },
  {
    path : 'guidelines',
    children : [
      {
        path : 'code-of-conduct',
        component : CodeOfConductComponent
      },
      {
        path : 'copyright-guide',
        component : CopyrightGuideComponent
      }
    ]
  },
  {
    path : 'services',
    children : [
      {
        path : 'club-and-committe',
        component : ClubAndCommitteComponent
      },
      {
        path : 'digital-library',
        component : DigitalLibraryComponent
      },
      {
        path : 'magazines',
        component : MagazinesComponent
      },
      {
        path : 'newsletter',
        component : NewsletterComponent
      }
    ]
  },
  {
    path : 'contact',
    children : [
      {
        path : '',
        component: ContactPageComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
