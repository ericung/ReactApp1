Certainly! Here's a set of example codes showcasing how each design pattern works in a .NET 9 MVC application:

---

### **1. Repository Pattern**

```csharp
public interface IRepository<T>
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> GetByIdAsync(int id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

public class UserRepository : IRepository<User>
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync() => await _context.Users.ToListAsync();
    public async Task<User> GetByIdAsync(int id) => await _context.Users.FindAsync(id);
    public async Task AddAsync(User user) => await _context.Users.AddAsync(user);
    public async Task UpdateAsync(User user) => _context.Users.Update(user);
    public async Task DeleteAsync(int id)
    {
        var user = await GetByIdAsync(id);
        if (user != null) _context.Users.Remove(user);
    }
}
```

---

### **2. Unit of Work Pattern**

```csharp
public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public IRepository<User> UserRepository { get; }

    public UnitOfWork(AppDbContext context, IRepository<User> userRepository)
    {
        _context = context;
        UserRepository = userRepository;
    }

    public async Task CommitAsync() => await _context.SaveChangesAsync();
}
```

---

### **3. CQRS Pattern**

**Command Handler Example:**

```csharp
public class CreateUserCommand
{
    public string Name { get; set; }
    public string Email { get; set; }
}

public class CreateUserHandler
{
    private readonly IRepository<User> _repository;

    public CreateUserHandler(IRepository<User> repository)
    {
        _repository = repository;
    }

    public async Task Handle(CreateUserCommand command)
    {
        var user = new User { Name = command.Name, Email = command.Email };
        await _repository.AddAsync(user);
    }
}
```

---

### **4. Mediator Pattern**

```csharp
public interface IMediator
{
    Task Send<T>(T request);
}

public class Mediator : IMediator
{
    private readonly IServiceProvider _serviceProvider;

    public Mediator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task Send<T>(T request)
    {
        var handler = _serviceProvider.GetService(typeof(IRequestHandler<T>)) as IRequestHandler<T>;
        if (handler != null) await handler.Handle(request);
    }
}
```

---

### **5. Decorator Pattern**

```csharp
public interface IUserService
{
    Task<User> GetUserByIdAsync(int id);
}

public class UserService : IUserService
{
    public async Task<User> GetUserByIdAsync(int id) => await _context.Users.FindAsync(id);
}

public class CachedUserService : IUserService
{
    private readonly IUserService _innerService;
    private readonly ICache _cache;

    public CachedUserService(IUserService innerService, ICache cache)
    {
        _innerService = innerService;
        _cache = cache;
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        var cachedUser = _cache.Get<User>(id);
        if (cachedUser != null) return cachedUser;

        var user = await _innerService.GetUserByIdAsync(id);
        _cache.Set(id, user);
        return user;
    }
}
```

---

### **6. Factory Pattern**

```csharp
public static class UserFactory
{
    public static User CreateAdminUser(string name, string email)
    {
        return new User { Name = name, Email = email, Role = "Admin" };
    }
}
```

---

### **7. Observer Pattern**

```csharp
public class UserNotifier : IObserver<User>
{
    public void Update(User user)
    {
        Console.WriteLine($"User {user.Name} has been updated!");
    }
}
```

---

### **8. Dependency Injection**

**Controller Example:**

```csharp
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        return View(user);
    }
}
```

---

### **9. Service Layer Pattern**

```csharp
public class UserService
{
    private readonly IRepository<User> _repository;

    public UserService(IRepository<User> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _repository.GetAllAsync();
}
```

---

### **10. Builder Pattern**

```csharp
public class UserBuilder
{
    private readonly User _user;

    public UserBuilder()
    {
        _user = new User();
    }

    public UserBuilder WithName(string name)
    {
        _user.Name = name;
        return this;
    }

    public UserBuilder WithEmail(string email)
    {
        _user.Email = email;
        return this;
    }

    public User Build() => _user;
}
```

---

Let me know if you'd like me to explain any of these in detail or adapt them for your specific needs!