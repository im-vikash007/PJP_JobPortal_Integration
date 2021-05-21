const getData = document.getElementById('fetch-data');

const request = new XMLHttpRequest();

request.open('GET', 'data.json', true);
request.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    const obj = JSON.parse(this.responseText)
    populate(obj);
  }
}
request.send();

// var output = 

function populate(obj) {
  console.log(obj);
  obj.forEach(row => {
    console.log(row);
    if (row.id == 1) {
      getData.innerHTML = `<div class="container" style="width: 70%; align-items: center;">
                <h3>Personal Details ____________________</h3>
                <br>
                <table>
                  <tr>
                    <td>User ID: </td>
                    <td>` + row.id + `</td>
                  </tr>
                  <tr>
                    <td>First Name: </td>
                    <td>` + row.firstName + `</td>
                  </tr>
                  <tr>
                    <td>Last Name: </td>
                    <td>` + row.lastName + `</td>
                  </tr>
                  <tr>
                    <td>Gender: </td>
                    <td>` + row.gender + `</td>
                  </tr>
                  <tr>
                    <td>Date of Birth: </td>
                    <td>` + row.dob + `</td>
                  </tr>
                  <tr>
                    <td>Email ID: </td>
                    <td>` + row.email + `</td>
                  </tr>
                  <tr>
                    <td>Phone: </td>
                    <td>` + row.phone + `</td>
                  </tr>
                  <tr>
                    <td>Years of Experience: </td>
                    <td>` + row.yoe + `</td>
                  </tr>
                </table>
                <br>
                <h3>Qualification Details ____________________</h3>
                <br>
                <table>
                  <tr>
                    <td>Institute Name: </td>
                    <td>` + row.qualificationDetails.instituteName + `</td>
                  </tr>
                  <tr>
                    <td>Duration: </td>
                    <td>` + row.qualificationDetails.startDate + ` - ` +
        row.qualificationDetails.endDate + `</td>
                  </tr>
                  <tr>
                    <td>Degree: </td>
                    <td>` + row.qualificationDetails.degree + `</td>
                  </tr>
                  <tr>
                    <td>Stream: </td>
                    <td>` + row.qualificationDetails.stream + `</td>
                  </tr>
                  <tr>
                    <td>Percentage: </td>
                    <td>` + row.qualificationDetails.percentage + ` %</td>
                  </tr>
              </table>
              <br>
              <h3>Skills ____________________</h3>
              <br>
              <table>
                  <tr>
                    <td>Skills: </td>
                    <td>` + row.skills + `</td>
                  </tr>
              </table>
              <br>
              <h3>Work Experience ____________________</h3>
              <br>
                <table>
                  <tr>
                    <td>Role: </td>
                    <td>` + row.workExperience.role + `</td>
                  </tr>
                  <tr>
                    <td>Organization: </td>
                    <td>` + row.workExperience.organization + `</td>
                  </tr>
                  <tr>
                    <td>Location: </td>
                    <td>` + row.workExperience.location + ` %</td>
                  </tr>
                  <tr>
                    <td>Duration: </td>
                    <td>` + row.workExperience.startDate + ` - ` +
        row.workExperience.endDate + `</td>
                  </tr>
                  <tr>
                    <td>Description: </td>
                    <td style="text-align: justify">` + row.workExperience.description + `</td>
                  </tr>
              </table>
              <br>
              <h3>Project Details ____________________</h3>
              <br>
              <table>
                  <tr>
                    <td>Project Title: </td>
                    <td>` + row.projectDetails.title + `</td>
                  </tr>
                  <tr>
                    <td>Duration: </td>
                    <td>` + row.projectDetails.startDate + ` - ` +
        row.projectDetails.endDate + `</td>
                  </tr>
                  <tr>
                    <td>Description: </td>
                    <td style="text-align: justify">` + row.projectDetails.description + `</td>
                  </tr>
              </table>
              <br>
              <h3>Certifications ____________________</h3>
              <br>
              <table>
                  <tr>
                    <td>Course Nmae: </td>
                    <td>` + row.certifications.courseName + `</td>
                  </tr>
                  <tr>
                    <td>Issuing Organization: </td>
                    <td>` + row.certifications.issuingOrganization + `</td>
                  </tr>
                  <tr>
                    <td>Issue Date: </td>
                    <td style="text-align: justify">` + row.certifications.issueDate + `</td>
                  </tr>
                  <tr>
                    <td>Description: </td>
                    <td style="text-align: justify">` + row.certifications.description + `</td>
                  </tr>
              </table>
              <br>
              <h3>Awards ____________________</h3>
              <br>
              <table>
                  <tr>
                    <td>Awards: </td>
                    <td>` + row.awards + `</td>
                  </tr>
              </table>
              <br>
              <h3>Others ____________________</h3>
              <br>
              <table>
                  <tr>
                    <td>Relocate: </td>
                    <td>` + row.others.relocate + `</td>
                  </tr>
                  <tr>
                    <td>Location Preference: </td>
                    <td>` + row.others.locationPreference + `</td>
                  </tr>
                  <tr>
                    <td>Salary Expectation: </td>
                    <td style="text-align: justify">` + row.others.salaryExpectation + `</td>
                  </tr>
              </table>
            </div>`;
    }
  });
  // getData.innerHTML = myContainer;
}