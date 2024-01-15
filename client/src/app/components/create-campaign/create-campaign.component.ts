import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign.service';
import { NgForm } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CampaignListService } from 'src/app/services/campaign-list.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  campaignService = inject(CampaignService); // kun injektoi niin ei tarvitse contstructoria
  campaignList = inject(CampaignListService); // uusi
  fb = inject(FormBuilder);
  formSimple: boolean = true;
  simpleColor: string = 'bg-green-600';
  advancedColor: string = 'bg-gray-500';
  loading: boolean = false;
  visibleOther: boolean = false;

  @ViewChild('campaignForm') campaignForm!: NgForm; //uusi

  company: string = localStorage.getItem('company') || '';

  inputCompany!: string;
  inputName!: string;
  inputAdTitle!: string;
  inputAdText!: string;
  inputAdTarget!: string;
  inputAdArea!: string;
  inputBudget!: number;
  inputStart!: Date;
  inputEnd!: Date;
  inputMedia!: string;
  inputUrl!: string;
  inputOther!: string;
  inputCta!: string;
  inputGender!: string;
  inputPayer!: string;

  ngOnInit(): void {
    this.company = localStorage.getItem('company') || '';
  }

  payerCheck() {
    this.visibleOther = true;
    console.log(this.inputPayer);
  }
  payerunCheck() {
    this.visibleOther = false;

    console.log(this.inputPayer);
  }

  addCampaign() {
    this.loading = true;
    // console.log('add klikattu');

    const newCampaign = {
      creator:
        localStorage.getItem('firstname') +
        ' ' +
        localStorage.getItem('lastname'),
      company: this.inputCompany,
      owner: localStorage.getItem('user_id'),
      name: this.inputName,
      adtitle: this.inputAdTitle,
      adtext: this.inputAdText,
      adtarget: 'Age ' + this.inputAdTarget + ', ' + this.inputGender,
      adarea: this.inputAdArea,
      adbudget: this.inputBudget,
      adstart: this.inputStart,
      adend: this.inputEnd,
      mediainfo: this.inputMedia,
      adurl: this.inputUrl,
      adcta: this.inputCta,
      adother: this.inputOther,
      adstatus: 'N',
      adcontact:
        localStorage.getItem('firstname') +
        ' ' +
        localStorage.getItem('lastname'),
      adpayer: this.inputPayer,
    };

    // console.log('uusi kampanja' + JSON.stringify(newCampaign));

    this.campaignService.postCampaignService(newCampaign).subscribe({
      next: (res: any) => {
        res.data;
        this.campaignList.campaigns.push(newCampaign);

        // console.log('lähetetään kampanja');
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        this.campaignForm.resetForm();
        this.loading = false;
        this.campaignList.getAllCampaignsFromService();
      },
    });
  }

  toggleSimple() {
    this.simpleColor = 'bg-green-600';
    this.advancedColor = 'bg-gray-500';
    this.formSimple = true;
  }

  toggleAdvanced() {
    this.advancedColor = 'bg-green-600';
    this.simpleColor = 'bg-gray-500';
    this.formSimple = false;
  }
}
