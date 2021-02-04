using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using TestTaskApp.Domain.Entities;

namespace TestTaskApp.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Product> Products { get; set; }

        DbSet<Category> Categories { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
