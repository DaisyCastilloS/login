import { Bar } from '../../domain/entity/Bar';
import { BarRepositoryInterface } from '../../domain/repository/bar/BarRepository';
import { SaveBarInterface } from '../../domain/useCases/bar/SaveBar';

export default class SaveBar implements SaveBarInterface {
  barRepository: BarRepositoryInterface;

  constructor(barRepository: BarRepositoryInterface) {
    this.barRepository = barRepository;
  }

  async execute(bar: Bar): Promise<void> {
    await this.barRepository.saveBar(bar);
  }
}
