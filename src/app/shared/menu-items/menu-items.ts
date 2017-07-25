import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: 'classroom',
    name: 'Classroom',
    type: 'sub',
    icon: 'basic-postcard',
    children: [
      {
        state: 'class',
        name: 'Class'
      },
      {
        state: 'section',
        name: 'Section'
      },
      {
        state: 'attendance',
        name: 'Attendance'
      },
      {
        state: 'homework',
        name: 'Homework'
      },
      {
        state: 'timetable',
        name: 'Timetable'
      },
      {
        state: 'portion',
        name: 'Portion'
      }
    ]
  },
  {
    state: 'topic',
    name: 'Topic',
    type: 'sub',
    icon: 'basic-spread-text-bookmark',
    children: [
      {
        state: 'subjects',
        name: 'Subjects'
      },
      {
        state: 'subject-group',
        name: 'Subject Group'
      },
      {
        state: 'subject-group-subject',
        name: 'Subject Group Subject'
      },
      {
        state: 'subject-teacher',
        name: 'Subject Teacher'
      },
      {
        state: 'subject-student',
        name: 'Subject Student'
      },
      {
        state: 'class-subject-group',
        name: 'Class Subject Group'
      }
    ]
  },
  {
    state: 'scholastic',
    name: 'Scholastic',
    type: 'sub',
    icon: 'basic-sheet-pen',
    children: [
      {
        state: 'exam',
        name: 'Exam'
      },
      {
        state: 'exam-subject-group',
        name: 'Exam Subject Group'
      },
      {
        state: 'exam-subject',
        name: 'Exam Subject'
      },
      {
        state: 'mark',
        name: 'Mark'
      },
      {
        state: 'activity',
        name: 'Activity'
      },
      {
        state: 'activity-score',
        name: 'Activity Score'
      },
      {
        state: 'subactivity',
        name: 'Sub-Activity'
      },
      {
        state: 'subactivity-score',
        name: 'Sub-Activity Score'
      },
      {
        state: 'grade-class-wise',
        name: 'Grade Class Wise'
      },
      {
        state: 'sliptest',
        name: 'Sliptest'
      },
      {
        state: 'sliptest-score',
        name: 'Sliptest Score'
      }
    ]
  },
  {
    state: 'coscholastic',
    name: 'Coscholastic',
    type: 'sub',
    icon: 'basic-todo-txt',
    children: [
      {
        state: 'cce-student-profile',
        name: 'CCE Student Profile'
      },
      {
        state: 'cce-coscholastic',
        name: 'CCE Coscholastic'
      },
      {
        state: 'cce-coscholastic-class',
        name: 'CCE Coscholastic Class'
      },
      {
        state: 'cce-section-heading',
        name: 'CCE Section Heading'
      },
      {
        state: 'cce-topic-primary',
        name: 'CCE Topic Primary'
      },
      {
        state: 'cce-aspect-primary',
        name: 'CCE Aspect Primary'
      },
      {
        state: 'cce-topic-grade',
        name: 'CCE Topic Grade'
      },
      {
        state: 'cce-aspect-grade',
        name: 'CCE Aspect Grade'
      }
    ]
  },
  {
    state: 'people',
    name: 'People',
    type: 'sub',
    icon: 'basic-webpage-img-txt',
    children: [
      {
        state: 'student',
        name: 'Student'
      },
      {
        state: 'teacher',
        name: 'Teacher'
      }
    ]
  },
  {
    state: 'superadmin',
    name: 'Super Admin',
    type: 'link',
    icon: 'basic-lock-open'
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
