import { CookieService }          	from 'angular2-cookie/core';
import { LoginService }				from '../authentication/signin/credentials.service';
import { LoggedInGuard }			from '../authentication/logged-in.guard';
import { AttendanceService }        from '../classroom/attendance/attendance.service';
import { ClassService }             from '../classroom/class/class.service';
import { ClassSubjectGroupService } from '../topic/class-subject-group/class-subject-group.service';
import { HomeworkService }          from '../classroom/homework/homework.service';
import { SectionService }           from '../classroom/section/section.service';
import { StudentService }        	from '../people/student/student.service';
import { SubjectGroupService }      from '../topic/subject-group/subject-group.service';
import { SubjectGroupSubjectService}from '../topic/subject-group-subject/subject-group-subject.service';
import { SubjectTeacherService }    from '../topic/subject-teacher/subject-teacher.service';
import { SubjectsService }        	from '../topic/subjects/subjects.service';
import { TeacherService }        	from '../people/teacher/teacher.service';
import { TimetableService }        	from '../classroom/timetable/timetable.service';
import { ExamService }        		from '../scholastic/exam/exam.service';
import { ExamSubjectGroupService }  from '../scholastic/exam-subject-group/exam-subject-group.service';
import { ExamSubjectService }       from '../scholastic/exam-subject/exam-subject.service';
import { ActivityService }     		from '../scholastic/activity/activity.service';
import { SubActivityService }     	from '../scholastic/subactivity/subactivity.service';
import { SubjectStudentService } 	from '../topic/subject-student/subject-student.service';
import { MarkService }				from '../scholastic/mark/mark.service';
import { ActivityScoreService }		from '../scholastic/activity-score/activity-score.service';
import { SubActivityScoreService }	from '../scholastic/subactivity-score/subactivity-score.service';
import { PortionService }			from '../classroom/portion/portion.service';
import { SliptestService }			from '../scholastic/sliptest/sliptest.service';
import { SliptestScoreService }		from '../scholastic/sliptest-score/sliptest-score.service';
import { GradeClassWiseService }	from '../scholastic/grade-class-wise/grade-class-wise.service';
import { CceStudentProfileService } from '../coscholastic/cce-student-profile/cce-student-profile.service';
import { CceCoscholasticService }	from '../coscholastic/cce-coscholastic/cce-coscholastic.service';
import { CceCoschClassService }		from '../coscholastic/cce-coscholastic-class/cce-coscholastic-class.service';
import { SectionHeadingService }    from '../coscholastic/cce-section-heading/cce-section-heading.service';
import { TopicPrimaryService }    	from '../coscholastic/cce-topic-primary/cce-topic-primary.service';
import { AspectPrimaryService }    	from '../coscholastic/cce-aspect-primary/cce-aspect-primary.service';
import { TopicGradeService }    	from '../coscholastic/cce-topic-grade/cce-topic-grade.service';
import { AspectGradeService }    	from '../coscholastic/cce-aspect-grade/cce-aspect-grade.service';
import { SchoolService }            from '../school/school.service';

export const myServices = [
	CookieService,
	LoginService,
	LoggedInGuard,
    AttendanceService,
    ClassService,
    ClassSubjectGroupService,
    HomeworkService,
    SectionService,
    StudentService,
    SubjectGroupService,
    SubjectGroupSubjectService,
    SubjectTeacherService,
    SubjectsService,
    TeacherService,
    TimetableService,
    ExamService,
    ExamSubjectGroupService,
    ExamSubjectService,
    ActivityService,
    SubActivityService,
    SubjectStudentService,
    MarkService,
    ActivityScoreService,
    SubActivityScoreService,
    PortionService,
    SliptestService,
    SliptestScoreService,
    GradeClassWiseService,
    CceStudentProfileService,
    CceCoscholasticService,
    CceCoschClassService,
    SectionHeadingService,
    TopicPrimaryService,
    AspectPrimaryService,
    TopicGradeService,
    AspectGradeService,
    SchoolService
]