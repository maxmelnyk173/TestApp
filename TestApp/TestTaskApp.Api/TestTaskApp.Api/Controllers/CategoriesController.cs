using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestTaskApp.Application.Categories.Queries.GetCategoriesList;
using TestTaskApp.Application.Categories.Queries.ViewModels;

namespace TestTaskApp.Api.Controllers
{
    public class CategoriesController : ApiController
    {
        //// GET: api/Products
        [HttpGet]
        public async Task<ActionResult<List<CategoryViewModel>>> GetAll()
        {
            return Ok(await Mediator.Send(new GetCategoriesListQuery()));
        }
    }
}
