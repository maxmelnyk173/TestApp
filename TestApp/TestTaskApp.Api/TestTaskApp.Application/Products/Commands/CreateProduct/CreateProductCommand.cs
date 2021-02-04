using MediatR;
using System;
using System.Collections.Generic;
using TestTaskApp.Application.Products.Commands.ViewModels;

namespace TestTaskApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<Guid>
    {
        public string ProductName { get; set; }

        public string Version { get; set; }

        public int Size { get; set; }

        public string CompanyName { get; set; }

        public string URL { get; set; }

        public string VendorContact { get; set; }

        public DateTime ReleasedOn { get; set; }

        public List<CategoryVm> CategoryVms { get; set; }
    }
}
