using AutoMapper;
using LelangService.DTOs;
using LelangService.Entities;


namespace LelangService.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Lelang, LelangDto>().IncludeMembers(x => x.Item);
            CreateMap<Item, LelangDto>();
            CreateMap<CreateLelangDto, Lelang>().ForMember(dest => dest.Item, opt => opt.MapFrom(src => src));

            CreateMap<CreateLelangDto, Item>();

        }
    }
}
