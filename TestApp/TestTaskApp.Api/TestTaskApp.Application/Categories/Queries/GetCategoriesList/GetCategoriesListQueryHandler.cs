using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TestTaskApp.Application.Categories.Queries.ViewModels;
using TestTaskApp.Application.Common.Interfaces;

namespace TestTaskApp.Application.Categories.Queries.GetCategoriesList
{
    public class GetCategoriesListQueryHandler : IRequestHandler<GetCategoriesListQuery, List<CategoryViewModel>>
    {
        private readonly IApplicationDbContext _context;

        public GetCategoriesListQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryViewModel>> Handle(GetCategoriesListQuery request, CancellationToken cancellationToken)
        {
            var result = await _context.Categories
                                    .Select(category => new CategoryViewModel
                                    {
                                        CategoryId = category.CategoryId,
                                        CategoryName = category.CategoryName
                                    }).ToListAsync();

            return result;
        }
    }
}
