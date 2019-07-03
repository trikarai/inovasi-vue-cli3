import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import LoginAdmin from "./views/LoginAdmin.vue";
import LoginTalent from "./views/LoginTalent.vue";
import SignUp from "./views/SignUp.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import ResetPassword from "./views/ResetPassword.vue";
import ActivateAccount from "./views/ActivateAccount.vue";
import NotFoundComponent from "./views/404.vue";

import Administrator from "./views/Administrator.vue";
import AdministratorDashboard from "./components/administrator/AdministratorDashboard";
import AdministratorManageAdmin from "./components/administrator/AdministratorManageAdmin";
import AdministratorManagePersonnel from "./components/administrator/AdministratorManagePersonnel";
import AdministratorManageProgram from "./components/administrator/AdministratorManageProgram";
import AdministratorManageProgramPhase from "./components/administrator/program/AdministratorProgramPhase";
import AdministratorManageProgramRegistration from "./components/administrator/program/registration/AdministratorProgramRegistration";
import AdministratorManageProgramCoordinator from "./components/administrator/program/AdministratorManageProgramCoordinator";
import AdministratorManageProgramMentor from "./components/administrator/program/AdministratorManageProgramMentor";

import AdministratorManageCurriculum from "./components/administrator/AdministratorManageCurriculum";
import AdministratorCurriculumPhase from "./components/administrator/curriculum/AdministratorCurriculumPhase";

import AdministratorManageRegion from "./components/administrator/AdministratorManageRegion";

import AdministratorManageTrack from "./components/administrator/AdministratorManageTrack";
import AdministratorTrackManageSkill from "./components/administrator/track/AdministratorTrackSkill";

import AdministratorManageForm from "./components/administrator/AdministratorManageForm";
import AdministratorManageFormField from "./components/administrator/form/AdministratorManageFormField";
import AdministratorManageFormSection from "./components/administrator/form/AdministratorManageFormSection";

import Talent from "./views/Talent.vue";
import TalentDashboard from "./components/talent/TalentDashboard.vue";
import TalentProfile from "./components/talent/TalentProfile.vue";
import TalentProfileEducation from "./components/talent/profile/education/TalentProfileEducation.vue";
import TalentProfileWork from "./components/talent/profile/work/TalentProfileWork.vue";
import TalentProfileOrganization from "./components/talent/profile/org/TalentProfileOrganization.vue";
import TalentProfileEntrepreneurship from "./components/talent/profile/entrepreneurship/TalentProfileEntrepreneurship.vue";
import TalentProfileTraining from "./components/talent/profile/training/TalentProfileTraining.vue";
import TalentProfileSkill from "./components/talent/profile/skill/TalentProfileSkill.vue";

import TalentTeam from "./components/talent/TalentTeam.vue";
import TalentTeamProgram from "./components/talent/team/programparticipation/TalentTeamProgram";
import TalentTeamProgramRegister from "./components/talent/TalentProgrammes.vue";
import TalentTeamCreate from "./components/talent/team/TalentTeamCreate";
import TalentTeamDetail from "./components/talent/team/TalentTeamDetail";
import TalentTeamIdea from "./components/talent/team/idea/TalentTeamIdea";
import TalentTeamIdeaDetail from "./components/talent/team/idea/TalentTeamIdeaDetail";
import TalentTeamIdeaCustomersegment from "./components/talent/team/idea/customersegment/TalentTeamIdeaCustomersegment";
import TalentTeamIdeaCustomersegmentPersona from "./components/talent/team/idea/customersegment/persona/TalentTeamIdeaCustomersegmentPersona";

