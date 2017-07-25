import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Subjects }           from './subjects';
import { Partition }          from './partition';
import { SubjectsService }    from './subjects.service';

@Component({
  selector: 'ui-subjects-detail',
  templateUrl: './subjects-edit.component.html',
  styleUrls: ['./subjects-edit.component.css']
})

export class SubjectsEditComponent implements OnInit, OnDestroy {
  subject: Subjects;
  subjects: Subjects[];
  partitionView = false;
  @Output() close = new EventEmitter();
  partitions = [
    new Partition(0),
    new Partition(1),
    new Partition(2)
  ];
  error: any;
  sub: any;
  navigated = false;

  constructor(
    private subjectsService: SubjectsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.subjectsService.getSubjects()
          .then(subjects => {
            this.subjects = subjects;
            this.subject = this.subjects.find(sub => sub.id === id);
            this.togglePartition();
          })
      } else {
        this.navigated = false;
        this.subject = new Subjects();
        this.subjectsService.getSubjects()
          .then(subjects => {
            this.subjects = subjects;
          })
      }
    });
  }

  togglePartition() {
    if (this.subject.partitionType == 1) {
      this.partitionView = true;
    } else {
      this.partitionView = false;
      this.subject.theorySubjectId = 0;
      this.subject.practicalSubjectId = 0;
    }
  }

  onTheorySubjectAssigned(subjectId: number) {
    this.subject.theorySubjectId = subjectId;
  }

  onPracticalSubjectAssigned(subjectId: number) {
    this.subject.practicalSubjectId = subjectId;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.subjectsService
      .save(this.subject)
      .then(subject => {
        this.subject = subject;
        this.goBack(subject);
      })
      .catch(error => this.error = error);
  }

  goBack(savedSubject: Subjects = null) {
    this.close.emit(savedSubject);
    if (this.navigated) { window.history.back(); }
  }

}