using Microsoft.AspNetCore.Mvc;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly ILogger<StudentController> _logger;

        private List<Student> _students;

        public StudentController(ILogger<StudentController> logger)
        {
            _logger = logger;
        }

        
        [HttpGet(Name = "GetStudent")]
        public IEnumerable<Student> Get()
        {
            if (_students is null)
            {
                LoadStudents();
            }

            return Enumerable.Range(0, 100).Select(index => new Student
            {
                Id = _students[index].Id,
                DBN = _students[index].DBN,
                Date = _students[index].Date,
                Enrolled = _students[index].Enrolled,
                Absent = _students[index].Absent,
                Present = _students[index].Present,
                Released = _students[index].Released,
            })
            .ToArray();
        }
        private void LoadStudents()
        {
            Stream stream = new FileStream("C:/Users/unger/source/repos/ReactApp1/Data/2018-2019_Daily_Attendance_20240429.csv", FileMode.Open);

            var file = File(stream, "text/csv");
            _students = new List<Student>();

            using (StreamReader sr = new StreamReader(file.FileStream))
            {
                sr.ReadLine();
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    if (line != null)
                    {
                        var splitLine = line.Split(',');

                        _students.Add(new Student
                        {
                            Id = Guid.NewGuid().ToString(),
                            DBN = splitLine[0],
                            Date = splitLine[1],
                            Enrolled = splitLine[2],
                            Absent = splitLine[3],
                            Present = splitLine[4],
                            Released = splitLine[5],
                        });
                    }
                }
            }
        }

    }
}