import TalentFeedback from "./components/talent/TalentFeedback.vue";
import TalentProgrammes from "./components/talent/TalentProgrammes.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUp
  },
  {
    path: "/login",
    name: "Talent Login",
    meta: {
      description: "Talent"
    },
    component: LoginTalent
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword
  },
  {
    path: "/reset-password/:email/:resetPasswordCode",
    name: "Reset Password",
    component: ResetPassword
  },
  {
    path: "/activate/:email/:activationCode",
    name: "Activate Account",
    component: ActivateAccount
  },
  {
    path: "/mentor/login/",
    name: "Mentor Login",
    component: LoginTalent
  },
  {
    path: "/coordinator/login/",
    name: "Coordinator Login",
    component: LoginTalent
  },
  {
    path: "/talent",
    name: "Talent",
    component: Talent,
    children: [
      {
        path: "/talent/dashboard",
        name: "Dashboard",
        component: TalentDashboard,
        meta: { requiresAuth: true, talentAuth: true, adminAuth: false },
      },
      {
        path: "/talent/profile",
        name: "My Profile",
        component: TalentProfile
      },
      {
        path: "/talent/education",
        name: "Education",
        component: TalentProfileEducation
      },
      {
        path: "/talent/work",
        name: "Working Experiences",
        component: TalentProfileWork
      },
      {
        path: "/talent/organization",
        name: "Working Experiences",
        component: TalentProfileOrganization
      },
      {
        path: "/talent/entrepreneurship",
        name: "Entrepreneurship Experiences",
        component: TalentProfileEntrepreneurship
      },
      {
        path: "/talent/training",
        name: "Training Experiences",
        component: TalentProfileTraining
      },
      {
        path: "/talent/skill",
        name: "Skill",
        component: TalentProfileSkill
      },
      {
        path: "/talent/team",
        name: "Team",
        component: TalentTeam
      },
      {
        path: "/talent/team/:teamId",
        name: "Team",
        component: TalentTeamDetail
      },
      {
        path: "/talent/team/:teamId/participation",
        name: "Team Program Participation",
        component: TalentTeamProgram
      },
      {
        path: "/talent/team/:teamId/participation/register",
        name: "Team Program Participation",
        component: TalentTeamProgramRegister
      },
      {
        path: "/talent/team/:teamId/idea",
        name: "Idea",
        component: TalentTeamIdea
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId",
        name: "Idea Detail",
        component: TalentTeamIdeaDetail
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId",
        name: "Customer Segment Detail",
        component: TalentTeamIdeaCustomersegment
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId",
        name: "Persona Detail",
        component: TalentTeamIdeaCustomersegmentPersona
      },
      {
        path: "/talent/create/team",
        name: "Create Team",
        component: TalentTeamCreate
      },
      {
        path: "/talent/program",
        name: "Feedback",
        component: TalentProgrammes
      },
      {
        path: "/talent/feedback",
        name: "Feedback",
        component: TalentFeedback
      }

    ]
  },
  {
    path: "/administrator/login",
    name: "Administrator Login",
    component: LoginAdmin
  },
  {
    path: "/administrator",
    name: "Administrator",
    component: Administrator,
    meta: { requiresAuth: true, talentAuth: false, adminAuth: true },
    children: [
      {
        name: "Dashboard",
        path: "/administrator/dashboard",
        component: AdministratorDashboard,
        meta: { requiresAuth: true, talentAuth: false, adminAuth: true }
      },
      {
        name: "Manage Admin",
        path: "/administrator/admin",
        component: AdministratorManageAdmin,
        meta: { requiresAuth: true, talentAuth: false, adminAuth: true }
      },
      {
        name: "Manage Personnel",
        path: "/administrator/personnel",
        component: AdministratorManagePersonnel
      },
      {
        name: "Manage Program",
        path: "/administrator/program",
        component: AdministratorManageProgram
      },
      {
        name: "View Program Phase",
        path: "/administrator/program/:programId/phase-plan",
        component: AdministratorManageProgramPhase
      },
      {
        name: "View Program Registration",
        path: "/administrator/program/:programId/registration",
        component: AdministratorManageProgramRegistration
      },
      {
        name: "View Program Mentor",
        path: "/administrator/program/:programId/mentor",
        component: AdministratorManageProgramMentor
      },
      {
        name: "View Program Coordinator",
        path: "/administrator/program/:programId/coordinator",
        component: AdministratorManageProgramCoordinator
      },
      {
        name: "Manage Curriculum",
        path: "/administrator/curriculum",
        component: AdministratorManageCurriculum
      },
      {
        name: "Manage Curriculum Phase",
        path: "/administrator/curriculum/:curriculumId/phase-plan",
        component: AdministratorCurriculumPhase
      },
      {
        name: "Manage Region",
        path: "/administrator/region",
        component: AdministratorManageRegion
      },
      {
        name: "Manage Track",
        path: "/administrator/track",
        component: AdministratorManageTrack
      },
      {
        name: "Manage Skill",
        path: "/administrator/track/:trackId/skill-reference",
        component: AdministratorTrackManageSkill
      },
      {
        name: "Manage Form",
        path: "/administrator/form",
        component: AdministratorManageForm
      },
      {
        name: "Manage Form Field",
        path: "/administrator/form/:formId/field",
        component: AdministratorManageFormField
      },
      {
        name: "Manage Form Section",
        path: "/administrator/form/:formId/section",
        component: AdministratorManageFormSection
      },
    ]
  },
  { path: '*', component: NotFoundComponent }
]

const router = new Router({
  routes,
  mode: "history",
  base: process.env.BASE_URL,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if (!authUser || !authUser.token) {
      next({ path: '/login' })
    }
    else if (to.meta.adminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if (authUser.role_id === 'ADMIN') {
        next()
      } else {
        next('/talent/dashboard')
      }
    } else if (to.meta.talentAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if (authUser.role_id === 'TALENT') {
        next()
      } else {
        console.log('Im in admin')
        next('/administrator/dashboard')
      }
    }
  } else {
    next()
  }
})

export default router;