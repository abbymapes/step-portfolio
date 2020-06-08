// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.*;
import java.util.Comparator;

public final class FindMeetingQuery {
  public static final int START_OF_DAY = TimeRange.START_OF_DAY;
  public static final int END_OF_DAY = TimeRange.END_OF_DAY;
  public static final TimeRange WHOLE_DAY = TimeRange.WHOLE_DAY;
  public static final Comparator<TimeRange> ORDER_BY_START = TimeRange.ORDER_BY_START;

  Collection<TimeRange> possibleTimes = new ArrayList<>();
  ArrayList<TimeRange> allConflicts = new ArrayList<>();
  ArrayList<TimeRange> conflicts = new ArrayList<>();
  long requestDuration;
  Collection<String> attendees;
  
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    requestDuration = request.getDuration();
    attendees = request.getAttendees();
    if (requestDuration > WHOLE_DAY.duration()){
      return possibleTimes;
    }
    
    if (attendees.size() == 0){
      possibleTimes.add(WHOLE_DAY);
      return possibleTimes;
    }
    getFreeTimes(events, request);

    return possibleTimes;
  }

  public void getFreeTimes(Collection<Event> events, MeetingRequest request) {
    getConflicts(events, request);
    conflicts.sort(ORDER_BY_START);

    if(conflicts.size() == 0){
        possibleTimes.add(WHOLE_DAY);
    }

    else{
      int availableStart = START_OF_DAY;
      for(int i = 0; i < conflicts.size(); ++i){
        TimeRange conflict = conflicts.get(i);
        if (conflict.start() - availableStart >= requestDuration){
          possibleTimes.add(TimeRange.fromStartEnd(availableStart, conflict.start(), false));
        }
        availableStart = conflict.end();
        }
      if (END_OF_DAY - availableStart >= requestDuration){
        possibleTimes.add(TimeRange.fromStartEnd(availableStart, END_OF_DAY, true));
      }
    }
    return;
  }

  public void getConflicts(Collection<Event> events, MeetingRequest request) {
    for(Event event : events){
      Set<String> overlapAttendees = new HashSet<>(event.getAttendees());
      overlapAttendees.retainAll(attendees);
      if (!overlapAttendees.isEmpty()){
        allConflicts.add(event.getWhen());
      }
    }
    mergeOverlaps();
    return;
  }

  public void mergeOverlaps(){
    int numConflicts = allConflicts.size();
    allConflicts.sort(ORDER_BY_START);
    ArrayList<Integer> overlappingIndices = new ArrayList<>();
    
    for(int i = 0; i < numConflicts; ++i){
      if (overlappingIndices.contains(i)){
        continue;
      }
      else{
        TimeRange currentConflict = allConflicts.get(i);
        int currentStart = currentConflict.start();
        int currentEnd = currentConflict.end();

        for (int j = i + 1; j < numConflicts; ++j){
          TimeRange nextConflict = allConflicts.get(j);
          if(currentConflict.overlaps(nextConflict)){
            overlappingIndices.add(j);
            if (nextConflict.end() > currentEnd){
              currentConflict = TimeRange.fromStartEnd(currentStart, nextConflict.end(), false);
            }
          }
        }
        conflicts.add(currentConflict);
      }
    }
  }
}
