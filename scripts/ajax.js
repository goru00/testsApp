var XMLHttpRequestObject = false;
if (window.XMLHttpRequest)
{
    XMLHttpRequestObject = new XMLHttpRequest();
} else if (window.ActiveXObject)
{
    XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function Selection
(
    status = '',
    testId = '',
    dateStart = '',
    timeStart = '',
    data = ''
){
    var xhr = new XMLHttpRequest();
    var result;
    xhr.open("POST", "engine/ajax.php");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("JSON: " + this.responseText);
            result = JSON.parse(this.responseText);
            if (status == "tests") ShowTests(result);
            if (status == "acTests") ShowAcceptedTests(result);
            if (testId && result && dateStart && timeStart && status) CreateTest(result);
            if (status && testId && data) ShowResult(result);
        }
    }
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.getResponseHeader('Content-type', 'application/json');
    let json = JSON.stringify({
        status,
        testId,
        dateStart,
        timeStart,
        data
    });
    xhr.send(json);
}