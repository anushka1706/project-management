import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ViewComponent } from './project-dashboard/view/view.component';

const routes: Routes = [

    {
        path: '',
        children: [
            { path: '', redirectTo: 'project-dashboard', pathMatch: 'full' },
            { path: 'project-dashboard', component: ProjectDashboardComponent },
            { path: 'view', component: ViewComponent },
            { path: 'users', component: UserDashboardComponent }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [
        ViewComponent
    ]
})
export class AppRoutingModule { }
