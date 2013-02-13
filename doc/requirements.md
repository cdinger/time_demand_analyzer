Time Demand Analysis Tool
=========================
(A Possible MSSE SEng 5831 Real-Time Project)

Write a simple software tool to perform a uni-processor time demand analysis on a 
periodic task set that is scheduled using a preemptive fixed priority discipline.

Include a capability to model:
- model explicit deadlines that are smaller than the period 
- model non-preemptable activities and mutually exclusive access using realtime
  semaphores within tasks (i.e. include support for blocking times)

Use this software to analyze the following workloads to determine which are
feasible and which are not. Document the detailed input model that is being
subjected to analysis as well as the results of the analysis (e.g. clearly
show where any blocking times have been introduced). Where a workload is
infeasible, indicate which subset of the tasks will always meet their deadlines
and which subset is at risk of missing deadlines.

For all workloads, use a deadline monotonic priority assignment.

Workload 1
----------
Task 1 has period and deadline 25ms, execution time 8ms.
Task 2 has period and deadline 50ms, execution time 13ms.
Task 3 has period and deadline 100ms, execution time 40ms.

Workload 2
----------
This is identical to workload 1, except task 1 has a deadline of 9ms and task 3 has a 
deadline of 75ms.

Workload 3
----------
Task 1 has period and deadline 20ms, execution time 5ms.
Task 2 has period and deadline 30ms, execution time 12ms.
Task 3 has period and deadline 50ms, execution time 15ms.
There is a dispatcher task that has a period of 10ms and an execution time of 1ms.

Workload 4
----------
This is identical to workload 1, except task 1 has a deadline of 9ms, and tasks 2 and 3 
access a shared data structure and contain mutually exclusive critical sections that may 
execute for 2ms.  (The 2ms is included in the execution times, i.e. task 2 has a maximum 
execution time of 13 ms, but it may be in a mutually exclusive section for up to 2ms at a 
time during that 13ms.)   Assume mutual exclusion is achieved by masking interrupts, i.e. 
non-preemption is used to insure mutual exclusion.

Workload 5
----------
This is identical to workload 4, except a priority inheritance real-time semaphore is used 
to assure mutual exclusion between tasks 2 and 3.
