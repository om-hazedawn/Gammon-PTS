import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
  ],
  template: `
    <div class="form-detail-container">
      <mat-card>
        <mat-card-header>
          <h3>{{ isEditMode ? 'Edit Form 20' : 'New Form 20' }}</h3>
          <button class="draft-btn">Draft</button>

          <div class="header-icons">
            <button mat-icon-button aria-label="Save">
              <mat-icon>save</mat-icon>
            </button>
            <button mat-icon-button aria-label="Delete">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="form-navigation">
            <div
              *ngFor="let step of steps; let i = index"
              class="step-item"
              [class.active]="currentStep === i + 1"
              (click)="goToStep(i + 1)"
            >
              <span class="step-number">{{ i + 1 }}</span>
              <span class="step-label">{{ step }}</span>
            </div>
          </div>
          <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
            <!-- Step 1: Project Section -->
            <div *ngIf="currentStep === 1" class="section">
              <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Project</h2>

              <div class="form-row">
                <mat-form-field appearance="fill" class="w-64">
                  <mat-label>Form 30</mat-label>
                  <input matInput formControlName="form30" [readonly]="!isEditMode" />
                </mat-form-field>
                <mat-form-field appearance="fill">
                  <mat-label>Business Unit</mat-label>
                  <mat-select formControlName="businessUnit" required>
                    <mat-option value="unit1">Unit 1</mat-option>
                    <mat-option value="unit2">Unit 2</mat-option>
                    <mat-option value="unit3">Unit 3</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="fill">
                  <mat-label>Due Date</mat-label>
                  <input matInput type="date" formControlName="duedate"
                  />
                </mat-form-field>
              </div>
              <div class="form-row">
                <mat-form-field appearance="fill">
                  <mat-label>Tender no</mat-label>
                  <input matInput formControlName="tenderNo"/>
                </mat-form-field>
                <mat-form-field appearance="fill">
                  <mat-label>Project Title</mat-label>
                  <input matInput formControlName="projectTitle" required />
                </mat-form-field>
              </div>
              <div class="form-row">
                <mat-form-field appearance="fill">
                  <mat-label>Bid Manager</mat-label>
                  <input matInput formControlName="BidManager"/>
                </mat-form-field>
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Estimator</mat-label>
                  <input matInput formControlName="Estimator"/>
                </mat-form-field>
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Planner</mat-label>
                  <input matInput formControlName="Planner"/>
                </mat-form-field>
              </div>
              <div class="form-row">
                <mat-form-field appearance="fill">
                  <mat-label>Region</mat-label>
                  <mat-select formControlName="Region">
                    <mat-option value="region1">Region 1</mat-option>
                    <mat-option value="region2">Region 2</mat-option>
                    <mat-option value="region3">Region 3</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Location</mat-label>
                  <input matInput formControlName="Location"/>
                </mat-form-field>
                <mat-form-field appearance="fill" class="full-width">
                  <mat-label>Planner</mat-label>
                  <input matInput formControlName="Planner"/>
                </mat-form-field>
                <mat-form-field appearance="fill">
                  <mat-label>TenderType</mat-label>
                  <mat-select formControlName="TenderType">
                    <mat-option value="type1">Type 1</mat-option>
                    <mat-option value="type2">Type 2</mat-option>
                    <mat-option value="type3">Type 3</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="fill">
                  <mat-label>Brief Description</mat-label>
                  <textarea matInput formControlName="BriefDescription" rows="3"></textarea>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-label class="block mb-1">Approximate Value</mat-label>
                <div style="display: flex; gap: 10px;">
                  <!-- Dropdown -->
                  <mat-form-field appearance="fill" style="flex: 1;">
                    <mat-select formControlName="ApproximateValueType" placeholder="Select type">
                      <mat-option value="type1">Type 1</mat-option>
                      <mat-option value="type2">Type 2</mat-option>
                      <mat-option value="type3">Type 3</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Input box -->
                  <mat-form-field appearance="fill" style="flex: 1;">
                    <input
                      matInput
                      formControlName="ApproximateValueInput"
                      placeholder="Enter value"
                    />
                  </mat-form-field>
                </div>
              </div>

              <div class="form-row">
                <mat-form-field appearance="fill">
                  <mat-label>Approximate Value Remarks</mat-label>
                  <input matInput formControlName="ApproximateValue" />
                </mat-form-field>
                <mat-form-field appearance="fill">
                  <mat-label>Approximate Margin</mat-label>
                  <input matInput formControlName="Approxmargin" />
                </mat-form-field>
              </div>

              <div class="form-row">
                <!-- Shared label -->
                <label class="block mb-1">Maintenance / Defect</label>

                <!-- Flex container for 3 fields -->
                <div style="display: flex; gap: 10px;">
                  <!-- First Select -->
                  <mat-form-field appearance="fill" style="flex: 1;">
                    <mat-select formControlName="maintenanceType" placeholder="Select option">
                      <mat-option value="type1">Type 1</mat-option>
                      <mat-option value="type2">Type 2</mat-option>
                      <mat-option value="type3">Type 3</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Number Input -->
                  <mat-form-field appearance="fill" style="flex: 1;">
                    <input
                      matInput
                      type="number"
                      formControlName="maintenanceValue"
                      placeholder="Enter number"
                    />
                  </mat-form-field>

                  <!-- Second Select -->
                  <mat-form-field appearance="fill" style="flex: 1;">
                    <mat-select formControlName="maintenanceStatus" placeholder="Select status">
                      <mat-option value="open">Open</mat-option>
                      <mat-option value="inprogress">In Progress</mat-option>
                      <mat-option value="closed">Closed</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>

              <div class="form-row">
                <mat-form-field appearance="fill">
                  <mat-label>Client</mat-label>
                  <input matInput formControlName="Client" />
                </mat-form-field>
                <mat-form-field appearance="fill">
                  <mat-label>Contract Period (months)</mat-label>
                  <input matInput type="number" formControlName="ContractPeriod"/>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="fill">
                  <mat-label>Financial Standing</mat-label>
                  <input matInput formControlName="FinantialStanding"/>
                </mat-form-field>
              </div>

              <div class="form-row">
                <div class="form-row">
                  <label class="block mb-1">Tender Market Scheme</label>
                  <mat-radio-group formControlName="TenderMarketScheme" class="flex gap-6">
                    <mat-radio-button value="yes">Yes</mat-radio-button>
                    <mat-radio-button value="no">No</mat-radio-button>
                    <mat-radio-button value="na">N.A.</mat-radio-button>
                  </mat-radio-group>
                </div>

                <mat-form-field appearance="fill">
                  <mat-label>Financial/Technical Split Value</mat-label>
                  <mat-select
                    formControlName="FinancialTechnicalSplitValue"
                    placeholder="Select status"
                  >
                    <mat-option value="open">Open</mat-option>
                    <mat-option value="inprogress">In Progress</mat-option>
                    <mat-option value="closed">Closed</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="fill">
                  <mat-label>Bid Type</mat-label>
                  <mat-select formControlName="BidType" placeholder="Select Bid Type">
                    <mat-option value="open">Open</mat-option>
                    <mat-option value="inprogress">In Progress</mat-option>
                    <mat-option value="closed">Closed</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <!-- Step 2: Contract Section -->
            <div *ngIf="currentStep === 2" class="section">
              <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Contract</h2>
              <div formGroupName="contract">
                <div class="form-row">
                  <div class="mb-4">
                    <label class="font-bold">Form of Contract:</label>
                  </div>
                  <mat-form-field appearance="fill" class="flex-1 min-w-[200px]">
                    <mat-label>Type</mat-label>
                    <mat-select formControlName="Type">
                      <mat-option value="A">A</mat-option>
                      <mat-option value="B">B</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Description -->
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-label>Description</mat-label>
                    <input matInput formControlName="Description" />
                  </mat-form-field>

                  <!-- Degree of risk -->
                  <mat-form-field appearance="fill" class="w-32">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="form-row">
                  <div class="mb-2 font-bold">Liquidated damages:</div>

                  <!-- Row 2 -->
                  <div class="flex flex-wrap gap-4 items-center mb-4">
                    <!-- Rate of Damages -->
                    <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                      <mat-label>Rate of Damages</mat-label>
                      <input
                        matInput
                        formControlName="RateOfDamages"
                        placeholder="Details of Rate of Damage e.g. $300k/Day"
                      />
                    </mat-form-field>
                  </div>

                  <!-- Row 3 -->

                  <!-- Limit of Liability -->
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-label>Limit of Liability</mat-label>
                    <input matInput formControlName="LimitOfLiability" />
                  </mat-form-field>

                  <!-- Degree of risk -->
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskLimit">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="fill" class="flex-1 min-w-[160px]">
                    <mat-label>Measurement Details</mat-label>
                    <mat-select formControlName="MeasurementDetails">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="fill" class="flex-1 min-w-[160px]">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-label>Fluctuations</mat-label>
                    <mat-select formControlName="Fluctuations">
                      <mat-option value="M">Fixed Price</mat-option>
                      <mat-option value="H">Fluctuating Price</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="fill" class="w-32">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="mb-2 font-bold">Clauses provided:</div>

                <!-- Adverse Physical Conditions (vertical) -->

                <div class="clause-block">
                  <label class="block mb-1">Adverse Physical Conditions:</label>
                  <mat-radio-group formControlName="Adverse" class="flex flex-row gap-4">
                    <mat-radio-button value="yes">Yes</mat-radio-button>
                    <mat-radio-button value="no">No</mat-radio-button>
                    <mat-radio-button value="na">N.A.</mat-radio-button>
                  </mat-radio-group>
                </div>

                <!-- Time Extension For Weather (horizontal with fields) -->
                <div class="clause-block mt-4 flex flex-row items-center gap-6">
                  <div>
                    <label class="block mb-1">Time Extension For Weather:</label>
                    <mat-radio-group formControlName="TimeExtension" class="flex flex-row gap-4">
                      <mat-radio-button value="yes">Yes</mat-radio-button>
                      <mat-radio-button value="no">No</mat-radio-button>
                      <mat-radio-button value="na">N.A.</mat-radio-button>
                    </mat-radio-group>
                  </div>
                  <div class="flex flex-row gap-4 flex-1">
                    <mat-form-field appearance="fill" class="flex-1 min-w-[220px]">
                      <mat-label>Weather Extension Description</mat-label>
                      <input matInput formControlName="WeatherExtention"/>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="min-w-[160px]">
                      <mat-label>Degree of Risk</mat-label>
                      <mat-select formControlName="DegreeRiskType">
                        <mat-option value="M">M</mat-option>
                        <mat-option value="H">H</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="fill" class="min-w-[160px]">
                    <mat-label>Other Unusual Conditions:</mat-label>
                    <input matInput formControlName="OtherUnusualConditions" />
                  </mat-form-field>
                  <mat-form-field appearance="fill" class="min-w-[160px]">
                    <mat-label>Degree of Risk:</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <mat-form-field appearance="fill" class="min-w-[160px]">
                    <mat-label>Design Responsibility</mat-label>
                    <input matInput formControlName="DesignResponsibility" />
                  </mat-form-field>
                  <mat-form-field appearance="fill" class="min-w-[160px]">
                    <mat-label>Degree of Risk:</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="form-row">
                  <label class="block mb-1">BIM Required:</label>
                  <mat-radio-group formControlName="BIMRequired" class="flex gap-6">
                    <mat-radio-button value="yes">Yes</mat-radio-button>
                    <mat-radio-button value="no">No</mat-radio-button>
                    <mat-radio-button value="na">N.A.</mat-radio-button>
                  </mat-radio-group>
                  <mat-form-field appearance="fill" class="min-w-[160px]">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <label class="block mb-1">DFMA Required:</label>
                  <mat-radio-group formControlName="DFMARequired" class="flex gap-6">
                    <mat-radio-button value="yes">Yes</mat-radio-button>
                    <mat-radio-button value="no">No</mat-radio-button>
                    <mat-radio-button value="na">N.A.</mat-radio-button>
                  </mat-radio-group>
                  <mat-form-field appearance="fill" class="min-w-[160px]">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 3" class="section">
              <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Payment</h2>
              <div formGroupName="payment">
                <div class="form-row">
                  <div class="mb-4">
                    <label class="font-bold">Certification of Period:</label>
                  </div>
                  <mat-form-field appearance="fill" class="flex-1 min-w-[200px]">
                    <mat-label>Period</mat-label>
                    <input matInput formControlName="Period" type="number" />
                  </mat-form-field>

                  <!-- Description -->
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-select formControlName="Months" placeholder="Select Months">
                      <mat-option value="1">days</mat-option>
                      <mat-option value="2">weeks</mat-option>
                      <mat-option value="3">months</mat-option>
                      <mat-option value="4">years</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Degree of risk -->
                  <mat-form-field appearance="fill" class="w-32">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskType">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <div class="mb-4">
                    <label class="font-bold">Retention Amount:</label>
                  </div>
                  <mat-form-field appearance="fill" class="flex-1 min-w-[200px]">
                    <mat-label>Retention</mat-label>
                    <input matInput formControlName="Retention" />
                  </mat-form-field>

                  <!-- Description -->
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-select formControlName="Percent" placeholder="Select Percent">
                      <mat-option value="1">%</mat-option>
                      <mat-option value="2">Amount</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Degree of risk -->
                  <mat-form-field appearance="fill" class="w-32">
                    <mat-label>Degree Name</mat-label>
                    <mat-select formControlName="DegreeRiskType2">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="form-row">
                  <mat-form-field appearance="fill" class="flex-1 min-w-[200px]">
                    <mat-label>Remarks</mat-label>
                    <input matInput formControlName="Remarks" />
                  </mat-form-field>
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-label>Remarks</mat-label>
                    <input matInput formControlName="Remarks2" />
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <div class="mb-4">
                    <label class="font-bold">Payment Period:</label>
                  </div>
                  <mat-form-field appearance="fill" class="flex-1 min-w-[200px]">
                    <mat-label>Payment Period</mat-label>
                    <input matInput formControlName="PaymentPeriod" type="number" />
                  </mat-form-field>

                  <!-- Description -->
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-select formControlName="Months2" placeholder="Select Months">
                      <mat-option value="1">days</mat-option>
                      <mat-option value="2">weeks</mat-option>
                      <mat-option value="3">months</mat-option>
                      <mat-option value="4">years</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Degree of risk -->
                  <mat-form-field appearance="fill" class="w-32">
                    <mat-label>Degree of Risk</mat-label>
                    <mat-select formControlName="DegreeRiskType3">
                      <mat-option value="M">M</mat-option>
                      <mat-option value="H">H</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <div class="mb-4">
                    <label class="font-bold"> Limit of Retention:</label>
                  </div>
                  <mat-form-field appearance="fill" class="flex-1 min-w-[200px]">
                    <input matInput formControlName="LimitofRetention" />
                  </mat-form-field>

                  <!-- Description -->
                  <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                    <mat-select formControlName="Percent">
                      <mat-option value="1">L</mat-option>
                      <mat-option value="2">L/M</mat-option>
                      <mat-option value="3">M</mat-option>
                      <mat-option value="4">L/H</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <div class="mb-4">
                    <label class="font-bold">Cash Profile:</label>
                  </div>
                  <mat-label>Max Exposure (Amount)</mat-label>
                  <div style="width: 200px;">
                    <mat-form-field appearance="fill">
                      <input matInput formControlName="MaxExposureAmount" type="number" />
                    </mat-form-field>
                  </div>
                  <label>for</label>
                  <div style="width: 200px;">
                    <mat-form-field appearance="fill">
                      <input matInput formControlName="MaxExposureMonths" type="number" />
                    </mat-form-field>
                  </div>
                  <label>months</label>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="fill">
                    <mat-label>Peak deficit</mat-label>
                    <input matInput formControlName="PaymentPeriod" />
                  </mat-form-field>
                  <mat-form-field appearance="fill">
                    <mat-label>Peak Surplus</mat-label>
                    <input matInput formControlName="PaymentPeriod" />
                  </mat-form-field>
                  <div style="width: 200px;">
                    <mat-form-field appearance="fill" class="flex-1 min-w-[250px]">
                      <mat-label>Risk Level</mat-label>
                      <mat-select formControlName="RiskLevel">
                        <mat-option value="L">L</mat-option>
                        <mat-option value="L/M">L/M</mat-option>
                        <mat-option value="M">M</mat-option>
                        <mat-option value="L/H">L/H</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="fill">
                    <mat-label>Average deficit</mat-label>
                    <input matInput formControlName="AverageDeficit" />
                  </mat-form-field>

                  <mat-form-field appearance="fill">
                    <mat-label>Average Surplus</mat-label>
                    <input matInput formControlName="AverageSurplus" />
                  </mat-form-field>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 4" class="section">
              <div class="p-4 bg-white shadow rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Bonds</h2>

                <div formGroupName="Bonds" class="space-y-6">
                  <!-- Tender Bond -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Tender Bond:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" formControlName="TenderValue" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 60px">
                        <mat-select formControlName="tenderUnit">
                          <mat-option value="%">%</mat-option>
                          <mat-option value="$">$</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Call Basis</mat-label>
                        <input matInput formControlName="TenderCallBasis" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[160px] flex-1">
                        <mat-label>Expiry Date</mat-label>
                        <input matInput type="date" formControlName="TenderExpiry" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[180px] flex-1">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="TenderRemark" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="w-40">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="TenderRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Performance Bond -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Performance Bond:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" formControlName="PerformanceValue" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 60px">
                        <mat-select formControlName="performanceUnit">
                          <mat-option value="%">%</mat-option>
                          <mat-option value="$">$</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Call Basis</mat-label>
                        <input matInput formControlName="PerformanceCallBasis" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[160px] flex-1">
                        <mat-label>Expiry Date</mat-label>
                        <input matInput type="date" formControlName="PerformanceExpiry" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[180px] flex-1">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="PerformanceRemark" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="w-40">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="degreeRisk2">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Advance Payment Bond -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Advance Payment Bond:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" formControlName="AdvanceValue" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 60px">
                        <mat-select formControlName="advanceUnit">
                          <mat-option value="%">%</mat-option>
                          <mat-option value="$">$</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Call Basis</mat-label>
                        <input matInput formControlName="AdvanceCallBasis" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[160px] flex-1">
                        <mat-label>Expiry Date</mat-label>
                        <input matInput type="date" formControlName="AdvanceExpiry" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[180px] flex-1">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="AdvanceRemark" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="w-40">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="AdvanceRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Retention Bond -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Retention Bond:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" formControlName="RetentionValue" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 60px">
                        <mat-select formControlName="retentionUnit">
                          <mat-option value="%">%</mat-option>
                          <mat-option value="$">$</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Call Basis</mat-label>
                        <input matInput formControlName="RetentionCallBasis" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[160px] flex-1">
                        <mat-label>Expiry Date</mat-label>
                        <input matInput type="date" formControlName="RetentionExpiry" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[180px] flex-1">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="RetentionRemark" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="w-40">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="RetentionRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Maintenance Bond -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Maintenance Bond:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" formControlName="MaintenanceValue" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 60px">
                        <mat-select formControlName="maintenanceUnit">
                          <mat-option value="%">%</mat-option>
                          <mat-option value="$">$</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Call Basis</mat-label>
                        <input matInput formControlName="MaintenanceCallBasis" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[160px] flex-1">
                        <mat-label>Expiry Date</mat-label>
                        <input matInput type="date" formControlName="MaintenanceExpiry" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[180px] flex-1">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="MaintenanceRemark" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="w-40">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="MaintenanceRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Other Bond -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Other Bond:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" formControlName="OtherValue" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 60px">
                        <mat-select formControlName="otherUnit">
                          <mat-option value="%">%</mat-option>
                          <mat-option value="$">$</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[140px] flex-1">
                        <mat-label>Call Basis</mat-label>
                        <input matInput formControlName="OtherCallBasis" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[160px] flex-1">
                        <mat-label>Expiry Date</mat-label>
                        <input matInput type="date" formControlName="OtherExpiry" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="min-w-[180px] flex-1">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="OtherRemark" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="w-40">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="OtherRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 5" class="section">
              <div class="p-4 bg-white shadow rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">
                  Warranties & Guarantees
                </h2>

                <div formGroupName="Warranties" class="space-y-8">
                  <!-- Parent Company Guarantee -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Parent Company Guarantee:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group
                          formControlName="ParentCompanyGuarantee"
                          class="flex gap-6"
                        >
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ParentCompanyDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ParentCompanyRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Parent Company Undertaking:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group
                          formControlName="ParentCompanyUndertaking"
                          class="flex gap-6"
                        >
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ParentCompanyUndertakingDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ParentCompanyUndertakingRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Collateral Warranties:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="CollateralWarranties" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="CollateralWarrantiesDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="CollateralWarrantiesRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Other Contingent Liabilities:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="OtherContingent" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="OtherContingentDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="OtherContingentRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Provided by Employer:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="ProvidedByEmployer" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ProvidedByEmployerDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ProvidedByEmployerRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 6" class="section">
              <div class="p-4 bg-white shadow rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Insurance</h2>

                <div formGroupName="Insurance" class="space-y-6">
                  <!-- Provided by Employer -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Provided by Employer:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="ProvidedByEmployer" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ProvidedByEmployerDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ProvidedByEmployerRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Min Amount of Third Party Liability -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Min Amount of Third Party Liability:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ThirdPartyDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ThirdPartyRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Onerous Requirements -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Onerous Requirements:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="OnerousRequirements" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="OnerousRequirementsDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="OnerousRequirementsRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Shortfall in Cover -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Shortfall in Cover:</div>
                    <div class="flex flex-wrap gap-6 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="ShortfallInCover" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ShortfallInCoverDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ShortfallInCoverRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 7" class="section">
              <div class="p-4 bg-white shadow rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Other issue</h2>

                <div formGroupName="OtherIssue" class="space-y-6">
                  <div class="form-row">
                    <div class="w-40 font-semibold">
                      New Plant Requirements and value of Investment Required:
                    </div>
                    <div class="flex flex-wrap items-center gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <textarea matInput formControlName="NewPlantDetails" rows="2"></textarea>
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="NewPlantRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Min Amount of Third Party Liability -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">PFI or PPP Bid:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="PFIorPPPBid" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="pfiOrPPPBidRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Onerous Requirements -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Financing Required:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <div class="radio-group-container min-w-[200px]">
                        <mat-radio-group formControlName="FinancingRequired" class="flex gap-6">
                          <mat-radio-button value="Yes" class="radio-option">Yes</mat-radio-button>
                          <mat-radio-button value="No" class="radio-option">No</mat-radio-button>
                          <mat-radio-button value="N.A." class="radio-option">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="FinancingRequiredRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Foreign Currency Content -->
                  <div class="form-row">
                    <div class="w-40 font-semibold">Foreign Currency Content:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ForeignCurrencyContentDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ForeignCurrencyContentRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 8" class="section">
              <div class="p-4 bg-white shadow rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Consultant</h2>
                <div formGroupName="Consultant & Competitor" class="space-y-6">
                  <div class="form-row">
                    <div class="w-40 font-semibold">Civil & Structural:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="CivilStructuralDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="CivilStructuralRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Architect:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="ArchitectDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="ArchitectRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">E&M:</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="EMDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="EMRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Quantity Surveyor</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="QuantitySurveyorDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="QuantitySurveyorRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Other</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="OtherDetails" />
                      </mat-form-field>

                      <mat-form-field appearance="fill" style="max-width: 250px">
                        <mat-label>Degree of Risk</mat-label>
                        <mat-select formControlName="OtherRisk">
                          <mat-option value="H">High</mat-option>
                          <mat-option value="M">Medium</mat-option>
                          <mat-option value="L">Low</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>

                  <h2 class="text-lg font-bold mb-4 text-[#1976d2]">Competitors</h2>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Competitor</div>
                    <div class="flex flex-wrap gap-8 flex-1">
                      <mat-form-field appearance="fill" class="min-w-[250px] flex-1">
                        <mat-label>Details</mat-label>
                        <input matInput formControlName="competitorDetails" />
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 9" class="section">
              <div class="p-6 bg-white shadow-lg rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Evaluation</h2>
                <div formGroupName="Evaluation" class="space-y-6">
                  <!-- First Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <!-- Contract Conditions Group -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Acceptability of Contract Conditions:</div>
                        <mat-radio-group formControlName="AcceptibilityRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="AcceptibilityRemark" />
                      </mat-form-field>
                    </div>

                    <!-- Payment Terms Group -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Payment Terms Evaluation:</div>
                        <mat-radio-group formControlName="PaymentTermsRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="PaymentTermsRemark" />
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Second Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <!-- Bonds and Guarantees Group -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Bonds and Guarantees</div>
                        <mat-radio-group
                          formControlName="BondandGuaranteesRadio"
                          class="flex gap-4"
                        >
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="BondandGuaranteesRemark" />
                      </mat-form-field>
                    </div>

                    <!-- Contract Value Group -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">The value & extent of the contract</div>
                        <mat-radio-group formControlName="ContractValueRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="ContractValueRemark" />
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Third Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Plant & special equipment requirement</div>
                        <mat-radio-group formControlName="PlantEquipmentRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="PlantEquipmentRemark" />
                      </mat-form-field>
                    </div>

                    <!-- Contract Value Group -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">The availability of site management</div>
                        <mat-radio-group formControlName="SiteManagementRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="SiteManagementRemark" />
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Fourth Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">The Company's current workload</div>
                        <mat-radio-group formControlName="CurrentWorkloadRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="CurrentWorkloadRemark" />
                      </mat-form-field>
                    </div>

                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">The time allowed to tender</div>
                        <mat-radio-group formControlName="TimeAllowedRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="TimeAllowedRemark" />
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Fifth Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">The previous record of the consultants</div>
                        <mat-radio-group formControlName="previousRecordRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="previousRecordRemark" />
                      </mat-form-field>
                    </div>

                    <!-- Contract Value Group -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Health Safety & Environment</div>
                        <mat-radio-group
                          formControlName="HealthSafetyEnvironmentRadio"
                          class="flex gap-4"
                        >
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="HealthSafetyEnvironmentRemark" />
                      </mat-form-field>
                    </div>
                  </div>

                  <!-- Sixth Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">The Competition</div>
                        <mat-radio-group formControlName="CompetitionRadio" class="flex gap-4">
                          <mat-radio-button value="Yes" color="primary">Yes</mat-radio-button>
                          <mat-radio-button value="No" color="warn">No</mat-radio-button>
                          <mat-radio-button value="N.A." color="accent">N/A</mat-radio-button>
                        </mat-radio-group>
                      </div>
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Remark</mat-label>
                        <input matInput formControlName="CompetitionRemark" />
                      </mat-form-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="w-40 font-semibold">Evaluation Comments</div>
                    <div class="flex-1">
                      <mat-form-field appearance="fill" class="w-full">
                        <mat-label>Comments</mat-label>
                        <textarea matInput formControlName="EvaluationComments"></textarea>
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 10" class="section">
              <div class="p-6 bg-white shadow-lg rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Distribution</h2>

                <div formGroupName="Distribution" class="space-y-6">
                  <!-- First Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Chief Executive</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="ChiefExecutive" />
                        </mat-form-field>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Division Commercial Manager</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="DivisionCommercialManager" />
                        </mat-form-field>
                      </div>
                    </div>
                  </div>
                  <!-- Second Row -->
                  <!-- Second Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Executive Director</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="ExecutiveDirector" />
                        </mat-form-field>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Insurance Manager</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="InsuranceManager" />
                        </mat-form-field>
                      </div>
                    </div>
                  </div>
                  <!-- Third Row -->
                  <!-- Third Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Director</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="Director" />
                        </mat-form-field>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Head of Lambeth</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="HeadofLambeth" />
                        </mat-form-field>
                      </div>
                    </div>
                  </div>
                  <!--forth Row -->
                  <!-- Fourth Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Bid Manager</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="BidManager" />
                        </mat-form-field>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Head of Procurement</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="HeadOfProcurement" />
                        </mat-form-field>
                      </div>
                    </div>
                  </div>
                  <!-- Fifth Row -->
                  <!-- Fifth Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Finance Director</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="FinanceDirector" />
                        </mat-form-field>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Risk & Opportunity Manager</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="RiskOpportunityManager" />
                        </mat-form-field>
                      </div>
                    </div>
                  </div>
                  <!-- Sixth Row -->
                  <!-- Sixth Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">Commercial Director</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="CommercialDirector" />
                        </mat-form-field>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">HSEQ</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="HSEQ" />
                        </mat-form-field>
                      </div>
                    </div>
                  </div>
                  <!-- Seventh Row -->
                  <!-- Seventh Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <div class="w-40 font-semibold">General Counsel - Legal</div>
                        <mat-form-field appearance="fill" class="w-full">
                          <input matInput formControlName="GeneralCounselLegal" />
                        </mat-form-field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="currentStep === 11" class="section">
              <div class="p-6 bg-white shadow-lg rounded-lg">
                <h2 class="text-xl font-bold mb-6 border-b pb-3 text-[#1976d2]">Attachment</h2>
              </div>
            </div>

            <!-- Placeholder Sections -->
            <!-- <div *ngIf="currentStep > 4" class="section">
              <h3>{{ steps[currentStep - 1] }}</h3>
              <p>Content for {{ steps[currentStep - 1] }} will be added later.</p>
            </div> -->

            <!-- Navigation Buttons -->
            <div class="actions">
              <button
                type="button"
                mat-button
                (click)="previousStep()"
                [disabled]="currentStep === 1"
              >
                Previous
              </button>
              <button
                type="button"
                mat-raised-button
                color="primary"
                (click)="nextStep()"
                *ngIf="currentStep < steps.length"
              >
                Next
              </button>
              <button
                type="submit"
                mat-raised-button
                color="primary"
                [disabled]="!formGroup.valid"
                *ngIf="currentStep === steps.length"
              >
                Submit
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .evaluation-item {
        background: white;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .evaluation-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .mat-radio-button.mat-accent .mat-radio-inner-circle {
        background-color: #1976d2;
      }

      .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {
        border-color: #1976d2;
      }

      .mat-radio-button .mat-radio-label-content {
        font-size: 14px;
        padding-left: 8px;
      }

      .header-icons {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-right: 16px;
      }

      .header-icons button {
        background: none;
        border: none;
        cursor: pointer;
      }

      .header-icons mat-icon {
        font-size: 24px;
        color: #1976d2;
      }

      .header-icons mat-icon:hover {
        color: #0056b3;
      }

      .draft-btn {
        display: block;
        margin: 16px auto 0;
        background-color: #007bff;
        color: white;
        border: none;
        width: 100px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      .draft-btn:hover {
        background-color: #0056b3;
      }

      .form-detail-container {
        padding: 20px;
        margin: 0 auto;
      }

      .form-navigation {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        background-color: #ffffff;
        padding: 10px 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .step-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        padding: 10px;
        transition: background-color 0.3s, color 0.3s;
      }

      .step-item.active {
        background-color: #1976d2;
        color: white;
        font-weight: bold;
        border-radius: 4px;
      }

      .step-item:hover {
        background-color: #e0e0e0;
      }

      .step-number {
        font-size: 18px;
        font-weight: bold;
      }

      .step-label {
        font-size: 14px;
      }

      .section {
        margin-bottom: 30px;
      }

      .section h3 {
        color: #1976d2;
        margin-bottom: 16px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 8px;
      }

      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }

      .form-row mat-form-field {
        flex: 1;
      }

      .full-width {
        width: 100%;
      }

      .actions {
        display: flex;
        gap: 16px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;
      }

      mat-form-field {
        --mat-form-field-padding: 8px; /* Add padding inside the form field */
      }

      input[matInput] {
        padding: 8px; /* Add padding inside the input box */
      }

      textarea[matInput] {
        padding: 8px; /* Add padding inside the textarea */
      }

      .unit-select {
        width: 60px;
      }

      .radio-group-container {
        display: flex;
        align-items: center;
        padding: 8px 0;
        min-height: 48px;
      }

      .radio-option {
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
      }

      .radio-option:hover {
        background-color: #f5f5f5;
      }

      mat-radio-group {
        margin: 8px 0;
        align-items: center;
      }
    `,
  ],
})
export class FormDetailComponent implements OnInit {
  formGroup!: FormGroup;
  isEditMode = false;
  formId: number | null = null;
  currentStep = 1; // Track the current step
  steps = [
    'Project',
    'Contract',
    'Payment',
    'Bonds',
    'Warranty & Guarantees',
    'Insurances',
    'Other Issues',
    'Consultant & Competitor',
    'Evaluation',
    'Distribution',
    'Attachment',
  ];

  bonds = [
    { bondType: 'Tender Bond' },
    { bondType: 'Performance Bond' },
    { bondType: 'Advance Payment Bond' },
    { bondType: 'Retention Bond' },
    { bondType: 'Maintenance Bond' },
    { bondType: 'Others' },
  ];

  Warranties = [
    { warrantyType: 'Parent Company Guarantee' },
    { warrantyType: 'Parent Company Undertaking' },
    { warrantyType: 'Collateral Warranties' },
    { warrantyType: 'Other Contingent Liabilities' },
    { warrantyType: 'Provided by Employer' },
  ];

  Insurance = [
    { insuranceType: 'Provided by Employer' },
    { insuranceType: 'Min Amount of Third Party Liability' },
    { insuranceType: 'Onerous Requirements' },
    { insuranceType: 'Shortfall in Cover' },
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] !== 'new') {
        this.formId = +params['id'];
        this.isEditMode = true;
        this.loadForm(this.formId);
      }
    });
  }

  private initializeForm(): void {
    this.formGroup = this.fb.group({
      form30: [''],
      businessUnit: ['', Validators.required],
      dueDate: [''],
      performanceUnit: ['%'],

      tenderNo: [''],
      projectTitle: ['', Validators.required],

      BidManager: [''],
      Estimator: [''],
      Planner: [''],

      Region: [''],
      Location: [''],
      TenderType: [''],
      BriefDescription: [''],

      ApproxValue: [''],

      ApproximateValue: [''],
      ApproximateValueInput: [''],
      ApproximateValueType: [''],
      Approxmargin: [''],
      Maintence: [''],

      maintenanceType: [''],
      maintenanceValue: [''],
      maintenanceStatus: [''],

      /*page 2*/

      Client: [''],
      ContractPeriod: [''],
      FinantialStanding: [''],

      TenderMarketScheme: [''],
      FinancialTechnicalSplitValue: [''],
      BidType: [''],

      duedate: [''],
      projectDescription: [''],
      contract: this.fb.group({
        contractType: [''],
        contractDuration: [''],
        Type: [''],
        Description: [''],
        DegreeName: [''],
        DegreeRiskType: [''],
        DegreeRiskLimit: [''],
        RateOfDamages: [''],
        LimitOfLiability: [''],

        MeasurementDetails: [''],
        Fluctuations: [''],

        Adverse: [''],
        TimeExtension: [''],
        WeatherExtention: [''],
        OtherUnusualConditions: [''],
        DesignResponsibility: [''],
        BIMRequired: [''],
        DFMARequired: [''],
      }),

      payment: this.fb.group({
        Period: [''],
        Months: [''],
        DegreeRiskType: [''],
        DegreeRiskType2: [''],
        Remarks: [''],
        Retention: [''],
        Percent: [''],
        Remarks2: [''],

        PaymentPeriod: [''],
        Months2: [''],
        LimitofRetention: [''],
        LimitofRetentionselect: [''],
        DegreeRiskType3: [''],

        MaxExposureAmount: [''],
        MaxExposureMonths: [''],
        PeakDeficit: [''],
        PeakSurplus: [''],
        RiskLevel: [''],
        AverageSurplus: [''],
        AverageDeficit: [''],
      }),

      Bonds: this.fb.group({
        // Tender Bond
        TenderValue: [''],
        tenderUnit: ['%'],
        TenderCallBasis: [''],
        TenderExpiry: [''],
        TenderRemark: [''],
        TenderRisk: ['M'],

        // Performance Bond
        PerformanceValue: [''],
        performanceUnit: ['%'],
        PerformanceCallBasis: [''],
        PerformanceExpiry: [''],
        PerformanceRemark: [''],
        degreeRisk2: ['M'],

        // Advance Payment Bond
        AdvanceValue: [''],
        advanceUnit: ['%'],
        AdvanceCallBasis: [''],
        AdvanceExpiry: [''],
        AdvanceRemark: [''],
        AdvanceRisk: ['M'],

        // Retention Bond
        RetentionValue: [''],
        retentionUnit: ['%'],
        RetentionCallBasis: [''],
        RetentionExpiry: [''],
        RetentionRemark: [''],
        RetentionRisk: ['M'],

        // Maintenance Bond
        MaintenanceValue: [''],
        maintenanceUnit: ['%'],
        MaintenanceCallBasis: [''],
        MaintenanceExpiry: [''],
        MaintenanceRemark: [''],
        MaintenanceRisk: ['M'],

        // Other Bond
        OtherValue: [''],
        otherUnit: ['%'],
        OtherCallBasis: [''],
        OtherExpiry: [''],
        OtherRemark: [''],
        OtherRisk: ['M'],
      }),

      Warranties: this.fb.group({
        // Parent Company Guarantee
        ParentCompanyGuarantee: [''],
        ParentCompanyDetails: [''],
        ParentCompanyRisk: ['M'],

        // Parent Company Undertaking
        ParentCompanyUndertaking: [''],
        ParentCompanyUndertakingDetails: [''],
        ParentCompanyUndertakingRisk: ['M'],

        // Collateral Warranties
        CollateralWarranties: [''],
        CollateralWarrantiesDetails: [''],
        CollateralWarrantiesRisk: ['M'],

        // Other Contingent Liabilities
        OtherContingent: [''],
        OtherContingentDetails: [''],
        OtherContingentRisk: ['M'],

        // Provided by Employer
        ProvidedByEmployer: [''],
        ProvidedByEmployerDetails: [''],
        ProvidedByEmployerRisk: ['M'],
      }),

      Insurance: this.fb.group({
        // Provided by Employer
        ProvidedByEmployer: [''],
        ProvidedByEmployerDetails: [''],
        ProvidedByEmployerRisk: ['M'],

        // Min Amount of Third Party Liability
        ThirdPartyAmount: [''],
        ThirdPartyUnit: ['M'],
        ThirdPartyDetails: [''],
        ThirdPartyRisk: ['M'],

        // Onerous Requirements
        OnerousRequirements: [''],
        OnerousRequirementsDetails: [''],
        OnerousRequirementsRisk: ['M'],

        // Shortfall in Cover
        ShortfallInCover: [''],
        ShortfallInCoverDetails: [''],
        ShortfallInCoverRisk: ['M'],
      }),

      OtherIssue: this.fb.group({
        // New Plant Requirements
        NewPlantDetails: [''],
        NewPlantRisk: ['M'],

        // PFI or PPP Bid
        PFIorPPPBid: [''],
        PFIorPPPBidDetails: [''],
        pfiOrPPPBidRisk: ['M'],

        // Financing Required
        FinancingRequired: [''],
        FinancingRequiredDetails: [''],
        FinancingRequiredRisk: ['M'],

        // Foreign Currency Content
        ForeignCurrencyContentDetails: [''],
        ForeignCurrencyContentRisk: ['M'],
      }),

      'Consultant & Competitor': this.fb.group({
        // Civil & Structural
        CivilStructuralDetails: [''],
        CivilStructuralRisk: [''],

        // Architect
        ArchitectDetails: [''],
        ArchitectRisk: [''],

        // E&M
        EMDetails: [''],
        EMRisk: [''],

        // Quantity Surveyor
        QuantitySurveyorDetails: [''],
        QuantitySurveyorRisk: [''],

        // Other
        OtherDetails: [''],
        OtherRisk: [''],

        // Competitor
        competitorDetails: [''],
      }),

      // Add Evaluation form group
      Evaluation: this.fb.group({
        AcceptibilityRadio: [''],
        AcceptibilityRemark: [''],

        PaymentTermsRadio: [''],
        PaymentTermsRemark: [''],

        BondandGuaranteesRadio: [''],
        BondandGuaranteesRemark: [''],

        ContractValueRadio: [''],
        ContractValueRemark: [''],

        PlantEquipmentRadio: [''],
        PlantEquipmentRemark: [''],

        SiteManagementRadio: [''],
        SiteManagementRemark: [''],

        CurrentWorkloadRadio: [''],
        CurrentWorkloadRemark: [''],

        TimeAllowedRadio: [''],
        TimeAllowedRemark: [''],

        previousRecordRadio: [''],
        previousRecordRemark: [''],

        HealthSafetyEnvironmentRadio: [''],
        HealthSafetyEnvironmentRemark: [''],

        CompetitionRadio: [''],
        CompetitionRemark: [''],

        EvaluationComments: [''],
      }),

      Distribution: this.fb.group({
        ChiefExecutive: [''],
        DivisionCommercialManager: [''],

        ExecutiveDirector: [''],
        InsuranceManager: [''],

        Director: [''],
        HeadofLambeth: [''],

        BidManager: [''],
        HeadOfProcurement: [''],

        FinanceDirector: [''],
        RiskOpportunityManager: [''],

        CommercialDirector: [''],
        HSEQ: [''],

        GeneralCounselLegal: [''],
      }),
    });
  }

  private loadForm(id: number): void {
    // TODO: Load form data from service
    console.log('Loading form:', id);
    // Mock data
    this.formGroup.patchValue({
      tenderNo: 'T2024001',
      projectName: 'Sample Construction Project',
      clientName: 'ABC Construction Ltd',
      contractValue: 10000000,
      currency: 'HKD',
      duedate: new Date(),
      projectDescription: 'Sample project description',
      contract: {
        contractType: 'lump-sum',
        contractDuration: 18,
      },
    });
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.steps.length) {
      this.currentStep = step;
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      if (this.isEditMode) {
        // TODO: Update form
        console.log('Updating form:', formData);
      } else {
        // TODO: Create new form
        console.log('Creating form:', formData);
      }
      this.goBack();
    }
  }

  saveDraft(): void {
    const formData = this.formGroup.value;
    // TODO: Save as draft
    console.log('Saving draft:', formData);
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/pts20/forms']);
  }
}
